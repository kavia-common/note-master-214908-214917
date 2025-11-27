import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../theme';

// PUBLIC_INTERFACE
export function ListItem({
  title,
  subtitle,
  onPress
}: {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}) {
  /** A monochrome list item with title/subtitle. */
  const Comp = onPress ? TouchableOpacity : View;
  return (
    <Comp onPress={onPress} style={styles.container as any}>
      <View style={styles.texts}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </Comp>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.components.listItem.backgroundColor,
    borderBottomColor: Theme.components.listItem.borderColor,
    borderBottomWidth: 1,
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.lg
  },
  texts: { gap: 4 },
  title: {
    color: Theme.typography.body.color,
    fontSize: 16,
    fontWeight: '600'
  },
  subtitle: {
    color: Theme.typography.subtle.color,
    fontSize: 13
  }
});
