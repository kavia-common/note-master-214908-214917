This android directory only contains a CI shim for managed Expo apps.

- android/gradlew is a no-op that exits successfully to prevent CI failures.
- There is no full native project here. To generate one, run `npx expo prebuild`.
