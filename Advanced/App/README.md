# React Native Learning Hub 🚀

A single modular React Native project to practice and organize multiple topics without creating a new project every time.

## 📁 Project Structure

```text
App/
├── App.tsx                                  # React Navigation Stack setup
├── src/
│   ├── types.ts                             # Topic & Category types
│   ├── screens/
│   │   └── HomeScreen.tsx                   # Main screen listing all topics
│   └── topics/
│       ├── index.ts                         # Central registry of all topics
│       └── 04_OfflineFirst/
│           └── OfflineNotesApp.tsx          # Offline-First Notes App (SQLite)
```

## ✨ Features

- **Single Project, Multiple Topics**: Every topic lives inside `src/topics/` and appears automatically on the Home Screen.
- **React Navigation**: Uses `@react-navigation/native-stack` for native screen transitions and back navigation.
- **Included Topic — Offline-First Architecture (Notes App)**:
  - Local persistence using **SQLite** (`react-native-sqlite-storage`)
  - `notes` and `queue` tables in `notes.db`
  - Offline mutations queue (`ADD` / `DELETE`)
  - Background sync & timestamp-based conflict resolution

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run on Android
```bash
npx react-native run-android
```

### 3. Run on iOS
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

## ➕ How to Add a New Topic

1. Create a new component inside `src/topics/<TopicFolder>/MyTopic.tsx`.
2. Register it in `src/topics/index.ts`:
```ts
{
  id: 'my-topic',
  title: 'My New Topic',
  category: 'Basics',
  description: 'Short description of the topic.',
  component: MyTopic,
}
```
3. Save and reload — it automatically appears on the Home Screen and becomes a navigable screen.
