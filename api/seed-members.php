<?php
declare(strict_types=1);

session_name('RACGU_SESSION');
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true,
]);

if (($_SESSION['user']['role'] ?? '') !== 'pst') {
    http_response_code(403);
    exit('Only a logged-in PST administrator can provision member accounts.');
}

$config = require __DIR__ . '/config.php';
$dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $config['host'], $config['port'], $config['database']);
$pdo = new PDO($dsn, $config['username'], $config['password'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$members = [
    ['Rtr. Prabhab Tiwari', 't.prabhab@gmail.com', 'pst', 'Charter President', '/members/prabhab.webp', '9748421238', 'A+ve', 'RTR23813'],
    ['Rtr. Sujan Shrestha', 'itssujanshrestha@gmail.com', 'pst', 'Secretary', '/members/sujan-shrestha.webp', '9805229925', 'O+ve', 'RTR26242'],
    ['Rtr. Madhab Khanal', 'madhabkhanal63@gmail.com', 'pst', 'Treasurer', '/members/madhab.webp', '9769490997', 'O+ve', 'RTR26244'],
    ['Rtr. Shreya Subedi', 'shreyasubedi96@gmail.com', 'member', 'Joint-Secretary', '/members/shreya.webp', '9768059752', 'B+ve', 'RTR26243'],
    ['Rtr. Rajiv Rimal', 'rimalrajeev@gmail.com', 'member', 'Joint-Treasurer/SAA', '/members/rajiv.webp', '9769490279', 'O+ve', 'RTR26245'],
    ['Rtr. Raj Dhakal', 'dhakalrd001@gmail.com', 'member', 'Editor/PRO', '/members/raj.webp', '9765659748', 'AB+ve', 'RTR26252'],
    ['Rtr. Manila Adhikari', 'maniladhkr@gmail.com', 'member', 'Club Administration Chair', '/members/manila.webp', '9748219643', 'O+ve', 'RTR26250'],
    ['Rtr. Sandhya Sharma', 'sandhya20630429@gmail.com', 'member', 'Service Area Project', '/members/sandhya.webp', '9765363760', 'B+ve', 'RTR26247'],
    ['Rtr. Rakhi Bhujel', 'rakhibhujel6@gmail.com', 'member', 'Service Project Chair', '/members/rakhi.webp', '9819194801', 'O+ve', 'RTR26248'],
    ['Rtr. Sanjana Adhikari', 'sanjanaadk321@gmail.com', 'member', 'Event Management Chair', '/members/sanjana.webp', '9827138523', 'A+ve', 'RTR26253'],
    ['Rtr. Sujan Giri', 'girisujan2064@gmail.com', 'member', 'Sports Co-ordinator', '/members/sujan-giri.webp', '9828370013', 'O+ve', 'RTR26255'],
    ['Rtr. Arpan Bhandari', 'arpanbhandari195@gmail.com', 'member', 'International Service Chair', '/members/arpan.webp', '9741789915', 'A+ve', 'RTR26241'],
    ['Rtr. Sandesh Dhakal', 'dhakalsandesh695@gmail.com', 'member', 'Collegiate Member', '/members/sandesh.webp', '9819174322', 'B+ve', 'RTR26251'],
    ['Rtr. Pratigya BK', 'pratigya.bk@student.gandaki.edu.np', 'member', 'Collegiate Member', '/members/pratigya.webp', '9846111002', 'A+ve', 'RTR26262'],
    ['Rtr. Punam Pun Magar', 'suzainpun@gmail.com', 'member', 'Collegiate Member', '/members/punam.webp', '9820632128', 'A+ve', 'RTR26257'],
    ['Rtr. Salina Bastola', 'salinabanstola937@gmail.com', 'member', 'Collegiate Member', '/members/salina.webp', '9766010091', 'B+ve', 'RTR26265'],
    ['Rtr. Sangam Bhujel', 'sangam.bhujel@student.gandaki.edu.np', 'member', 'Collegiate Member', '/members/sangam.webp', '9846111005', 'O+ve', 'District ID pending'],
    ['Rtr. Subarna Poudel', 'poudelsubarna61@gmail.com', 'member', 'Collegiate Member', '/members/subarna.webp', '9824146744', 'B+ve', 'RTR26266'],
    ['Rtr. Akriti Bhattarai', 'akriti13pokhara@gmail.com', 'member', 'Collegiate Member', '/members/akriti.webp', '9765632421', 'A+ve', 'RTR26282'],
    ['Rtr. Suresh Gurung', 'suresh.gurung@student.gandaki.edu.np', 'member', 'Collegiate Member', '/members/suresh.webp', '9846111008', 'AB+ve', 'RTR26256'],
    ['Rtr. Manoram Subedi', 'manoram.subedi@student.gandaki.edu.np', 'member', 'Collegiate Member', '/members/manoram.webp', '9846111009', 'O-ve', 'RTR26261'],
    ['Rtr. Diperson BK', 'dipersonb.k@gmail.com', 'member', 'Collegiate Member', '/members/diperson.webp', '9801599537', 'A+ve', 'RTR27436'],
];

$_SESSION['seed_csrf'] ??= bin2hex(random_bytes(32));
$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (!hash_equals((string)$_SESSION['seed_csrf'], (string)($_POST['csrf'] ?? ''))) {
            throw new RuntimeException('The security token expired. Reload the page and try again.');
        }

        $temporaryPassword = (string)($_POST['temporary_password'] ?? '');
        if (strlen($temporaryPassword) < 10) {
            throw new RuntimeException('The temporary password must contain at least 10 characters.');
        }

        $find = $pdo->prepare('SELECT id, profile_json FROM users WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(profile_json, "$.name"))) = ? LIMIT 1');
        $update = $pdo->prepare('UPDATE users SET email = ?, password_hash = ?, profile_json = ?, active = 1, sort_order = ? WHERE id = ?');
        $insert = $pdo->prepare('INSERT INTO users (id, email, password_hash, profile_json, active, sort_order) VALUES (?, ?, ?, ?, 1, ?)');

        $pdo->beginTransaction();
        foreach ($members as $index => [$name, $email, $role, $title, $avatar, $phone, $bloodGroup, $districtId]) {
            $find->execute([strtolower($name)]);
            $existing = $find->fetch();
            $existingId = $existing['id'] ?? null;
            $existingProfile = !empty($existing['profile_json']) ? json_decode((string)$existing['profile_json'], true) : [];
            $id = $existingId ?: 'member-' . str_pad((string)($index + 1), 2, '0', STR_PAD_LEFT);
            $profile = [
                'id' => $id,
                'districtId' => $districtId,
                'name' => $name,
                'email' => strtolower($email),
                'role' => $role,
                'roleTitle' => $title,
                'avatar' => $avatar,
                'phone' => $phone,
                'faculty' => 'Bachelor of Information Technology (BIT)',
                'bloodGroup' => $bloodGroup,
                'joinedDate' => '2026-01-22',
                'bio' => (string)($existingProfile['bio'] ?? ''),
                'badge' => $title,
                'mustChangePassword' => true,
            ];
            $hash = password_hash($temporaryPassword, PASSWORD_DEFAULT);
            $payload = json_encode($profile, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            if ($existingId) {
                $update->execute([strtolower($email), $hash, $payload, $index + 1, $id]);
            } else {
                $insert->execute([$id, strtolower($email), $hash, $payload, $index + 1]);
            }
        }
        $pdo->commit();
        $message = count($members) . ' member accounts were provisioned successfully. The temporary password is stored only as secure hashes.';
    } catch (Throwable $exception) {
        if ($pdo->inTransaction()) $pdo->rollBack();
        $error = $exception instanceof PDOException && (string)$exception->getCode() === '23000'
            ? 'An email address is already assigned to another database account.'
            : $exception->getMessage();
    }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Provision RACGU Member Accounts</title>
  <style>
    body{margin:0;background:#f4f7fb;color:#14213d;font:16px system-ui}.box{max-width:680px;margin:6vh auto;background:#fff;padding:32px;border-top:6px solid #d91b5c;box-shadow:0 15px 45px #0f1e3c1f}label{display:block;margin:20px 0 7px;font-weight:700}input{box-sizing:border-box;width:100%;padding:12px;border:1px solid #cdd5e1;font:inherit}button,a{display:inline-block;margin-top:22px;padding:13px 20px;border:0;background:#d91b5c;color:#fff;font-weight:700;text-decoration:none}.msg{padding:12px;background:#ecfdf3;color:#116329}.err{padding:12px;background:#fff1f3;color:#a00025}.note{color:#526078;line-height:1.6}
  </style>
</head>
<body><main class="box">
  <h1>Provision Member Accounts</h1>
  <p class="note">This creates or updates <?=count($members)?> student accounts. Only the President, Secretary and Treasurer receive PST permissions. All other officers and chairs receive normal member permissions.</p>
  <?php if ($message): ?><p class="msg"><?=htmlspecialchars($message)?></p><?php endif; ?>
  <?php if ($error): ?><p class="err"><?=htmlspecialchars($error)?></p><?php endif; ?>
  <form method="post">
    <input type="hidden" name="csrf" value="<?=htmlspecialchars($_SESSION['seed_csrf'])?>">
    <label for="temporary_password">Shared temporary password</label>
    <input id="temporary_password" name="temporary_password" type="password" minlength="10" autocomplete="new-password" required>
    <button type="submit">Create or Update Accounts</button>
    <a href="/">Return to Website</a>
  </form>
</main></body>
</html>
