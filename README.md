# Rotaract Club of Gandaki University Website

Official website and member-management portal for the Rotaract Club of Gandaki University, RID 3292, Zone XVI, Club No. 8828026. The club was chartered on 22 January 2026, is sponsored by the Rotaract Club of Lekhnath, and serves under the RY 2026-27 theme “Insight to Impact.”

## WAMP installation

1. If an earlier installation failed, delete the incomplete `node_modules` folder and `package-lock.json` before continuing.
2. Start Apache and MySQL in WAMP.
3. Import `database.sql` in phpMyAdmin.
4. Copy `api/config.example.php` to `api/config.php`. The defaults work with a standard WAMP installation using the MySQL `root` user and a blank password. Update them if your setup differs.
5. Run `npm install`, then `npm run build`.
6. Copy everything inside `dist` into `C:\wamp64\www\racgu`. Then copy the `api` folder and root `.htaccess` into the same `racgu` folder.
7. Create a WAMP virtual host whose document root is `C:\wamp64\www\racgu`. This allows the secure `/api` routes to work exactly as configured.
8. Open `http://your-virtual-host/api/install.php`, create the first administrator, then keep `api/install.lock` in place.
9. Open the website and sign in through Member Portal.

Apache modules `rewrite_module` and `headers_module` should be enabled. PHP needs the `pdo_mysql` extension, which is included in standard WAMP installations.

## Development

The browser application is React and TypeScript. The production backend is PHP with MySQL. Vite's old in-memory demonstration backend is no longer used.

```text
npm install
npm run lint
npm run build
```

To preview the full application locally, serve the built site through WAMP. Opening only the Vite development server will not provide the PHP API.

## Security notes

- Management endpoints require a server-side authenticated PST or Board role.
- Passwords are generated with PHP's `password_hash` and verified with `password_verify`.
- Database operations use PDO prepared statements.
- Login cookies are HTTP-only and use SameSite=Lax.
- Keep `api/config.php`, `database.sql`, and `.env` files blocked from public access.
- Replace the first administrator password periodically and configure HTTPS before public deployment.
