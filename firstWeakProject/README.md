# First Week Project - React Native App

A simple React Native mobile application built as part of the Week 1 training. The app includes a Login screen with authentication check and a Home screen that fetches and displays products from an API.

---

## 📱 Features

- **Login Screen**: Simple user login form with username and password validation.
- **Product List (Home Screen)**: Fetches real-time products from FakeStore API using Axios.
- **Custom Card Component**: Displays product image, title, category, and price in a clean card layout.
- **Logout Support**: Easily log out and return to the login screen.

---

## 📁 Project Structure

```
firstWeakProject/
├── App.tsx                 # Main entry component
├── index.js                # AppRegistry configuration
├── pages/
│   ├── LoginForm.tsx       # Login page with input validation
│   └── Home.tsx            # Home page with product list and loading indicator
├── component/
│   └── Card.tsx            # Reusable product card component
└── android/                # Android native project files
```

---

## 🚀 How to Run the App

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the Metro server**:
   ```bash
   npm start
   ```

3. **Run on Android**:
   ```bash
   npm run android
   ```

---

## 📦 How to Build the APK

To generate a standalone APK that can be installed on any Android phone:

1. Go to the `android` directory:
   ```bash
   cd android
   ```

2. Build the release APK:
   ```bash
   gradlew assembleRelease
   ```

3. Find your generated APK at:
   ```
   android/app/build/outputs/apk/release/app-release.apk
   ```

---

## 🛠️ Tech Stack

- **React Native** (v0.88)
- **TypeScript**
- **Axios** (for API requests)
- **FakeStore API** (products data)
