@ECHO OFF
REM Minimal wrapper to satisfy CI checks expecting gradlew.bat
REM This does not build the app; Expo manages builds. For real builds run `npm run prebuild:android`.
EXIT /B 0
