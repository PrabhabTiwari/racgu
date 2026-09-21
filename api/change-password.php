<?php
declare(strict_types=1);

session_name('RACGU_SESSION');
session_start([
    'cookie_httponly' => true,
    'cookie_samesite' => 'Lax',
    'use_strict_mode' => true,
]);

if (!isset($_SESSION['user']['id'])) {
    http_response_code(401);
    exit('Sign in to the member portal before changing your password.');
}

$config = require __DIR__ . '/config.php';
$dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $config['host'], $config['port'], $config['database']);
$pdo = new PDO($dsn, $config['username'], $config['password'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$_SESSION['password_csrf'] ??= bin2hex(random_bytes(32));
$message = '';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        if (!hash_equals((string)$_SESSION['password_csrf'], (string)($_POST['csrf'] ?? ''))) {
            throw new RuntimeException('The security token expired. Reload this page and try again.');
        }
        $currentPassword = (string)($_POST['current_password'] ?? '');
        $newPassword = (string)($_POST['new_password'] ?? '');
        $confirmation = (string)($_POST['confirmation'] ?? '');
        if (strlen($newPassword) < 10) throw new RuntimeException('Use a new password containing at least 10 characters.');
        if ($newPassword !== $confirmation) throw new RuntimeException('The new password and confirmation do not match.');
        if ($newPassword === $currentPassword) throw new RuntimeException('Choose a password different from the temporary password.');

        $stmt = $pdo->prepare('SELECT password_hash, profile_json FROM users WHERE id = ? AND active = 1 LIMIT 1');
        $stmt->execute([$_SESSION['user']['id']]);
        $row = $stmt->fetch();
        if (!$row || !password_verify($currentPassword, $row['password_hash'])) {
            throw new RuntimeException('The current password is incorrect.');
        }

        $profile = json_decode($row['profile_json'], true, 512, JSON_THROW_ON_ERROR);
        $profile['mustChangePassword'] = false;
        $stmt = $pdo->prepare('UPDATE users SET password_hash = ?, profile_json = ? WHERE id = ?');
        $stmt->execute([
            password_hash($newPassword, PASSWORD_DEFAULT),
            json_encode($profile, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            $_SESSION['user']['id'],
        ]);
        $_SESSION['user'] = $profile;
        session_regenerate_id(true);
        $message = 'Your password has been changed successfully.';
    } catch (Throwable $exception) {
        $error = $exception->getMessage();
    }
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Change Member Password</title>
  <style>
    body{margin:0;background:#f4f7fb;color:#14213d;font:16px system-ui}.box{max-width:560px;margin:6vh auto;background:#fff;padding:32px;border-top:6px solid #d91b5c;box-shadow:0 15px 45px #0f1e3c1f}label{display:block;margin:18px 0 7px;font-weight:700}input{box-sizing:border-box;width:100%;padding:12px;border:1px solid #cdd5e1;font:inherit}button,a{display:inline-block;margin-top:22px;padding:13px 20px;border:0;background:#d91b5c;color:#fff;font-weight:700;text-decoration:none}.msg{padding:12px;background:#ecfdf3;color:#116329}.err{padding:12px;background:#fff1f3;color:#a00025}.note{color:#526078;line-height:1.6}
  </style>
</head>
<body><main class="box">
  <h1>Change Password</h1>
  <p class="note">Replace your shared temporary password with a private password that you do not use on another website.</p>
  <?php if ($message): ?><p class="msg"><?=htmlspecialchars($message)?></p><?php endif; ?>
  <?php if ($error): ?><p class="err"><?=htmlspecialchars($error)?></p><?php endif; ?>
  <form method="post">
    <input type="hidden" name="csrf" value="<?=htmlspecialchars($_SESSION['password_csrf'])?>">
    <label for="current_password">Current password</label>
    <input id="current_password" name="current_password" type="password" autocomplete="current-password" required>
    <label for="new_password">New password</label>
    <input id="new_password" name="new_password" type="password" minlength="10" autocomplete="new-password" required>
    <label for="confirmation">Confirm new password</label>
    <input id="confirmation" name="confirmation" type="password" minlength="10" autocomplete="new-password" required>
    <button type="submit">Change Password</button>
    <a href="/">Return to Website</a>
  </form>
</main></body>
</html>
