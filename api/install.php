<?php
declare(strict_types=1);
$lock = __DIR__ . '/install.lock';
$message = '';
$error = '';
if (is_file($lock)) {
    http_response_code(403);
    exit('Installation is locked. Delete api/install.lock only when you intentionally need to create the first administrator again.');
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $config = require __DIR__ . '/config.php';
        $dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $config['host'], $config['port'], $config['database']);
        $pdo = new PDO($dsn, $config['username'], $config['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
        $email = strtolower(trim((string)($_POST['email'] ?? '')));
        $password = (string)($_POST['password'] ?? '');
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 10) throw new RuntimeException('Use a valid email and a password of at least 10 characters.');
        $profile = [
            'id' => 'mem-1', 'districtId' => 'RTR23813', 'name' => 'Rtr. Prabhab Tiwari', 'email' => $email, 'role' => 'pst',
            'roleTitle' => 'Charter President', 'avatar' => '/members/prabhab.webp', 'phone' => '',
            'faculty' => 'Bachelor of Information Technology', 'bloodGroup' => '', 'joinedDate' => '2026-01-22',
            'bio' => 'Charter President of the Rotaract Club of Gandaki University, leading the RY 2026-27 theme Insight to Impact.',
            'badge' => 'Charter President'
        ];
        $stmt = $pdo->prepare('INSERT INTO users (id,email,password_hash,profile_json,sort_order) VALUES (?,?,?,?,1) ON DUPLICATE KEY UPDATE email=VALUES(email),password_hash=VALUES(password_hash),profile_json=VALUES(profile_json)');
        $stmt->execute(['mem-1', $email, password_hash($password, PASSWORD_DEFAULT), json_encode($profile)]);
        file_put_contents($lock, date(DATE_ATOM));
        $message = 'Administrator created. Delete api/install.php or keep the generated lock file in place, then sign in from the website.';
    } catch (Throwable $e) { $error = $e->getMessage(); }
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>RACGU Setup</title><style>body{font:16px system-ui;background:#f5f7fb;color:#152238;margin:0}.box{max-width:520px;margin:8vh auto;background:white;padding:32px;border-top:6px solid #d91b5c;box-shadow:0 16px 50px #14213d18}label{display:block;margin:18px 0 6px;font-weight:700}input{box-sizing:border-box;width:100%;padding:12px;border:1px solid #ccd3df}button{margin-top:22px;padding:13px 20px;border:0;background:#d91b5c;color:white;font-weight:700}.error{color:#a00025}.success{color:#116329}</style></head><body><main class="box"><h1>RACGU Website Setup</h1><p>Create the first portal administrator after importing database.sql.</p><?php if($error):?><p class="error"><?=htmlspecialchars($error)?></p><?php endif?><?php if($message):?><p class="success"><?=htmlspecialchars($message)?></p><?php else:?><form method="post"><label>Email</label><input name="email" type="email" value="president.racgu@gandaki.edu.np" required><label>Password</label><input name="password" type="password" minlength="10" required><button>Create administrator</button></form><?php endif?></main></body></html>
