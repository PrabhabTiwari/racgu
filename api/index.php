<?php
declare(strict_types=1);

session_name('RACGU_SESSION');
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true,
]);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: same-origin');

function reply(int $status, array $body): never {
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function input(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw ?: '{}', true);
    return is_array($data) ? $data : [];
}

function clean(array $data): array {
    array_walk_recursive($data, static function (&$value): void {
        if (is_string($value)) $value = trim(strip_tags($value));
    });
    return $data;
}

function require_manager(): void {
    $role = $_SESSION['user']['role'] ?? null;
    if (!in_array($role, ['pst', 'bod'], true)) {
        reply(403, ['success' => false, 'error' => 'Authorized club officers only.']);
    }
}

function require_pst(): void {
    if (($_SESSION['user']['role'] ?? null) !== 'pst') {
        reply(403, ['success' => false, 'error' => 'Only PST officers can perform this action.']);
    }
}

function save_upload(string $field, string $folder, array $allowedMimes, int $maxBytes): array {
    if (!isset($_FILES[$field]) || !is_uploaded_file($_FILES[$field]['tmp_name'])) {
        reply(422, ['success' => false, 'error' => 'Select a file to upload.']);
    }
    $file = $_FILES[$field];
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) reply(422, ['success' => false, 'error' => 'The file upload failed.']);
    if (($file['size'] ?? 0) > $maxBytes) reply(413, ['success' => false, 'error' => 'The selected file is too large.']);
    $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
    if (!isset($allowedMimes[$mime])) reply(422, ['success' => false, 'error' => 'This file type is not allowed.']);
    $uploadDir = dirname(__DIR__) . '/uploads/' . $folder;
    if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) reply(500, ['success' => false, 'error' => 'Could not create the upload directory.']);
    $filename = date('Ymd-His') . '-' . bin2hex(random_bytes(6)) . '.' . $allowedMimes[$mime];
    if (!move_uploaded_file($file['tmp_name'], $uploadDir . '/' . $filename)) reply(500, ['success' => false, 'error' => 'Could not save the uploaded file.']);
    return ['url' => '/uploads/' . $folder . '/' . $filename, 'mime' => $mime, 'bytes' => (int)$file['size'], 'originalName' => basename((string)$file['name'])];
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) reply(503, ['success' => false, 'error' => 'Copy api/config.example.php to api/config.php and enter the MySQL settings.']);
$config = require $configFile;

