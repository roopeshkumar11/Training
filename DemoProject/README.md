# 🌿 Nuvani - Wellness & Meditation App

A modern, pixel-perfect Wellness, Mindfulness, and Meditation mobile application built with **React Native CLI**, **TypeScript**, and React Native **StyleSheet** object styles.

This project implements all **7 core screens** from the Figma design specifications with smooth 60 FPS animations, video background support, and responsive layouts.

---

## 📱 Screenshots & Screens Overview

| # | Screen | Component | Key Highlights |
|---|---|---|---|
| **1** | **Welcome Screen** | `WelcomeScreen.tsx` | Edge-to-edge looped liquid metal video (`0_Abstract_Liquid_Metal_1280x720.mp4`), gradient fade into deep indigo (`#16104E`), "Create New Account", and Auth flow. |
| **2** | **Home Dashboard** | `HomeScreen.tsx` | Lavender curved header (`#E5CDFD`), Dr. Arshia avatar, streak counter (`🔥 5`), interactive 5-mood selector, Energy & Sleep action cards, stress level slider (0–10), and elevated wave bottom navigation bar. |
| **3** | **Timer Setup** | `TimerSetupScreen.tsx` | Pure `#FFFFFF` clean background, 60 FPS hardware-accelerated animated orbit circle (`#DEC3FA`), white center disc countdown display, and purple Start button (`#8747C6`). |
| **4** | **Active Movement** | `ActiveMovementScreen.tsx` | Upper-third anchored countdown timer & title, Figma concentric ripple rings graphic, bottom white card with double-sparkle badge (`✦ ✦`), and "Finish" action. |
| **5** | **Audio Player** | `AudioPlayerScreen.tsx` | Exact Figma linear gradient (`linear-gradient(180deg, rgba(147, 83, 210, 0) 0%, #9353D2 52.4%, #9353D2 100%)`), frosted circular buttons, "🪷 Calm" pill, calligraphic typography (*𝒟eep breathing for ℛelaxation*), audio waveform visualizer, and 10s skip controls. |
| **6** | **Breathing Exercise** | `BreathingScreen.tsx` | Ambient pastel backdrop (`#FAF7FD`), animated iridescent fluid liquid orb (`breathing_orb.gif`), synchronized 4s Inhale / 4s Hold / 4s Exhale scale pulse, calligraphic "*Hold*" overlay, progress slider, and circular pause button. |
| **7** | **Product Detail** | `ProductDetailScreen.tsx` | Curved peach hero banner (`#FFF7EC`), wellness capsule product bottle (`product_bottle.png`), star rating badge (`★ 4.6`), pricing with discount badge ("Save $10.00"), description, bulleted features, Zen Wellness seller card, customer reviews dummy data, and sticky quantity stepper with "Add to Cart". |

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** React Native `0.88.1` (React `19.3.0`)
- **Language:** TypeScript `6.0` (Strict typing)
- **Styling:** React Native `StyleSheet.create` (Pure object styles, zero external CSS dependencies)
- **Video Playback:** `react-native-video` (Looped background video for Welcome Screen)
- **Icons:** `react-native-vector-icons` (Ionicons, Feather, MaterialCommunityIcons)
- **Safe Area Insets:** `react-native-safe-area-context` (Edge-to-edge support across notch & punch-hole displays)

---

## 📂 Project Directory Structure

```text
DemoProject/
├── android/                        # Android native project files
│   ├── app/
│   │   ├── build.gradle            # Vector icons & native config
│   │   └── src/main/assets/fonts/  # Bundled .ttf icon fonts
├── assets/                         # Static media assets
│   ├── 0_Abstract_Liquid_Metal_1280x720.mp4  # Looped welcome video
│   ├── breathing_orb.gif           # Fluid iridescent breathing GIF (4.6 MB)
│   ├── ripple_circles.png          # Concentric ripple rings graphic
│   ├── loader_circle.gif           # Timer orbit loader GIF
│   ├── doctor_avatar.png           # Dr. Arshia avatar photo
│   └── product_bottle.png          # Store product bottle photo
├── src/
│   ├── screens/                    # Screen components
│   │   ├── WelcomeScreen.tsx       # Screen 1: Welcome & Onboarding
│   │   ├── HomeScreen.tsx          # Screen 2: Dashboard & Mood Check-in
│   │   ├── TimerSetupScreen.tsx    # Screen 3: Meditation Timer Setup
│   │   ├── ActiveMovementScreen.tsx# Screen 4: Full Body Exercise & Timer
│   │   ├── AudioPlayerScreen.tsx   # Screen 5: Soundscape Player
│   │   ├── BreathingScreen.tsx     # Screen 6: Guided Breathing Session
│   │   └── ProductDetailScreen.tsx # Screen 7: Wellness Aromatherapy Store
│   └── theme/
│       └── theme.ts                # App colors, spacing, typography tokens
├── App.tsx                         # Main app navigator & screen state router
├── package.json                    # Project dependencies & scripts
├── react-native.config.js          # Native asset linking configuration
└── tsconfig.json                   # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have your React Native development environment set up:
- **Node.js:** `>= 18.x` (Recommended: Node 20 or 22)
- **JDK:** Java 17
- **Android Studio:** Android SDK Platform 34+, Android SDK Build-Tools, Android Virtual Device (AVD) or physical device connected via USB.

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd DemoProject
   ```

2. **Install JavaScript dependencies:**
   ```bash
   npm install
   ```

3. **Start the Metro Bundler:**
   ```bash
   npm start
   ```

4. **Build and run the Android app (in a separate terminal):**
   ```bash
   npm run android
   ```

---

## 🔄 Previewing Different Screens

All screens are wired together in [App.tsx](file:///d:/Training/Training/DemoProject/App.tsx).

To test any screen directly, change the `currentScreen` state in `App.tsx`:

```tsx
// Choose from: 'welcome' | 'home' | 'timerSetup' | 'activeMovement' | 'audioPlayer' | 'breathing' | 'productDetail'
const [currentScreen, setCurrentScreen] = useState<ScreenName>('home');
```

Save the file and press <kbd>R</kbd> + <kbd>R</kbd> in your Android emulator/device to reload.

---

## 💡 Key Design Implementation Details

1. **Pure Object Styles:** All styles use standard React Native `StyleSheet.create({ ... })`.
2. **60 FPS Hardware Acceleration:** Animations (timer orbit rotation, breathing scale, progress sliders) utilize `useNativeDriver: true` for buttery-smooth performance without JS thread blocking.
3. **Punch-Hole & Notch Handling:** Uses `useSafeAreaInsets` + `StatusBar.currentHeight` to ensure top headers and back buttons never collide with front camera cutouts.
4. **Offline Asset Fallbacks:** All video and image components include graceful fallbacks to guarantee no blank screens if a media file is buffering.

---

## 📄 License

This project is created for training and evaluation purposes. All rights reserved.
