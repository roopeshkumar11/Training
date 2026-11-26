import { Topic } from '../types';
import { OfflineNotesTopic } from './OfflineFirst/OfflineNotesApp';

/**
 * 💡 WHENEVER ADDING A NEW TOPIC:
 * Simply add a new object here!
 * It will automatically appear as a card on the Main Screen.
 */
export const TOPICS: Topic[] = [
  {
    id: 'offline-first-notes',
    title: 'Offline-First Architecture (Notes App)',
    category: 'Advanced',
    description: 'SQLite DB, API Caching, Mutations Queue, Background Sync & Conflict Resolution.',
    tags: ['offline', 'sqlite', 'sync', 'queue', 'conflict', 'notes'],
    component: OfflineNotesTopic,
  },
];
