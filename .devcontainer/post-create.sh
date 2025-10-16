#!/usr/bin/env bash
set -e

echo "=== devcontainer post-create: installing dependencies ==="

# Backend
cd /workspaces/tinder-fullstack/tinder-backend || exit 1

# Ensure composer exists
if ! command -v composer >/dev/null 2>&1; then
  echo "Composer not found — installing..."
  php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
  php composer-setup.php --install-dir=/usr/local/bin --filename=composer
  rm composer-setup.php
fi

echo "Installing PHP dependencies..."
composer install --no-interaction --prefer-dist --optimize-autoloader || true

# Create sqlite DB for simplicity
mkdir -p database
touch database/database.sqlite

# Copy .env if missing
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
  else
    cat > .env <<'ENV'
APP_NAME=TinderCloneAPI
APP_ENV=local
APP_KEY=
APP_URL=http://localhost:8000
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite
MAIL_MAILER=log
MAIL_FROM_ADDRESS=notifications@tinderclone.test
MAIL_FROM_NAME="TinderClone"
ADMIN_EMAIL=admin@tinderclone.test
ENV
  fi
fi

php artisan key:generate || true

echo "Running migrations & seeders..."
php artisan migrate --seed --force || true

# Ensure swagger-php exists (install dev package if needed)
if [ ! -f vendor/bin/openapi ]; then
  composer require --dev zircote/swagger-php --no-interaction || true
fi

# Create a minimal Swagger doc if not present
mkdir -p storage/api-docs
if [ ! -f storage/api-docs/api-docs.json ]; then
  ./vendor/bin/openapi app -o storage/api-docs/api-docs.json || true
fi

echo "=== post-create complete ==="
echo "To run servers:"
echo "  1) php artisan serve --host 0.0.0.0 --port 8000"
echo "  2) cd ../tinder-frontend && npm install && npx expo start --tunnel"
