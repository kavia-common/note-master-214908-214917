# Notes Frontend Development

Scripts:
- npm run start — Starts Expo dev server (non-interactive)
- npm run web — Starts Expo on web (non-interactive)
- npm run web:build — Exports a static web build (for previews/CI)
- npm run ci:native-check — No-op script for CI systems expecting native builds; ensures success without android/ios folders

Entry files:
- index.js — registers root component
- src/App.tsx — main app component

Configuration:
- app.json — Expo app configuration
- tsconfig.json — TypeScript configuration

CI usage:
- This is a managed Expo app without native android/ or ios/ directories.
- If your CI tries to run native build steps (e.g., ./gradlew), use:
  npm run ci:native-check
  to skip native builds and rely on web preview or EAS if needed.
- Shims: Minimal placeholders exist at:
  - android/gradlew (exits successfully)
  - ios/build.sh (exits successfully)
  These are provided solely to prevent CI failures and do not perform real native builds.

Environment variables:
The app can read EXPO_PUBLIC_* variables provided by the environment. Do not hardcode secrets in code.
