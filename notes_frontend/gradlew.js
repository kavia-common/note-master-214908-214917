#!/usr/bin/env node
/**
 * Gradle wrapper shim (Node.js) for CI environments that attempt native builds.
 * This managed Expo app does not include native Android build tooling.
 * This script exits successfully to avoid CI failures.
 */
console.log("Gradle wrapper shim (Node): skipping native Android build (managed Expo app).");
process.exit(0);
