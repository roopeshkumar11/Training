# 📱 React Native & Mobile Development Training

[![React Native](https://img.shields.io/badge/React_Native-v0.88-61DAFB?style=flat&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5%2F6-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript)](https://developer.mozilla.org/)
[![React Navigation](https://img.shields.io/badge/React_Navigation-v7-6B52AE?style=flat&logo=react-navigation)](https://reactnavigation.org/)
[![Expo](https://img.shields.io/badge/Expo-v52-000020?style=flat&logo=expo)](https://expo.dev/)

A structured repository containing daily learning modules, hands-on practice code, and full capstone projects completed during the mobile application development training program.

---

## 📂 Repository Overview & Curriculum

| Module | Focus Area | Key Concepts Covered | Tech Stack |
|---|---|---|---|
| **[day1](./day1)** | JavaScript Fundamentals | Variables, Scopes, Arrow Functions, Operators, Destructuring, Promises, Async/Await, Error Handling | Modern JavaScript (ES6+) |
| **[day2](./day2)** | TypeScript & Expo Intro | Type annotations, Interfaces, Custom Types, Union Types, Any, Initial Mobile App setup | TypeScript, Expo |
| **[day3](./day3)** | React Native UI & Styling | NativeWind / Tailwind CSS in React Native, Layouts, Reusable Components (`Heropage`) | React Native, Expo, NativeWind |
| **[firstWeakProject](./firstWeakProject)** | **Week 1 Capstone Project** | Authentication Login Form, FakeStore API integration via Axios, Product Cards, Android APK build | React Native CLI, TypeScript, Axios |
| **[days6and7](./days6and7)** | React Navigation Deep Dive | `@react-navigation/native-stack`, Type-safe routes (`RootStackParamList`), Navigation between screens | React Native CLI, React Navigation v7 |
| **[SecondWeekProject](./SecondWeekProject)** | **Week 2 Capstone Project** | Full-Featured E-Commerce App: Bottom Tabs, Nested Stacks, DummyJSON API, Search, Categories, Cart, Checkout | React Native CLI, TypeScript, React Navigation v7, Ionicons |

---

## 🌟 Capstone Projects

### 🛍️ Week 2 Project: Full-Featured E-Commerce App
📁 **Folder**: [`SecondWeekProject`](./SecondWeekProject) &bull; 📖 **[Detailed Documentation](./SecondWeekProject/README.md)**

A modern, production-ready e-commerce mobile application with complete shopping workflows and real-time backend integration.

- **Authentication Flow**: Login & Signup screens with client-side form validation and password visibility toggles.
- **Product Catalog & Search**:
  - Live real-time search with query debouncing.
  - Horizontally scrollable category filter pills (Beauty, Fragrances, Furniture, Groceries, etc.).
  - 2-column responsive product card grid with ratings, discounts, and currency formatting (`₹`).
  - Page-by-page pagination with smooth scroll-to-top.
- **Product Details**: Image gallery preview, full specifications, warranty, return policy, and interactive quantity stepper.
- **Cart & Order System**: Real-time state management for item quantities, instant price recalculation, and item removal.
- **Checkout & Shipping**: Multi-field address validation and flexible payment options (Cash on Delivery, Credit/Debit Card, UPI / Net Banking).
- **Navigation Architecture**: Official `@react-navigation/bottom-tabs` paired with nested Native Stacks and `@react-native-vector-icons/ionicons`.

---

### 📦 Week 1 Project: Store & Product Browser
📁 **Folder**: [`firstWeakProject`](./firstWeakProject) &bull; 📖 **[Detailed Documentation](./firstWeakProject/README.md)**

A mobile storefront application focused on authentication and asynchronous data handling:

- **Login Screen**: Secure user login with form validation.
- **API Integration**: Real-time product fetching from FakeStore API using **Axios**.
- **Component Reusability**: Modular Card component displaying product image, title, price, and category.
- **Android Release Build**: Configured standalone APK release generation (`gradlew assembleRelease`).

---

## 📚 Daily Learning Modules

<details>
<summary><b>Day 1: JavaScript Foundations</b> (Click to expand)</summary>

Exercises covering fundamental and modern ES6+ concepts:
- `varible.js`: Variable declarations (`let`, `const`, `var`), scoping, and hoisting.
- `function.js`: Function declarations, expressions, arrow functions, and callback logic.
- `operators-conditionals.js`: Arithmetic, logical, comparison operators, and conditional branching.
- `object-array-destructer.js`: Object and array destructuring, spread & rest operators.
- `promise-async.js`: Asynchronous programming using Promises and `async`/`await`.
- `error-handling.js`: Structured error handling with `try`, `catch`, and `finally`.
</details>

<details>
<summary><b>Day 2: TypeScript & Mobile Setup</b> (Click to expand)</summary>

Transitioning from dynamic JavaScript to strongly-typed TypeScript:
- **`practice ts/`**:
  - `typesinTs.ts`: Primitives (`number`, `string`, `boolean`, `array`).
  - `customeType.ts`: Custom types, interfaces, and type aliasing.
  - `unionAndany.ts`: Union types, type narrowing, and avoiding `any`.
- **`app/myapp/`**: Setup and exploration of an Expo mobile application.
</details>

<details>
<summary><b>Day 3: React Native Components & Styling</b> (Click to expand)</summary>

Building mobile user interfaces:
- Setup with Expo and modern tooling.
- NativeWind / Tailwind CSS configuration (`global.css`).
- Building reusable UI elements (`Heropage.tsx`).
</details>

<details>
<summary><b>Days 6 & 7: React Navigation</b> (Click to expand)</summary>

Multi-screen app architecture:
- Configuring `@react-navigation/native` and `@react-navigation/native-stack`.
- Implementing type-safe navigation via TypeScript param lists (`RootStackParamList`).
- Passing props and navigating seamlessly between screens (`Home` and `Login`).
</details>

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `>= 20.x` or `>= 22.x`
- **JDK**: Java Development Kit 17 (for React Native CLI / Android builds)
- **Android Studio** & Android SDK (platform tools, emulator, or physical device via USB debugging)
- **Expo Go** app (optional, for running Day 2/3 Expo projects on mobile)

### Running a React Native CLI Project (`SecondWeekProject`, `firstWeakProject`, `days6and7`)

1. **Navigate to the project directory**:
   ```bash
   cd SecondWeekProject
   # or: cd firstWeakProject
   # or: cd days6and7
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Metro development server**:
   ```bash
   npm start
   ```

4. **Launch on Android**:
   ```bash
   npm run android
   ```

### Running an Expo Project (`day3/myapp`, `day2/app/myapp`)

1. **Navigate to the app directory**:
   ```bash
   cd day3/myapp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start Expo**:
   ```bash
   npx expo start
   ```

---

## 📦 Building an Android APK

To generate a standalone release APK for testing on physical devices:

1. Open a terminal and enter the project's `android` folder:
   ```bash
   cd SecondWeekProject/android
   # or: cd firstWeakProject/android
   ```

2. Run the Gradle assemble task:
   - **Windows**:
     ```cmd
     gradlew assembleRelease
     ```
   - **macOS / Linux**:
     ```bash
     ./gradlew assembleRelease
     ```

3. Collect the generated APK from:
   ```text
   android/app/build/outputs/apk/release/app-release.apk
   ```

---

## 🛠️ Tech Stack & Tools

- **Languages**: JavaScript (ES6+), TypeScript
- **Frameworks**: React Native (CLI & Expo), React 19
- **Navigation**: React Navigation v7 (Stack & Bottom Tabs)
- **Networking**: Axios, Fetch API
- **APIs**: DummyJSON API, FakeStore API
- **Icons & Styling**: React Native Vector Icons (Ionicons), StyleSheet, NativeWind / Tailwind CSS
- **Build Tools**: Metro Bundler, Gradle, Android Studio
