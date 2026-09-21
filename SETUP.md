# RACGU Website: Windows and WAMP Startup Guide

This guide explains how to open the Rotaract Club of Gandaki University website after shutting down and restarting the computer.

## Project information

- Website address: `http://racgu.local`
- API health check: `http://racgu.local/api/index.php/health`
- Project folder: `C:\wamp64\www\racgu`
- GitHub repository: `https://github.com/PrabhabTiwari/racgu`
- Database name: `racgu`

## Normal startup after turning on the computer

You do not need to run `npm install`, `npm run build`, or import the database every time you start the computer.

### Step 1: Start WAMP Server

1. Open the Windows Start menu.
2. Search for **Wampserver64**.
3. Run Wampserver.
4. If Windows asks for permission, select **Yes**.
5. Wait until the WAMP tray icon becomes green.

The green tray icon means Apache and MySQL are running.

### Step 2: Open the website

Open a browser and visit:

```text
http://racgu.local
```

Do not use the VS Code **Go Live** button. The website requires Apache, PHP, MySQL, and WAMP.

### Step 3: Confirm the backend is working

If login or website data does not work, open:

```text
http://racgu.local/api/index.php/health
```

The correct response is:

```json
{"success":true,"data":{"database":"connected"}}
```

### Step 4: Sign in

1. Return to `http://racgu.local`.
2. Select **Portal Login**.
3. Enter the institutional email address and password.
4. Select **Log In**.

PST users can manage club content and create accounts for other members.

## Open the project in VS Code

VS Code is only required when editing or updating the website.

1. Open Visual Studio Code.
2. Select **File > Open Folder**.
3. Open:

```text
C:\wamp64\www\racgu
```

4. Open **Terminal > New Terminal**.

The terminal should show:

```text
PS C:\wamp64\www\racgu>
```

## Download new changes from GitHub

Only perform these steps when the GitHub repository has been updated.

Open the project folder in VS Code and run:

```powershell
git pull origin main
npm install
npm run build
Copy-Item -Path .\dist\* -Destination . -Recurse -Force
```

Then restart WAMP services and press `Ctrl + F5` in the browser.

The local file `api\config.php` contains database credentials and is intentionally excluded from GitHub. Do not delete or publish it.

## Create another member account

1. Start WAMP and sign in with a PST account.
2. Open the member portal.
3. Select **Manage Member Accounts**.

You can also open:

```text
http://racgu.local/api/create-user.php
```

Only an authenticated PST user can access this page.

## Stop the website safely

Before shutting down the computer:

1. Select the WAMP tray icon.
2. Select **Stop All Services** or **Exit**.
3. Close VS Code and the browser.
4. Shut down Windows normally.

The website files and MySQL database remain saved for the next startup.

## Common problems

### WAMP icon is orange or red

Apache or MySQL did not start correctly.

1. Select the WAMP tray icon.
2. Restart all services.
3. Close applications that may be using ports 80, 443, or 3306.
4. Run WAMP as Administrator if necessary.

### `racgu.local` does not open

First check:

```text
http://localhost
```

If localhost works but `racgu.local` does not, verify that the WAMP virtual host still points to:

```text
C:\wamp64\www\racgu
```

Restart WAMP after changing virtual-host settings.

### Database connection error

Check that:

1. The WAMP tray icon is green.
2. MySQL is running.
3. The `racgu` database exists in phpMyAdmin.
4. `C:\wamp64\www\racgu\api\config.php` exists and contains the correct MySQL settings.

### Browser shows an old version

Press:

```text
Ctrl + F5
```

If the repository was updated, repeat the GitHub update and build commands from this guide.

### Login shows `Unexpected token '<'`

Open:

```text
http://racgu.local/api/index.php/health
```

If that address does not return JSON, confirm that PHP and Apache are running and that the newest GitHub version has been built and copied into the project root.

## Important backup files

Keep backups of:

- `C:\wamp64\www\racgu\api\config.php`
- The `racgu` MySQL database export
- Club photographs and uploaded documents

Never commit passwords, database credentials, `.env` files, or `api\config.php` to GitHub.
