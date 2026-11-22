# Days 6 & 7: React Navigation & Stack Navigator

Practice project covering screen navigation in React Native using `@react-navigation/native` and `@react-navigation/native-stack`.

---

## 🎯 Key Learnings & Concepts

- **Navigation Container**: Setting up the root `<NavigationContainer>`.
- **Native Stack Navigator**: Configuring screen stacks with `createNativeStackNavigator`.
- **Type-Safe Navigation**: Defining `RootStackParamList` with TypeScript for type-safe route navigation and params.
- **Screen Transitions**: Navigating between screens (`Home` and `Login`) using `navigation.navigate()`.

---

## 📁 Project Structure

```text
days6and7/
├── App.tsx             # Root navigator setup with Stack.Navigator and screens
├── index.js            # App entry point
├── android/            # Android native project files
├── ios/                # iOS native project files
└── package.json        # Dependencies (React Navigation v7, React Native 0.88)
```

---

## 🚀 How to Run

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Metro server**:
   ```bash
   npm start
   ```

3. **Run on Android**:
   ```bash
   npm run android
   ```
