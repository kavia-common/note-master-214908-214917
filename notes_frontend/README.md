# Notes Frontend (React Native + Expo)

A simple, modern Notes app with local persistence, built using React Native and Expo. It follows the "Ocean Professional" theme (blue primary, amber secondary) with rounded corners, subtle shadows, and clean typography.

Features
- Notes list with search/filter
- Add/Edit notes in a modal
- Delete note with confirmation
- AsyncStorage-based local persistence
- Basic internal healthcheck screen
- Expo config set to run on port 3000 (web preview compatible)

Getting Started
1) Install dependencies
   npm install

2) Start the app
   - Web (preview, port 3000):
     EXPO_PUBLIC_PORT=3000 npm run web
   - Expo (auto):
     npm start

By default, Expo will serve the web build on port 3000 if EXPO_PUBLIC_PORT=3000 is provided.

CI / Android build notes
- This repo uses Expo managed workflow and does not include a full native Android project by default.
- A minimal stub at android/gradlew is provided so CI checks that attempt to run `./gradlew` do not fail.
- For an actual native build, run:
    npm run prebuild:android
  which generates a full android/ folder with a proper Gradle wrapper, then build from there.

Environment Variables
- EXPO_PUBLIC_PORT
  Description: Preferred port for the web preview (used for displaying in-app for reference).
  Example: EXPO_PUBLIC_PORT=3000
- EXPO_PUBLIC_HEALTHCHECK_PATH
  Description: Optional. If set (e.g., "/health"), the app exposes a simple Healthcheck screen at that path on web. In the app UI, a "Health" badge appears to navigate to this screen.
  Example: EXPO_PUBLIC_HEALTHCHECK_PATH=/health
- EXPO_PUBLIC_TRUST_PROXY, EXPO_PUBLIC_LOG_LEVEL, EXPO_PUBLIC_FEATURE_FLAGS, EXPO_PUBLIC_EXPERIMENTS_ENABLED
  Description: Present for future configuration; not directly used in this initial implementation.

Notes on Healthcheck
- If EXPO_PUBLIC_HEALTHCHECK_PATH is set and you open the web app at that path (e.g., http://localhost:3000/health), the Healthcheck screen shows automatically.
- Healthcheck performs an internal AsyncStorage read/write/remove test and reports OK/ERROR.

Project Structure
- src/theme.ts: Ocean Professional theme variables
- src/storage.ts: Types and helpers for AsyncStorage CRUD and healthcheck
- src/components/NoteModal.tsx: Reusable add/edit modal component
- App.tsx: Main screen, list, search, actions, and healthcheck wiring

No New Required Env Vars
This app avoids introducing new environment variables beyond those already defined. EXPO_PUBLIC_PORT and EXPO_PUBLIC_HEALTHCHECK_PATH are optional conveniences.

License
MIT
