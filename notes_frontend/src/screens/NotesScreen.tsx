import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import { Theme } from '../theme';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { ListItem } from '../components/ListItem';

type Note = { id: string; text: string; };

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const openCreate = () => {
    setEditingId(null);
    setCurrentText('');
    setModalOpen(true);
  };

  const openEdit = (id: string) => {
    const n = notes.find(n => n.id === id);
    if (!n) return;
    setEditingId(id);
    setCurrentText(n.text);
    setModalOpen(true);
  };

  const save = () => {
    if (currentText.trim().length === 0) {
      setModalOpen(false);
      return;
    }
    if (editingId) {
      setNotes(prev => prev.map(n => n.id === editingId ? { ...n, text: currentText } : n));
    } else {
      setNotes(prev => [{ id: String(Date.now()), text: currentText }, ...prev]);
    }
    setModalOpen(false);
  };

  const remove = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const renderItem = ({ item }: { item: Note }) => (
    <ListItem
      title={item.text}
      onPress={() => openEdit(item.id)}
      subtitle="Tap to edit"
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Notes</Text>
        <Button title="+ Add" onPress={openCreate} />
      </View>

      {notes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No notes yet</Text>
          <Text style={styles.hint}>Press "Add" to create your first note</Text>
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingBottom: Theme.spacing.xl }}
        />
      )}

      <Modal visible={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <Text style={styles.modalTitle}>{editingId ? 'Edit Note' : 'New Note'}</Text>
        <Input
          value={currentText}
          onChangeText={setCurrentText}
          placeholder="Type your note..."
          style={{ marginTop: Theme.spacing.sm }}
          multiline
        />
        <View style={styles.modalActions}>
          <Pressable onPress={() => setModalOpen(false)} style={styles.link}>
            <Text style={styles.linkText}>Cancel</Text>
          </Pressable>
          <Button title="Save" onPress={save} />
        </View>
        {editingId ? (
          <Pressable onPress={() => { remove(editingId); setModalOpen(false); }} style={[styles.link, { marginTop: Theme.spacing.sm }]}>
            <Text style={[styles.linkText, { color: Theme.colors.secondary }]}>Delete</Text>
          </Pressable>
        ) : null}
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: 52
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
    borderBottomColor: Theme.colors.border,
    borderBottomWidth: 1
  },
  title: {
    ...Theme.typography.title
  },
  empty: {
    alignItems: 'center',
    padding: Theme.spacing.xl,
    gap: 6
  },
  emptyText: {
    color: Theme.colors.text,
    fontSize: 16,
    fontWeight: '600'
  },
  hint: {
    color: Theme.colors.secondary
  },
  modalTitle: {
    color: Theme.colors.text,
    fontSize: 18,
    fontWeight: '700'
  },
  modalActions: {
    marginTop: Theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Theme.spacing.md
  },
  link: {
    padding: Theme.spacing.sm
  },
  linkText: {
    color: Theme.colors.primary,
    fontWeight: '600'
  }
});
