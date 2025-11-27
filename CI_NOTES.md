# CI Notes for Managed Expo App

This project is a managed Expo app without native android/ and ios/ directories. 
Some CI environments may attempt to run native builds (e.g., `./gradlew`). To prevent failures:

- Use web preview/build:
  - npm run web
  - npm run web:build

- Use the provided shims (no-op):
  - ./gradlew (root-level)
  - notes_frontend/android/gradlew
  - notes_frontend/ios/build.sh

Ensure executable permissions in CI:
  chmod +x ./gradlew
  chmod +x notes_frontend/android/gradlew
  chmod +x notes_frontend/ios/build.sh

If your CI cannot set executable bits, use the Node shim instead of executing ./gradlew:
  cd notes_frontend && npm run gradlew

If native builds are desired, remove shims and run:
  npx expo prebuild
then configure native tooling accordingly.
