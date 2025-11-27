#!/usr/bin/env bash
# This script is a no-op for managed Expo apps. It prevents CI steps from failing
# when they expect native build tools (like Gradle) that are not present.
echo "Skipping native build (managed Expo app, no android/ios folders)."
exit 0
