import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import { Theme } from './theme';
import NotesScreen from './screens/NotesScreen';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

// PUBLIC_INTERFACE
export default function App() {
  /** Root app applying monochrome theme and rendering Notes screen */
  return (
    <SafeAreaView style={styles.container}>
      <ExpoStatusBar style="light" />
      {/* On Android also ensure the native status bar content is light */}
      {Platform.OS === 'android' ? <StatusBar barStyle="light-content" backgroundColor={Theme.colors.background} /> : null}
      <NotesScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background
  }
});