try {
    $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $config['host'], $config['port'], $config['database']);
    $pdo = new PDO($dsn, $config['username'], $config['password'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (Throwable $e) {
    reply(503, ['success' => false, 'error' => 'Database connection failed. Check api/config.php and start MySQL in WAMP.']);
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$uri = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
$apiPos = strpos($uri, '/api');
$path = $apiPos === false ? '/' : substr($uri, $apiPos + 4);
$path = '/' . trim($path, '/');
// Support explicit front-controller URLs on WAMP installations where
// Apache mod_rewrite or AllowOverride is not enabled.
if ($path === '/index.php') {
    $path = '/';
} elseif (str_starts_with($path, '/index.php/')) {
    $path = substr($path, strlen('/index.php'));
}

try {
    if ($path === '/health' && $method === 'GET') reply(200, ['success' => true, 'data' => ['database' => 'connected']]);

    if ($path === '/auth/login' && $method === 'POST') {
        $body = input();
        $email = strtolower(trim((string)($body['email'] ?? '')));
        $stmt = $pdo->prepare('SELECT id, email, password_hash, profile_json, active FROM users WHERE email = ? LIMIT 1');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        if (!$user || !$user['active'] || !password_verify((string)($body['password'] ?? ''), $user['password_hash'])) {
            usleep(250000);
            reply(401, ['success' => false, 'error' => 'Invalid email or password.']);
        }
        $profile = json_decode($user['profile_json'], true);
        session_regenerate_id(true);
        $_SESSION['user'] = $profile;
        reply(200, ['success' => true, 'data' => $profile]);
    }

    if ($path === '/auth/logout' && $method === 'POST') {
        $_SESSION = [];
        session_destroy();
        reply(200, ['success' => true]);
    }

    if ($path === '/auth/me' && $method === 'GET') {
        reply(200, ['success' => true, 'data' => $_SESSION['user'] ?? null]);
    }

    if ($path === '/members' && $method === 'GET') {
        $rows = $pdo->query('SELECT profile_json FROM users WHERE active = 1 ORDER BY sort_order, id')->fetchAll();
        reply(200, ['success' => true, 'data' => array_map(fn($r) => json_decode($r['profile_json'], true), $rows)]);
    }

    if ($path === '/contact' && $method === 'POST') {
        $body = clean(input());
        if (empty($body['name']) || !filter_var($body['email'] ?? '', FILTER_VALIDATE_EMAIL) || empty($body['message'])) {
            reply(422, ['success' => false, 'error' => 'Name, valid email and message are required.']);
        }
        $stmt = $pdo->prepare('INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)');
        $stmt->execute([$body['name'], $body['email'], $body['phone'] ?? '', $body['subject'] ?? '', $body['message']]);
        reply(201, ['success' => true, 'message' => 'Your message has been received.']);
    }

    if (preg_match('#^/events/([^/]+)/register$#', $path, $m) && $method === 'POST') {
        $body = clean(input());
        $stmt = $pdo->prepare('SELECT payload FROM content_items WHERE type = "events" AND item_id = ?');
        $stmt->execute([$m[1]]);
        $event = $stmt->fetchColumn();
        if (!$event) reply(404, ['success' => false, 'error' => 'Event not found.']);
        $eventData = json_decode($event, true);
        $email = $body['email'] ?? $body['memberEmail'] ?? '';
        $name = $body['name'] ?? $body['memberName'] ?? '';
        $phone = $body['phone'] ?? $body['memberPhone'] ?? '';
        if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$phone) reply(422, ['success' => false, 'error' => 'Name, email and phone are required.']);
        $id = 'reg-' . bin2hex(random_bytes(6));
        $registration = [
            'id' => $id, 'eventId' => $m[1], 'eventTitle' => $eventData['title'] ?? '',
            'eventDate' => $eventData['date'] ?? '', 'memberId' => $body['id'] ?? $body['memberId'] ?? ('guest-' . bin2hex(random_bytes(4))),
            'memberName' => $name, 'memberEmail' => $email, 'memberPhone' => $phone,
            'registeredAt' => date(DATE_ATOM), 'status' => 'confirmed', 'notes' => $body['notes'] ?? 'Registered online'
        ];
        try {
            $pdo->beginTransaction();
            $stmt = $pdo->prepare('INSERT INTO registrations (id, event_id, payload) VALUES (?, ?, ?)');
            $stmt->execute([$id, $m[1], json_encode($registration)]);
            $memberId = (string)$registration['memberId'];
            $registered = $eventData['registeredMembers'] ?? [];
            if (!in_array($memberId, $registered, true)) $registered[] = $memberId;
            $eventData['registeredMembers'] = array_values($registered);
            $stmt = $pdo->prepare('UPDATE content_items SET payload = ? WHERE type = "events" AND item_id = ?');
            $stmt->execute([json_encode($eventData), $m[1]]);
            $pdo->commit();
        } catch (PDOException $e) {
            if ($pdo->inTransaction()) $pdo->rollBack();
            if ((string)$e->getCode() === '23000') reply(409, ['success' => false, 'error' => 'This email is already registered for the event.']);
            throw $e;
        }
        reply(201, ['success' => true, 'data' => $registration]);
    }

    if ($path === '/registrations' && $method === 'GET') {
        $sessionUser = $_SESSION['user'] ?? null;
        if (!$sessionUser) reply(401, ['success' => false, 'error' => 'Member login required.']);
        $rows = $pdo->query('SELECT payload FROM registrations ORDER BY created_at DESC')->fetchAll();
        $registrations = array_map(fn($r) => json_decode($r['payload'], true), $rows);
        if (!in_array($sessionUser['role'] ?? '', ['pst', 'bod'], true)) {
            $userId = (string)($sessionUser['id'] ?? '');
            $userEmail = strtolower((string)($sessionUser['email'] ?? ''));
            $registrations = array_values(array_filter($registrations, static fn($r) =>
                (string)($r['memberId'] ?? '') === $userId || strtolower((string)($r['memberEmail'] ?? '')) === $userEmail
            ));
        }
        reply(200, ['success' => true, 'data' => $registrations]);
    }

    if ($path === '/events/upload-cover' && $method === 'POST') {
        require_pst();
        $saved = save_upload('cover', 'events', ['image/jpeg'=>'jpg', 'image/png'=>'png', 'image/webp'=>'webp'], 8 * 1024 * 1024);
        reply(201, ['success' => true, 'data' => ['url' => $saved['url']]]);
    }

    if ($path === '/documents/upload' && $method === 'POST') {
        require_pst();
        $allowed = [
            'application/pdf'=>'pdf', 'application/msword'=>'doc',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'=>'docx',
            'application/vnd.ms-excel'=>'xls',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'=>'xlsx',
            'application/zip'=>'zip', 'application/x-zip-compressed'=>'zip'
        ];
        $saved = save_upload('document', 'documents', $allowed, 15 * 1024 * 1024);
        $extension = strtoupper(pathinfo($saved['url'], PATHINFO_EXTENSION));
        $type = in_array($extension, ['PDF', 'ZIP'], true) ? $extension : (in_array($extension, ['XLS', 'XLSX'], true) ? 'XLSX' : 'DOCX');
        $size = number_format($saved['bytes'] / 1048576, 2) . ' MB';
        reply(201, ['success' => true, 'data' => ['url'=>$saved['url'], 'name'=>$saved['originalName'], 'size'=>$size, 'type'=>$type]]);
    }

    if ($path === '/gallery/upload' && $method === 'POST') {
        require_pst();
        if (!isset($_FILES['photo']) || !is_uploaded_file($_FILES['photo']['tmp_name'])) reply(422, ['success' => false, 'error' => 'Select a photo to upload.']);
        $file = $_FILES['photo'];
        if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) reply(422, ['success' => false, 'error' => 'The photo upload failed.']);
        if (($file['size'] ?? 0) > 5 * 1024 * 1024) reply(413, ['success' => false, 'error' => 'The photo must be 5 MB or smaller.']);
        $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
        $extensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
        if (!isset($extensions[$mime])) reply(422, ['success' => false, 'error' => 'Only JPG, PNG and WebP photos are allowed.']);
        $uploadDir = dirname(__DIR__) . '/uploads/gallery';
        if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true) && !is_dir($uploadDir)) reply(500, ['success' => false, 'error' => 'Could not create the gallery upload directory.']);
        $filename = date('Ymd-His') . '-' . bin2hex(random_bytes(6)) . '.' . $extensions[$mime];
        if (!move_uploaded_file($file['tmp_name'], $uploadDir . '/' . $filename)) reply(500, ['success' => false, 'error' => 'Could not save the uploaded photo.']);
        reply(201, ['success' => true, 'data' => ['url' => '/uploads/gallery/' . $filename]]);
    }

    if (preg_match('#^/(events|documents|notices|gallery)(?:/([^/]+))?$#', $path, $m)) {
        $type = $m[1];
        $id = $m[2] ?? null;
        if ($method === 'GET' && !$id) {
            $stmt = $pdo->prepare('SELECT payload FROM content_items WHERE type = ? ORDER BY created_at DESC');
            $stmt->execute([$type]);
            reply(200, ['success' => true, 'data' => array_map(fn($r) => json_decode($r['payload'], true), $stmt->fetchAll())]);
        }
        if ($type === 'gallery') require_pst();
        else require_manager();
        if ($method === 'POST' && !$id) {
            $body = clean(input());
            $prefix = ['events'=>'ev', 'documents'=>'doc', 'notices'=>'not', 'gallery'=>'gal'][$type];
            $id = $prefix . '-' . bin2hex(random_bytes(6));
            $body['id'] = $id;
            $body['createdAt'] = $body['createdAt'] ?? date(DATE_ATOM);
            if ($type === 'events') $body['registeredMembers'] = [];
            $stmt = $pdo->prepare('INSERT INTO content_items (type, item_id, payload) VALUES (?, ?, ?)');
            $stmt->execute([$type, $id, json_encode($body)]);
            reply(201, ['success' => true, 'data' => $body]);
        }
        if ($method === 'PUT' && $id) {
            $stmt = $pdo->prepare('SELECT payload FROM content_items WHERE type = ? AND item_id = ?');
            $stmt->execute([$type, $id]);
            $current = $stmt->fetchColumn();
            if (!$current) reply(404, ['success' => false, 'error' => 'Record not found.']);
            $updated = array_merge(json_decode($current, true), clean(input()), ['updatedAt' => date(DATE_ATOM)]);
            $stmt = $pdo->prepare('UPDATE content_items SET payload = ? WHERE type = ? AND item_id = ?');
            $stmt->execute([json_encode($updated), $type, $id]);
            reply(200, ['success' => true, 'data' => $updated]);
        }
        if ($method === 'DELETE' && $id) {
            $stmt = $pdo->prepare('DELETE FROM content_items WHERE type = ? AND item_id = ?');
            $stmt->execute([$type, $id]);
            reply(200, ['success' => true]);
        }
    }

    reply(404, ['success' => false, 'error' => 'API route not found.']);
} catch (Throwable $e) {
    error_log($e->getMessage());
    reply(500, ['success' => false, 'error' => 'The server could not complete this request.']);
}
