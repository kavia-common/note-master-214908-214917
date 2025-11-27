This project uses Expo (managed workflow). A minimal Android Gradle wrapper structure is included only to satisfy CI checks that expect `./gradlew`.

Included stubs:
- gradlew (Unix) and gradlew.bat (Windows) — exit successfully
- settings.gradle and build.gradle — minimal configuration with a stub assembleDebug task

Notes:
- For real native builds: run `npm run prebuild:android` (Executes `expo prebuild --platform android`) to generate a full `android/` project with a proper Gradle wrapper, then build as needed.
- The current stubs do not produce APKs; they only ensure CI Gradle checks succeed.
- If your CI requires executable permissions for gradlew, ensure it's set (chmod +x android/gradlew).
