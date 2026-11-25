# 👟 Animated Product Detail Screen (React Native Reanimated)

A modern, high-performance Animated Product Detail Screen built with **React Native**, **Reanimated v4**, and **Gesture Handler**. Designed with a minimalist luxury dark aesthetic (inspired by Nike SNKRS / Apple Store).

---

## 🎯 Assignment Topics Implemented

| Topic | Implementation in App | Reanimated / Gesture API |
| :--- | :--- | :--- |
| **1. Shared Element Transitions** | List card image smoothly transitions into the detail screen header image | `sharedTransitionTag` |
| **2. Gesture-based Animations** | • Drag down top bar to dismiss/close the screen<br>• Drag/swipe sneaker image left & right with 3D tilt | `Gesture.Pan()`, `<GestureDetector>` |
| **3. Parallax Scrolling** | Pull-down rubber-band zoom (1.45x) & scroll-up depth translation | `useAnimatedScrollHandler()`, `interpolate()` |
| **4. Spring & Timing Animations** | • Heart like button bounce<br>• Add-to-cart button tactile press<br>• Smooth toast slide & fade | `withSpring()` (physics bounce)<br>`withTiming()` (duration curve) |

---

## 🚀 How to Run the Project

### Step 1: Start Metro Bundler
Terminal 1 me project folder ke andar run karein:
```bash
npm start
```

### Step 2: Android App Run Karein
Emulator ya USB se phone connect karke Terminal 2 me run karein:
```bash
npm run android
```

---

## 📱 Features & Gestures To Test

1. **Card Press**: List screen me kisi sneaker card par tap karein (spring press feedback).
2. **Parallax Scroll**: Detail screen me:
   - Dheere se **neeche pull karein** 👉 Image 1.45x zoom-in hogi.
   - **Upar scroll karein** 👉 Image background me aadhi speed se translate hogi (3D depth).
3. **Swipe Down to Close**: Top bar ya drag pill ko neeche swipe karke screen dismiss karein.
4. **Image Swipe**: Sneaker image ko left/right drag karein 👉 Image tilt hogi aur ungli chhodte hi spring se wapas snap hogi.
5. **Like Heart Button**: Heart icon dabayein 👉 Physics-based spring bounce pop dikhega.
6. **Quantity Selector (`-` `1` `+`)**: Quantity badhane/ghatane par bouncy spring animation aur dynamic total price update.
7. **Add to Cart**: Button dabane par press bounce aur bottom se smooth toast notification float hoga.

---

## 📂 Project Structure

```text
MyApp/
├── App.tsx                          # Root with SafeAreaProvider & Animated Screen Switching
├── babel.config.js                  # Configured with react-native-reanimated/plugin
├── index.js                         # gesture-handler import at the top
└── src/
    ├── types.ts                     # TypeScript data model for Product
    ├── data/
    │   └── products.ts              # HD sneaker catalog data
    └── screens/
        ├── ProductListScreen.tsx    # List cards with safe area & press animations
        └── ProductDetailScreen.tsx  # Parallax header, swipe gestures, spring & timing buttons
```

---

## 🧠 Key Hooks & Functions (Quick Cheat-Sheet)

- **`useSharedValue(initialValue)`**: Value ko React state ke bajaye direct Native UI Thread par rakhta hai (60-120 FPS performance).
- **`useAnimatedStyle(() => { ... })`**: Shared value ko component ki styling (transform, scale, opacity) se jodta hai.
- **`useAnimatedScrollHandler({ onScroll: ... })`**: ScrollView ke offset ko smooth track karta hai bina JS bridge ko block kiye.
- **`Gesture.Pan()`**: Finger swipe aur drag coordinates ko track karne ke liye.
- **`withSpring()`**: Real-world physics bounce (damping aur stiffness ke sath).
- **`withTiming()`**: Fixed time (duration) me smooth transition curve.
