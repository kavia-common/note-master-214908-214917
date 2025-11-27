import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// PUBLIC_INTERFACE
export default function App() {
  /** JS fallback wrapper. It attempts to load the TypeScript App (App.tsx).
   * If TypeScript deps are missing and the import fails, it renders a helpful message.
   */
  let TSApp = null;
  try {
    // Attempt to require the TS entry.
    // Using require inside try/catch so environments without TS can still boot.
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    TSApp = require('./App.tsx').default;
  } catch (e) {
    TSApp = null;
  }

  if (TSApp) {
    return <TSApp />;
  }

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Notes App</Text>
      <Text style={styles.msg}>
        TypeScript dependencies not detected. The app is running with a minimal JS fallback.
      </Text>
      <Text style={styles.hint}>
        To enable full app with TypeScript components, install dependencies in notes_frontend:
      </Text>
      <Text style={styles.code}>npm ci</Text>
      <Text style={styles.hint}>or</Text>
      <Text style={styles.code}>npm install</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: '#111111'
  },
  title: { color: '#FFFFFF', fontSize: 20, fontWeight: '700', marginBottom: 8 },
  msg: { color: '#FFFFFF', textAlign: 'center', marginBottom: 12 },
  hint: { color: '#CCCCCC', textAlign: 'center' },
  code: { color: '#FFFFFF', fontWeight: '700', marginVertical: 4 }
});
