import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import { Theme } from '../theme';

// PUBLIC_INTERFACE
export function Input(props: TextInputProps) {
  /** Themed text input using monochrome palette. */
  return (
    <TextInput
      placeholderTextColor={Theme.components.input.placeholderColor}
      {...props}
      style={[styles.input, props.style]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: Theme.components.input.backgroundColor,
    color: Theme.components.input.textColor,
    borderColor: Theme.components.input.borderColor,
    borderWidth: 1,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.radius.md
  }
});
