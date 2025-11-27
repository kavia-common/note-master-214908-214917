import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../theme';
import type { Note } from '../storage';

// PUBLIC_INTERFACE
export function NoteModal({
  visible,
  initial,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  initial?: Partial<Note>;
  onClose: () => void;
  onSubmit: (payload: { title: string; content: string }) => void;
}) {
  /** Add/Edit note modal with title and content fields. */
  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');

  useEffect(() => {
    setTitle(initial?.title ?? '');
    setContent(initial?.content ?? '');
  }, [initial, visible]);

  const canSave = title.trim().length > 0 || content.trim().length > 0;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent>
      <KeyboardAvoidingView behavior={Platform.select({ ios: 'padding', android: undefined })} style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.header}>{initial?.id ? 'Edit note' : 'New note'}</Text>

          <TextInput
            placeholder="Title"
            placeholderTextColor={theme.colors.textMuted}
            value={title}
            onChangeText={setTitle}
            style={styles.titleInput}
          />
          <TextInput
            placeholder="Write your note..."
            placeholderTextColor={theme.colors.textMuted}
            value={content}
            onChangeText={setContent}
            style={styles.contentInput}
            multiline
            numberOfLines={6}
          />

          <View style={styles.actions}>
            <Pressable onPress={onClose} style={({ pressed }) => [styles.btn, styles.btnGhost, pressed && styles.pressed]}>
              <Text style={[styles.btnText, styles.btnGhostText]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => onSubmit({ title: title.trim(), content: content.trim() })}
              disabled={!canSave}
              style={({ pressed }) => [styles.btn, styles.btnPrimary, (pressed || !canSave) && styles.pressed, !canSave && styles.btnDisabled]}
            >
              <Text style={styles.btnPrimaryText}>{initial?.id ? 'Save' : 'Add'}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(17,24,39,0.45)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  card: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(3),
    ...theme.shadow.card,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing(2),
  },
  titleInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing(1.5),
    paddingVertical: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
    fontSize: 16,
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing(1.5),
    paddingVertical: theme.spacing(1),
    fontSize: 16,
    minHeight: 140,
    textAlignVertical: 'top',
    color: theme.colors.text,
    backgroundColor: theme.colors.surface,
  },
  actions: {
    marginTop: theme.spacing(2),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
  },
  btn: {
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1.25),
    borderRadius: theme.radius.md,
  },
  btnPrimary: {
    backgroundColor: theme.colors.primary,
  },
  btnDisabled: {
    opacity: 0.6,
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  btnText: {
    fontSize: 16,
  },
  btnGhostText: {
    color: theme.colors.text,
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});
