import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const RING_SIZE = width * 0.68;
const DISC_SIZE = RING_SIZE * 0.74;

interface TimerSetupScreenProps {
  onBack?: () => void;
  onStart?: (minutes: number) => void;
  onSkip?: () => void;
}

export const TimerSetupScreen: React.FC<TimerSetupScreenProps> = ({
  onBack,
  onStart,
  onSkip,
}) => {
  const insets = useSafeAreaInsets();
  const spinAnim = useRef(new Animated.Value(0)).current;

  // Smooth continuous 60fps orbit rotation
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const topPadding = (Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : (insets.top || 20)) + 8;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* Top Header with Clean Back Button */}
        <View style={[styles.header, { paddingTop: topPadding }]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backArrowText}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Center Section: Orbit Ring & Number "0" */}
        <View style={styles.centerSection}>
          <View style={styles.ringWrapper}>
            {/* Animated Rotating Lavender Track with Orbit Dot */}
            <Animated.View
              style={[
                styles.outerRingTrack,
                { transform: [{ rotate: spin }] },
              ]}
            >
              {/* The Purple Orbit Dot on the edge */}
              <View style={styles.orbitDot} />
            </Animated.View>

            {/* Inner White Disc with Centered "0" */}
            <View style={styles.centerWhiteDisc}>
              <Text style={styles.timerZeroText}>0</Text>
            </View>
          </View>

          {/* Caption Text Below Ring */}
          <Text style={styles.captionText}>
            It's the moment you show up for{'\n'}you
          </Text>
        </View>

        {/* Bottom Actions Area */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.startButton}
            activeOpacity={0.85}
            onPress={() => onStart?.(0)}
          >
            <Text style={styles.startButtonText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipButton}
            activeOpacity={0.6}
            onPress={onSkip}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>

          {/* Home Indicator */}
          <View style={styles.homeIndicatorWrapper}>
            <View style={styles.homeIndicator} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A3468',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3EEF8',
  },
  backArrowText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E1638',
    marginTop: -2,
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  ringWrapper: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 32,
  },
  outerRingTrack: {
    position: 'absolute',
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 4,
    borderColor: '#E5D1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbitDot: {
    position: 'absolute',
    right: -11,
    top: '50%',
    marginTop: -11,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#DEC3FA',
    shadowColor: '#8747C6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  centerWhiteDisc: {
    position: 'absolute',
    width: DISC_SIZE,
    height: DISC_SIZE,
    borderRadius: DISC_SIZE / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#452D68',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
  timerZeroText: {
    fontSize: 56,
    fontWeight: '700',
    color: '#282138',
    letterSpacing: -1,
  },
  captionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#2F2642',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  bottomSection: {
    paddingBottom: Platform.OS === 'ios' ? 12 : 20,
    gap: 14,
  },
  startButton: {
    backgroundColor: '#8747C6',
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8747C6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  skipButtonText: {
    color: '#7E7893',
    fontSize: 14,
    fontWeight: '500',
  },
  homeIndicatorWrapper: {
    alignItems: 'center',
    paddingTop: 6,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#1E1638',
    opacity: 0.8,
  },
});
