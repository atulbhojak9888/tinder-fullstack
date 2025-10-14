#!/usr/bin/env bash
set -e

echo "=== Installing backend dependencies (composer) ==="
cd tinder-backend || exit 1
if [ -f composer.json ]; then
  if command -v composer >/dev/null 2>&1; then
    composer install --no-interaction --prefer-dist --optimize-autoloader
  else
    echo "composer not found in image; installing composer..."
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer
    php -r "unlink('composer-setup.php');"
    composer install --no-interaction
  fi
fi

echo "=== Installing frontend dependencies (npm) ==="
cd ../tinder-frontend || exit 1
if command -v npm >/dev/null 2>&1; then
  npm install --no-progress
else
  echo "npm not found in container. Install Node/npm or use Codespaces default image with Node."
fi

echo "=== Setup complete ==="
echo ""
echo "Next steps (run inside Codespaces terminal):"
echo "  1) Start MySQL (Codespaces provides 'service' or you can use a managed DB)."
echo "  2) Configure .env in tinder-backend (copy .env.example -> .env) and set DB credentials."
echo "  3) php artisan key:generate"
echo "  4) php artisan migrate --seed"
echo "  5) php artisan serve --host 0.0.0.0 --port 8000"
echo "  6) cd tinder-frontend && npx expo start --tunnel"
echo ""
echo "I recommend using Codespaces terminal to run backend and frontend in separate terminals."
