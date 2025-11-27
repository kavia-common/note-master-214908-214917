#!/usr/bin/env node
/**
 * ensure-expo-deps.js
 * Verifies that required Expo TypeScript and Web dependencies exist in node_modules.
 * This does not install packages (CI restriction). It emits clear guidance if any are missing.
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const requiredDeps = {
  dependencies: [
    'react-native-web',
    'react-dom',
    '@expo/metro-runtime'
  ],
  devDependencies: [
    'typescript',
    '@types/react',
    '@types/react-native'
  ]
};

function hasModule(modName) {
  try {
    // Resolve from project root so it works consistently in CI
    require.resolve(modName, { paths: [projectRoot] });
    return true;
  } catch {
    return false;
  }
}

function checkAll() {
  const missing = [];

  for (const dep of requiredDeps.dependencies) {
    if (!hasModule(dep)) {
      missing.push(dep);
    }
  }
  for (const dep of requiredDeps.devDependencies) {
    if (!hasModule(dep)) {
      missing.push(dep);
    }
  }

  if (missing.length > 0) {
    const msg = [
      'Detected missing Expo web/TypeScript dependencies:',
      ` - ${missing.join('\n - ')}`,
      '',
      'Action required by the environment:',
      ' - Please re-run dependency installation in notes_frontend:',
      '     npm ci  (preferred)  OR  npm install',
      '',
      'These packages are declared in package.json with exact versions so the next install should resolve them deterministically.',
    ].join('\n');
    console.warn(msg);
    // Non-fatal: exit 0 so CI can continue, but the logs will clearly show what to do.
    process.exit(0);
  } else {
    console.log('All required Expo web/TypeScript dependencies are present.');
  }
}

checkAll();
