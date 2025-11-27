import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  Alert,
  Platform,
} from 'react-native';

import { Note, deleteNote, getAllNotes, healthcheck, upsertNote } from './src/storage';
import { theme } from './src/theme';
import { NoteModal } from './src/components/NoteModal';

// simple runtime "routing": if a healthcheck path is provided via env, show a healthcheck screen there.
// In Expo, env vars are read via process.env prefixed with EXPO_PUBLIC_*
const healthPath = (process.env.EXPO_PUBLIC_HEALTHCHECK_PATH || '').trim();
const appPort = (process.env.EXPO_PUBLIC_PORT || '3000').trim();

type Mode = 'list' | 'health';

export default function App() {
  const [mode, setMode] = useState<Mode>('list');

  // If a health path is declared, enable a button to navigate to it. For web, the path can be appended to URL.
  useEffect(() => {
    if (healthPath) {
      // If web and URL ends with health path, switch automatically
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        const path = window.location.pathname || '/';
        if (path === healthPath) {
          setMode('health');
        }
      }
    }
  }, []);

  if (mode === 'health') {
    return <HealthCheckScreen onBack={() => setMode('list')} />;
  }

  return <NotesHome onOpenHealth={healthPath ? () => setMode('health') : undefined} appPort={appPort} />;
}

function HealthCheckScreen({ onBack }: { onBack?: () => void }) {
  const [status, setStatus] = useState<'idle' | 'running' | 'ok' | 'error'>('idle');
  const [details, setDetails] = useState<string | undefined>();

  const run = useCallback(async () => {
    setStatus('running');
    const res = await healthcheck();
    if (res.status === 'ok') {
      setStatus('ok');
      setDetails(undefined);
    } else {
      setStatus('error');
      setDetails(res.details);
    }
  }, []);

  useEffect(() => {
    run();
  }, [run]);

  return (
    <SafeAreaView style={[styles.container, { padding: theme.spacing(2) }]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Healthcheck</Text>
        {onBack && (
          <Pressable onPress={onBack} style={({ pressed }) => [styles.btn, styles.btnGhost, pressed && styles.pressed]}>
            <Text style={[styles.btnText, styles.btnGhostText]}>Back</Text>
          </Pressable>
        )}
      </View>
      <View style={[styles.card, { marginTop: theme.spacing(2) }]}>
        <Text style={styles.bodyText}>Status: {status.toUpperCase()}</Text>
        {details ? <Text style={[styles.bodyText, { color: theme.colors.textMuted }]}>Details: {details}</Text> : null}
        <Pressable onPress={run} style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.pressed, { marginTop: theme.spacing(2) }]}>
          <Text style={styles.btnPrimaryText}>Run again</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function NotesHome({ onOpenHealth, appPort }: { onOpenHealth?: () => void; appPort: string }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<Note | undefined>();

  const load = useCallback(async () => {
    const data = await getAllNotes();
    setNotes(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((n) => (n.title?.toLowerCase() ?? '').includes(q) || (n.content?.toLowerCase() ?? '').includes(q));
  }, [notes, query]);

  const openNew = () => {
    setEditing(undefined);
    setModalVisible(true);
  };

  const openEdit = (note: Note) => {
    setEditing(note);
    setModalVisible(true);
  };

  const onSubmit = async ({ title, content }: { title: string; content: string }) => {
    const now = Date.now();
    const id = editing?.id ?? `${now}-${Math.random().toString(36).slice(2, 8)}`;
    const updated: Note = { id, title, content, updatedAt: now };
    const next = await upsertNote(updated);
    setNotes(next);
    setModalVisible(false);
    setEditing(undefined);
  };

  const onDelete = (note: Note) => {
    Alert.alert('Delete note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const next = await deleteNote(note.id);
          setNotes(next);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.topBar}>
        <View>
          <Text style={styles.title}>Notes</Text>
          <Text style={styles.subtitle}>Quickly capture and organize</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          {onOpenHealth ? (
            <Pressable onPress={onOpenHealth} style={({ pressed }) => [styles.pill, pressed && styles.pressed]}>
              <Text style={styles.pillText}>Health</Text>
            </Pressable>
          ) : null}
          <View style={{ marginTop: theme.spacing(1) }}>
            <Text style={styles.portText}>Port: {appPort}</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search notes..."
          placeholderTextColor={theme.colors.textMuted}
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
        <Pressable onPress={openNew} style={({ pressed }) => [styles.addBtn, pressed && styles.pressed]}>
          <Text style={styles.addBtnText}>+ New</Text>
        </Pressable>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: theme.spacing(2), paddingBottom: theme.spacing(4) }}
        ListEmptyComponent={
          <View style={{ padding: theme.spacing(4), alignItems: 'center' }}>
            <Text style={[styles.bodyText, { color: theme.colors.textMuted }]}>No notes yet. Tap “+ New” to create one.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => openEdit(item)} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title || 'Untitled'}</Text>
              {!!item.content && <Text style={styles.cardPreview} numberOfLines={2}>{item.content}</Text>}
              <Text style={styles.cardMeta}>{new Date(item.updatedAt).toLocaleString()}</Text>
            </View>
            <Pressable onPress={() => onDelete(item)} style={({ pressed }) => [styles.deleteBtn, pressed && styles.pressed]}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </Pressable>
        )}
      />

      <NoteModal
        visible={modalVisible}
        initial={editing}
        onClose={() => {
          setModalVisible(false);
          setEditing(undefined);
        }}
        onSubmit={onSubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topBar: {
    paddingHorizontal: theme.spacing(2),
    paddingTop: Platform.select({ android: theme.spacing(1), ios: 0 }),
    paddingBottom: theme.spacing(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.textMuted,
    marginTop: 4,
  },
  portText: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing(2),
    marginBottom: theme.spacing(1),
    gap: theme.spacing(1),
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1.25),
    color: theme.colors.text,
  },
  addBtn: {
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing(2),
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#1f2937',
    fontWeight: '800',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing(1),
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(1.25),
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 2,
  },
  cardPreview: {
    color: theme.colors.textMuted,
    marginBottom: 6,
  },
  cardMeta: {
    color: theme.colors.textMuted,
    fontSize: 12,
  },
  deleteBtn: {
    paddingHorizontal: theme.spacing(1),
    paddingVertical: theme.spacing(0.5),
    borderRadius: theme.radius.sm,
    backgroundColor: '#fff5f5',
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  deleteText: {
    color: theme.colors.error,
    fontWeight: '700',
  },
  bodyText: {
    color: theme.colors.text,
  },
  cardContainer: {},
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardHealth: {
    backgroundColor: theme.colors.surface,
  },
  pill: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing(1.5),
    paddingVertical: 6,
    borderRadius: 999,
  },
  pillText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  btn: {
    paddingHorizontal: theme.spacing(1.5),
    paddingVertical: theme.spacing(1),
    borderRadius: theme.radius.md,
  },
  btnPrimary: {
    backgroundColor: theme.colors.primary,
  },
  btnPrimaryText: {
    color: '#fff',
    fontWeight: '700',
  },
  btnGhost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  btnGhostText: {
    color: theme.colors.text,
  },
  pressed: { opacity: 0.9 },
});
