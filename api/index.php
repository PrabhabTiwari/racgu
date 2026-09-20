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
        $stmt = $pdo->prepare('INSERT INTO registrations (id, event_id, payload) VALUES (?, ?, ?)');
        try { $stmt->execute([$id, $m[1], json_encode($registration)]); }
        catch (PDOException $e) { reply(409, ['success' => false, 'error' => 'This email is already registered for the event.']); }
        reply(201, ['success' => true, 'data' => $registration]);
    }

    if ($path === '/registrations' && $method === 'GET') {
        require_manager();
        $rows = $pdo->query('SELECT payload FROM registrations ORDER BY created_at DESC')->fetchAll();
        reply(200, ['success' => true, 'data' => array_map(fn($r) => json_decode($r['payload'], true), $rows)]);
    }

    if (preg_match('#^/(events|documents|notices|gallery)(?:/([^/]+))?$#', $path, $m)) {
        $type = $m[1];
        $id = $m[2] ?? null;
        if ($method === 'GET' && !$id) {
            $stmt = $pdo->prepare('SELECT payload FROM content_items WHERE type = ? ORDER BY created_at DESC');
            $stmt->execute([$type]);
            reply(200, ['success' => true, 'data' => array_map(fn($r) => json_decode($r['payload'], true), $stmt->fetchAll())]);
        }
        require_manager();
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
