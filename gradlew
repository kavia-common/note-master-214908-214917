#!/usr/bin/env bash
# Root-level Gradle wrapper shim for CI environments that invoke ./gradlew
# This project is a managed Expo app; native Android build is intentionally not present.
echo "Root Gradle wrapper shim: skipping native Android build (managed Expo app)."
exit 0
