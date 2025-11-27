import React, { ReactNode } from 'react';
import { Modal as RNModal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Theme } from '../theme';

// PUBLIC_INTERFACE
export function Modal({
  visible,
  onRequestClose,
  children
}: {
  visible: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}) {
  /** Themed modal with grayscale backdrop and surface. */
  return (
    <RNModal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onRequestClose}
    >
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.center}>
        <View style={styles.container}>{children}</View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Theme.components.modal.backdrop
  },
  center: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    backgroundColor: Theme.components.modal.backgroundColor,
    borderColor: Theme.components.modal.borderColor,
    borderWidth: 1,
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.lg,
    width: '90%',
    shadowColor: Theme.colors.shadow,
    shadowOpacity: 0.6,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8
  }
});
