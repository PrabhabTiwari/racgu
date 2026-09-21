<?php
declare(strict_types=1);
session_name('RACGU_SESSION');
session_start();
if (($_SESSION['user']['role'] ?? '') !== 'pst') { http_response_code(403); exit('Only a logged-in PST administrator can create accounts.'); }
$config = require __DIR__ . '/config.php';
$dsn = sprintf('mysql:host=%s;port=%d;dbname=%s;charset=utf8mb4', $config['host'], $config['port'], $config['database']);
$pdo = new PDO($dsn, $config['username'], $config['password'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
$message = $error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $name = trim((string)($_POST['name'] ?? ''));
        $email = strtolower(trim((string)($_POST['email'] ?? '')));
        $password = (string)($_POST['password'] ?? '');
        $role = (string)($_POST['role'] ?? 'member');
        $title = trim((string)($_POST['roleTitle'] ?? 'General Member'));
        if (!$name || !filter_var($email, FILTER_VALIDATE_EMAIL)) throw new RuntimeException('Name and a valid email are required.');
        if (strlen($password) < 10) throw new RuntimeException('Temporary password must contain at least 10 characters.');
        if (!in_array($role, ['pst','bod','member','advisor'], true)) throw new RuntimeException('Invalid account role.');
        $id = 'mem-' . bin2hex(random_bytes(6));
        $profile = ['id'=>$id,'name'=>$name,'email'=>$email,'role'=>$role,'roleTitle'=>$title,'avatar'=>'','phone'=>trim((string)($_POST['phone'] ?? '')),'faculty'=>trim((string)($_POST['faculty'] ?? '')),'bloodGroup'=>trim((string)($_POST['bloodGroup'] ?? '')),'joinedDate'=>date('Y-m-d'),'bio'=>'','badge'=>$title];
        $stmt = $pdo->prepare('INSERT INTO users (id,email,password_hash,profile_json,active,sort_order) VALUES (?,?,?,?,1,100)');
        $stmt->execute([$id,$email,password_hash($password, PASSWORD_DEFAULT),json_encode($profile, JSON_UNESCAPED_UNICODE)]);
        $message = 'Member account created successfully.';
    } catch (PDOException $e) { $error = $e->getCode() === '23000' ? 'An account with this email already exists.' : 'The account could not be created.'; }
      catch (Throwable $e) { $error = $e->getMessage(); }
}
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Create Member Account</title><style>body{margin:0;background:#f4f7fb;color:#14213d;font:16px system-ui}.box{max-width:680px;margin:5vh auto;background:#fff;padding:32px;border-top:6px solid #d91b5c;box-shadow:0 15px 45px #0f1e3c1f}label{display:block;margin:16px 0 6px;font-weight:700}input,select{box-sizing:border-box;width:100%;padding:12px;border:1px solid #cdd5e1;font:inherit}button,a{display:inline-block;margin-top:22px;padding:13px 20px;border:0;background:#d91b5c;color:#fff;font-weight:700;text-decoration:none}.msg{padding:12px;background:#ecfdf3;color:#116329}.err{padding:12px;background:#fff1f3;color:#a00025}</style></head><body><main class="box"><h1>Create Member Account</h1><p>Only authenticated PST administrators can use this page.</p><?php if($message):?><p class="msg"><?=htmlspecialchars($message)?></p><?php endif?><?php if($error):?><p class="err"><?=htmlspecialchars($error)?></p><?php endif?><form method="post"><label>Full name</label><input name="name" required><label>Email</label><input name="email" type="email" required><label>Temporary password</label><input name="password" type="password" minlength="10" required><label>Role</label><select name="role"><option value="member">General Member</option><option value="bod">Board of Directors</option><option value="pst">PST Executive</option><option value="advisor">Advisor</option></select><label>Designation</label><input name="roleTitle" value="General Member" required><label>Phone</label><input name="phone"><label>Faculty or program</label><input name="faculty"><label>Blood group</label><input name="bloodGroup"><button>Create Member Account</button> <a href="/">Return to website</a></form></main></body></html>
