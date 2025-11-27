import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Theme } from '../theme';

// PUBLIC_INTERFACE
export function Button({
  title,
  onPress,
  style,
  textStyle,
  disabled
}: {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}) {
  /** A themed button using monochrome colors (white on black). */
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && { opacity: 0.6 },
        style
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.components.button.backgroundColor,
    borderColor: Theme.components.button.borderColor,
    borderWidth: 1,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.radius.md
  },
  text: {
    color: Theme.components.button.textColor,
    fontWeight: '700',
    fontSize: 16
  }
});
