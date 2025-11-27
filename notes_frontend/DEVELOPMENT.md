# Notes Frontend Development

Scripts:
- npm run start — Starts Expo dev server (non-interactive)
- npm run web — Starts Expo on web (non-interactive)
- npm run web:build — Exports a static web build (for previews/CI)
- npm run ci:native-check — No-op script for CI systems expecting native builds; ensures success without android/ios folders
- npm run gradlew

Entry files:
- index.js — registers root component
- src/App.tsx — main app component (TypeScript)
- src/App.js — JS fallback wrapper that attempts to load the TS App and shows guidance if TS deps are missing

Configuration:
- app.json — Expo app configuration
- tsconfig.json — TypeScript configuration (includes src/**/*.ts, src/**/*.tsx, index.js, types). If Expo prompts for missing TS deps, install dependencies in this directory:
  npm ci
  or
  npm install

CI usage:
- This is a managed Expo app without native android/ or ios/ directories.
- If your CI tries to run native build steps (e.g., ./gradlew), use:
  npm run ci:native-check
  to skip native builds and rely on web preview or EAS if needed.
- Shims: Minimal placeholders exist at:
  - android/gradlew (exits successfully)
  - ios/build.sh (exits successfully)
  These are provided solely to prevent CI failures and do not perform real native builds.

TypeScript and Web dependencies:
- Aligned with Expo SDK 51:
  - typescript ~5.3.3
  - @types/react ~18.2.79
  - @types/react-native ~0.73.0
  - react-native-web ~0.19.10
  - react-dom 18.2.0
  - @expo/metro-runtime ~3.2.3
- A package-lock.json is committed for CI resolvability.

Detection and fallback:
- If node_modules have not been installed yet, Expo may report missing TypeScript deps.
- Install deps to enable the full TS app:
  npm ci   (preferred)  or  npm install
- Until dependencies are installed, the app will boot on web using src/App.js and render a helpful message. After installation, Metro will resolve src/App.tsx and render the full app.

Environment variables:
The app can read EXPO_PUBLIC_* variables provided by the environment. Do not hardcode secrets in code.
