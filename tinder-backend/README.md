# Tinder Backend (Laravel) - Starter

## Setup
1. Copy `.env.example` to `.env` and set DB & MAIL.
2. Run `composer install` (requires PHP & Composer).
3. Run `php artisan key:generate`.
4. Run `php artisan migrate`.
5. Run `php artisan db:seed --class=PeopleSeeder`.
6. Install and configure Laravel Sanctum and L5-Swagger as documented in code comments.
7. Run `php artisan serve`.
8. Generate swagger docs: `php artisan l5-swagger:generate` and visit `/api/documentation`.

Auth:
- Register: POST /api/v1/register (name,email,password,password_confirmation)
- Login: POST /api/v1/login (email,password)
- Use `Authorization: Bearer <token>` header for protected endpoints.
