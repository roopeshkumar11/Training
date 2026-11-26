import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

interface Note {
  id: string;
  text: string;
  updatedAt: number;
  synced: number; // SQLite stores boolean as 0 (false) or 1 (true)
}

interface QueueItem {
  id: string;
  text: string;
  updatedAt: number;
  action: 'ADD' | 'DELETE';
}

// Mock Server storage (acts like a backend API)
let serverNotes: Note[] = [
  { id: '1', text: 'Sample Note', updatedAt: 1000, synced: 1 },
];

export function OfflineNotesTopic() {
  const [db, setDb] = useState<SQLiteDatabase | null>(null);
  const [isOnline] = useState(true);
  const [text, setText] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  // 1. Open SQLite database and create tables
  useEffect(() => {
    const setupDB = async () => {
      try {
        const database = await SQLite.openDatabase({
          name: 'notes.db',
          location: 'default',
        });

        await database.executeSql(
          'CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, text TEXT, updatedAt INTEGER, synced INTEGER)',
        );
        await database.executeSql(
          'CREATE TABLE IF NOT EXISTS queue (id TEXT PRIMARY KEY, text TEXT, updatedAt INTEGER, action TEXT)',
        );

        setDb(database);
        await refreshFromSQLite(database);
      } catch (error) {
        Alert.alert(
          'SQLite Not Ready',
          'Please rebuild the app once (npx react-native run-android) so SQLite native module links.\n\n' +
            String(error),
        );
      }
    };

    setupDB();
  }, []);

  // Read notes from SQLite
  const refreshFromSQLite = async (database: SQLiteDatabase) => {
    const [notesRes] = await database.executeSql(
      'SELECT * FROM notes ORDER BY updatedAt DESC',
    );
    const loadedNotes: Note[] = [];
    for (let i = 0; i < notesRes.rows.length; i++) {
      loadedNotes.push(notesRes.rows.item(i));
    }
    setNotes(loadedNotes);
  };

  // 2. Background sync when online
  useEffect(() => {
    if (isOnline && db) {
      syncWithServer(db);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOnline, db]);

  const syncWithServer = async (database: SQLiteDatabase) => {
    const [queueRes] = await database.executeSql('SELECT * FROM queue');

    for (let i = 0; i < queueRes.rows.length; i++) {
      const item: QueueItem = queueRes.rows.item(i);

      if (item.action === 'DELETE') {
        serverNotes = serverNotes.filter((n) => n.id !== item.id);
      } else if (item.action === 'ADD') {
        const existing = serverNotes.find((n) => n.id === item.id);

        if (!existing) {
          serverNotes.unshift({
            id: item.id,
            text: item.text,
            updatedAt: item.updatedAt,
            synced: 1,
          });
        } else if (item.updatedAt > existing.updatedAt) {
          // Conflict resolution: newer timestamp wins
          serverNotes = serverNotes.map((n) =>
            n.id === item.id
              ? { id: item.id, text: item.text, updatedAt: item.updatedAt, synced: 1 }
              : n,
          );
        }

        await database.executeSql('UPDATE notes SET synced = 1 WHERE id = ?', [
          item.id,
        ]);
      }
    }

    // Clear queue after sync & cache server notes into SQLite
    await database.executeSql('DELETE FROM queue');
    for (const sn of serverNotes) {
      await database.executeSql(
        'INSERT OR IGNORE INTO notes (id, text, updatedAt, synced) VALUES (?, ?, ?, 1)',
        [sn.id, sn.text, sn.updatedAt],
      );
    }

    await refreshFromSQLite(database);
  };

  // 4. Add a note (always saved to SQLite first)
  const addNote = async () => {
    if (!text.trim()) return;
    if (!db) {
      Alert.alert(
        'Database Not Connected',
        'SQLite is not initialized. Please rebuild the app: npx react-native run-android',
      );
      return;
    }

    const id = Date.now().toString();
    const now = Date.now();
    const noteText = text.trim();
    setText('');

    // Save locally in SQLite
    await db.executeSql(
      'INSERT INTO notes (id, text, updatedAt, synced) VALUES (?, ?, ?, ?)',
      [id, noteText, now, isOnline ? 1 : 0],
    );

    if (isOnline) {
      serverNotes.unshift({ id, text: noteText, updatedAt: now, synced: 1 });
    } else {
      // Save to offline queue in SQLite
      await db.executeSql(
        'INSERT INTO queue (id, text, updatedAt, action) VALUES (?, ?, ?, ?)',
        [id, noteText, now, 'ADD'],
      );
    }

    await refreshFromSQLite(db);
  };

  // 5. Delete a note
  const deleteNote = async (id: string) => {
    if (!db) return;

    await db.executeSql('DELETE FROM notes WHERE id = ?', [id]);

    if (isOnline) {
      serverNotes = serverNotes.filter((n) => n.id !== id);
      await db.executeSql('DELETE FROM queue WHERE id = ?', [id]);
    } else {
      await db.executeSql(
        'INSERT OR REPLACE INTO queue (id, text, updatedAt, action) VALUES (?, ?, ?, ?)',
        [id, '', Date.now(), 'DELETE'],
      );
    }

    await refreshFromSQLite(db);
  };

  return (
    <View style={styles.container}>
      {/* Input Box */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Write a note..."
          placeholderTextColor="#94a3b8"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.addBtn} onPress={addNote}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardLeft}>
              <Text style={styles.noteText}>{item.text}</Text>
              <Text style={item.synced === 1 ? styles.synced : styles.pending}>
                {item.synced === 1 ? 'Synced' : 'Pending'}
              </Text>
            </View>
            <TouchableOpacity onPress={() => deleteNote(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', padding: 14 },
  inputRow: { flexDirection: 'row', marginBottom: 14, gap: 8 },
  input: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#0f172a',
  },
  addBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 18,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addBtnText: { color: '#ffffff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardLeft: { flex: 1, marginRight: 10 },
  noteText: { fontSize: 15, color: '#0f172a', marginBottom: 2 },
  synced: { fontSize: 12, color: '#16a34a' },
  pending: { fontSize: 12, color: '#ea580c' },
  deleteText: { color: '#dc2626', fontWeight: 'bold' },
});
