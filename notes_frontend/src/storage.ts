import AsyncStorage from '@react-native-async-storage/async-storage';

export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: number; // epoch ms
};

const NOTES_KEY = 'notes_v1';

// PUBLIC_INTERFACE
export async function getAllNotes(): Promise<Note[]> {
  /** Retrieve all notes stored in AsyncStorage, sorted by updatedAt desc. */
  const raw = await AsyncStorage.getItem(NOTES_KEY);
  if (!raw) return [];
  try {
    const parsed: Note[] = JSON.parse(raw);
    return parsed.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export async function saveNotes(notes: Note[]): Promise<void> {
  /** Persist the given notes list to AsyncStorage. */
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
}

// PUBLIC_INTERFACE
export async function upsertNote(note: Note): Promise<Note[]> {
  /** Create or update a note and persist. Returns the updated array. */
  const notes = await getAllNotes();
  const idx = notes.findIndex((n) => n.id === note.id);
  const next = [...notes];
  if (idx >= 0) {
    next[idx] = note;
  } else {
    next.unshift(note);
  }
  await saveNotes(next);
  return next.sort((a, b) => b.updatedAt - a.updatedAt);
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<Note[]> {
  /** Delete a note by id and persist. Returns the updated array. */
  const notes = await getAllNotes();
  const next = notes.filter((n) => n.id !== id);
  await saveNotes(next);
  return next;
}

// PUBLIC_INTERFACE
export async function healthcheck(): Promise<{ status: 'ok' | 'error'; details?: string }> {
  /**
   * Performs a simple internal healthcheck by writing and reading a temp key.
   * This is used for EXPO_PUBLIC_HEALTHCHECK_PATH / internal health route.
   */
  try {
    const key = '__healthcheck__';
    await AsyncStorage.setItem(key, '1');
    const val = await AsyncStorage.getItem(key);
    await AsyncStorage.removeItem(key);
    if (val === '1') return { status: 'ok' };
    return { status: 'error', details: 'echo mismatch' };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : typeof e === 'string' ? e : JSON.stringify(e);
    return { status: 'error', details: String(msg) };
  }
}
