import { registerRootComponent } from 'expo';
// Explicitly import the JS entry to prevent Expo/Metro from resolving the TS file,
// which can trigger TypeScript dependency checks in environments without TS deps installed.
import App from './src/App.js';

registerRootComponent(App);
