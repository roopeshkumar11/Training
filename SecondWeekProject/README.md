# 🛍️ E-Commerce Mobile App

[![React Native](https://img.shields.io/badge/React_Native-v0.88.1-61DAFB?style=flat&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-v6.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-v19.3.0-20232A?style=flat&logo=react)](https://react.dev)
[![React Navigation](https://img.shields.io/badge/React_Navigation-v7-6B52AE?style=flat&logo=react-navigation)](https://reactnavigation.org/)
[![API](https://img.shields.io/badge/Data_Provider-DummyJSON-orange)](https://dummyjson.com/)

> **"Your one-stop shopping destination"**  
> A modern, responsive, and feature-rich E-Commerce mobile application built with React Native, TypeScript, and React Navigation. Designed with a clean teal aesthetic (`#00a896`), fluid animations, and real-time integration with the DummyJSON REST API.

---

## 📱 App Preview

| 🔐 Login Screen | ✨ Create Account | 🏠 Home & Products |
|:---:|:---:|:---:|
| Clean authentication with email & password validations | Quick onboarding form with confirmation checks | Search, horizontal category pills, & 2-column product grid |

| 🔍 Product Details | 🛒 Shopping Cart | 💳 Checkout Screen |
|:---:|:---:|:---:|
| Detailed specifications, gallery, warranty, stock & quantity stepper | Real-time cart calculation, quantity controls & item removal | Delivery address validation & flexible payment options |

---

## ✨ Features

- **🔐 User Authentication**:
  - Intuitive **Login** & **Sign Up** forms with custom input field validation.
  - Interactive password visibility toggle (show / hide).
  - Clean error messaging and formatted inputs.

- **🔍 Product Discovery & Browsing**:
  - Live product search with query debouncing.
  - Horizontally scrollable category filtering (Beauty, Fragrances, Furniture, Groceries, and more).
  - 2-column responsive product card grid showing thumbnail, title, rating stars, discount badges, and currency pricing (`₹`).
  - Smooth page-based pagination with auto-scroll to top.

- **📦 Detailed Product View**:
  - High-resolution product images and thumbnail preview gallery.
  - Comprehensive metadata: Brand, Category, Rating, Stock availability, Warranty Information, and Return Policy.
  - Interactive quantity stepper (`+` / `-`).
  - One-tap "Add to Cart" with dynamic price calculations.

- **🛒 Cart & Order Management**:
  - Real-time cart state synchronization with added items.
  - Increment / decrement quantity directly in the cart or remove unwanted items.
  - Live dynamic total price calculation.
  - Direct transition to the Checkout process.

- **💳 Delivery & Checkout**:
  - Complete shipping address form (Full Name, Phone, Email, Street Address, City, State, Pincode, Landmark).
  - Payment method selection:
    - 💵 Cash on Delivery (COD)
    - 💳 Credit / Debit Card
    - 📱 UPI / Net Banking
  - Order summary breakdown and order placement confirmation.

- **🎨 Modern UI & Intuitive Navigation**:
  - Official `@react-navigation/bottom-tabs` paired with `@react-native-vector-icons/ionicons`.
  - Nested `@react-navigation/native-stack` navigation for seamless screen transitions.
  - Edge-to-edge safe area handling with `react-native-safe-area-context`.

---

## 🛠️ Tech Stack & Libraries

| Technology | Purpose |
|---|---|
| **[React Native 0.88.1](https://reactnative.dev)** | Cross-platform mobile framework |
| **[React 19.3.0](https://react.dev)** | Core UI library & hooks (`useState`, `useEffect`, `useRef`) |
| **[TypeScript](https://www.typescriptlang.org/)** | Strongly typed JavaScript development |
| **[React Navigation v7](https://reactnavigation.org/)** | Native Stack & Bottom Tab Navigation |
| **[@react-native-vector-icons/ionicons](https://oblador.github.io/react-native-vector-icons/)** | Scalable vector icons throughout the interface |
| **[React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)** | Safe screen handling across notches and status bars |
| **[DummyJSON REST API](https://dummyjson.com/)** | Backend data source for real products, search, and categories |

---

## 📁 Project Structure

```text
SecondWeekProject/
├── android/                   # Android native project files
├── ios/                       # iOS native project files
├── src/
│   ├── components/            # Reusable UI components
│   │   └── ProductCard.tsx    # Product card component for catalog grids
│   ├── navigation/            # Navigation configurations
│   └── screens/               # Application screens
│       ├── Login.tsx          # Login & authentication screen
│       ├── Sign.tsx           # User registration screen
│       ├── Home.tsx           # Main product catalog, search & categories
│       ├── Category.tsx       # Dedicated category browsing screen
│       ├── ProductDetails.tsx # Product details, specs, and gallery
│       ├── Cart.tsx           # Shopping cart screen with item controls
│       ├── Checkout.tsx       # Shipping address & payment options
│       ├── Wishlist.tsx       # Saved / favorite items screen
│       └── Profile.tsx        # User profile & account management
├── App.tsx                    # Root navigator (Stack & Tab configuration)
├── index.js                   # Application entry point
├── package.json               # Dependencies and scripts
├── tsconfig.json              # TypeScript compiler settings
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have your development environment set up according to the [React Native CLI Environment Setup](https://reactnative.dev/docs/environment-setup) guide:

- **Node.js**: `>= 22.11.0`
- **Package Manager**: npm or Yarn
- **Java Development Kit (JDK)**: JDK 17
- **Android Studio** (for Android) or **Xcode** (for macOS / iOS)
- Android Emulator or physical device connected via USB debugging

---

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd SecondWeekProject
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **(iOS Only) Install CocoaPods**:
   ```bash
   cd ios && bundle exec pod install && cd ..
   ```

---

### Running the App

#### 1. Start Metro Bundler
Start the Metro server in the root of the project:
```bash
npm start
```

#### 2. Run on Android
Open a new terminal window and run:
```bash
npm run android
```

#### 3. Run on iOS (macOS only)
```bash
npm run ios
```

---

## 🌐 API Reference

The application integrates with [DummyJSON](https://dummyjson.com):

| Endpoint | Method | Description |
|---|:---:|---|
| `/products?limit=8&skip={offset}` | `GET` | Fetches paginated products list |
| `/products/search?q={query}` | `GET` | Searches products matching the search query |
| `/products/category-list` | `GET` | Fetches available product categories |
| `/products/category/{category}` | `GET` | Filters products by selected category |
| `/products/{id}` | `GET` | Fetches complete details of a single product |

---

## 🎨 Design System & Palette

The user interface uses a coordinated color palette:

- **Primary Teal**: `#00a896` (Brand color for buttons, active tabs, and primary actions)
- **Primary Dark**: `#007a6e` (Hover / active state accents)
- **Primary Light**: `#e6f7f5` (Subtle input backgrounds and tag badges)
- **Background**: `#ffffff` / `#f8fafc` (Clean card and screen surfaces)
- **Dark Text**: `#1a202c` (High readability headings and product titles)
- **Muted Text**: `#718096` (Secondary labels and descriptions)

---

## 📜 Available Scripts

| Command | Action |
|---|---|
| `npm start` | Starts the Metro development server |
| `npm run android` | Builds and launches the app on Android |
| `npm run ios` | Builds and launches the app on iOS |
| `npm run lint` | Runs ESLint to check code quality |
| `npm test` | Runs unit tests using Jest |

---

## 🤝 Contributing

Contributions are always welcome!
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
