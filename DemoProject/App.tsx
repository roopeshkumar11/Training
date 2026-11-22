import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { TimerSetupScreen } from './src/screens/TimerSetupScreen';
import { ActiveMovementScreen } from './src/screens/ActiveMovementScreen';
import { AudioPlayerScreen } from './src/screens/AudioPlayerScreen';
import { BreathingScreen } from './src/screens/BreathingScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';

export type ScreenName =
  | 'welcome'
  | 'home'
  | 'timerSetup'
  | 'activeMovement'
  | 'audioPlayer'
  | 'breathing'
  | 'productDetail';

export default function App() {
  // Default initial screen is 'welcome'
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('welcome');
  const [selectedMinutes, setSelectedMinutes] = useState<number>(3);

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return (
          <WelcomeScreen
            onGetStarted={() => setCurrentScreen('home')}
            onLogin={() => setCurrentScreen('home')}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onNavigateToTimer={() => setCurrentScreen('timerSetup')}
            onNavigateToShop={() => setCurrentScreen('productDetail')}
            onNavigateToBreathing={() => setCurrentScreen('breathing')}
            onNavigateToAudio={() => setCurrentScreen('audioPlayer')}
          />
        );
      case 'timerSetup':
        return (
          <TimerSetupScreen
            onBack={() => setCurrentScreen('home')}
            onStart={(mins) => {
              setSelectedMinutes(mins || 3);
              setCurrentScreen('activeMovement');
            }}
            onSkip={() => setCurrentScreen('activeMovement')}
          />
        );
      case 'activeMovement':
        return (
          <ActiveMovementScreen
            initialMinutes={selectedMinutes}
            onClose={() => setCurrentScreen('timerSetup')}
            onFinish={() => setCurrentScreen('breathing')}
          />
        );
      case 'audioPlayer':
        return (
          <AudioPlayerScreen
            onBack={() => setCurrentScreen('home')}
            onClose={() => setCurrentScreen('home')}
          />
        );
      case 'breathing':
        return (
          <BreathingScreen
            onBack={() => setCurrentScreen('home')}
            onSkip={() => setCurrentScreen('productDetail')}
          />
        );
      case 'productDetail':
        return (
          <ProductDetailScreen
            onBack={() => setCurrentScreen('home')}
            onAddToCart={() => setCurrentScreen('home')}
          />
        );
      default:
        return (
          <WelcomeScreen
            onGetStarted={() => setCurrentScreen('home')}
            onLogin={() => setCurrentScreen('home')}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <View style={styles.rootContainer}>
        <StatusBar
          barStyle={
            currentScreen === 'welcome' ||
            currentScreen === 'audioPlayer' ||
            currentScreen === 'activeMovement'
              ? 'light-content'
              : 'dark-content'
          }
        />
        {renderActiveScreen()}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
