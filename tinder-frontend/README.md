# Tinder Frontend (Expo) - Starter

## Setup
1. Install dependencies: `npm install` (or yarn).
2. Start Expo: `npx expo start`.
3. If using a physical device, ensure API_BASE in src/api/peopleApi.js points to your backend (use LAN IP or ngrok).
4. The app includes a simple auth flow (register/login). After login, you can swipe and likes are sent with Sanctum token.

Notes:
- On Android emulator use http://10.0.2.2:8000 for backend. On iOS simulator use http://localhost:8000.
- Make sure Laravel Sanctum is installed and configured for SPA/API tokens.
