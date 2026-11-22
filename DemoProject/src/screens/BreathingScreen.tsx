import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Animated,
  Dimensions,
  Platform,
  Image,
  Easing,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const ORB_SIZE = width * 0.65;

interface BreathingScreenProps {
  onBack?: () => void;
  onSkip?: () => void;
}

export const BreathingScreen: React.FC<BreathingScreenProps> = ({
  onBack,
  onSkip,
}) => {
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Hold');
  const [instruction, setInstruction] = useState<string>(
    'Breathe in quietly through the nose for four seconds'
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // 1. Dynamic Breathing Scale (Expands on Inhale, stays on Hold, contracts on Exhale)
  const breathAnim = useRef(new Animated.Value(1)).current;
  // 2. Continuous 360° hypnotic rotation for fluid liquid gradient motion
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Continuous rotation loop
  useEffect(() => {
    let loopAnim: Animated.CompositeAnimation | null = null;
    if (!isPaused) {
      loopAnim = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 14000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      loopAnim.start();
    }
    return () => {
      if (loopAnim) loopAnim.stop();
    };
  }, [isPaused, rotateAnim]);

  // Breathing Cycle Animation
  useEffect(() => {
    if (isPaused) return;

    let isMounted = true;

    const runCycle = () => {
      if (!isMounted) return;

      // Phase 1: Inhale (4s)
      setPhase('Inhale');
      setInstruction('Breathe in quietly through the nose for four seconds');
      Animated.timing(breathAnim, {
        toValue: 1.16,
        duration: 4000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished || !isMounted) return;

        // Phase 2: Hold (4s)
        setPhase('Hold');
        setInstruction('Hold your breath gently and stay centered');
        setTimeout(() => {
          if (!isMounted) return;

          // Phase 3: Exhale (4s)
          setPhase('Exhale');
          setInstruction('Exhale slowly and steadily through the mouth');
          Animated.timing(breathAnim, {
            toValue: 0.94,
            duration: 4000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }).start(({ finished: exFin }) => {
            if (!exFin || !isMounted) return;
            runCycle();
          });
        }, 4000);
      });
    };

    runCycle();

    return () => {
      isMounted = false;
      breathAnim.stopAnimation();
    };
  }, [isPaused, breathAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const topPadding =
    (Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : (insets.top || 20)) + 8;

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.contentContainer, { paddingTop: topPadding }]}>
        {/* TOP HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              activeOpacity={0.75}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Breathing</Text>
          </View>

          <TouchableOpacity
            style={styles.skipButton}
            onPress={onSkip}
            activeOpacity={0.75}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* TITLE */}
        <View style={styles.titleSection}>
          <Text style={styles.sessionTitle}>Meditate for 30 minutes</Text>
        </View>

        {/* CENTER BREATHING ORB (REAL ANIMATED .GIF ASSET) */}
        <View style={styles.orbSection}>
          <Animated.View
            style={[
              styles.orbWrapper,
              {
                transform: [{ scale: breathAnim }],
              },
            ]}
          >
            <Image
              source={require('../../assets/breathing_orb.gif')}
              style={styles.orbImage}
              resizeMode="contain"
            />
          </Animated.View>

          {/* Centered Calligraphic Script Overlay Text */}
          <View style={styles.orbTextOverlay} pointerEvents="none">
            <Text style={styles.orbText}>
              {phase === 'Hold' ? 'Hold' : phase}
            </Text>
          </View>
        </View>

        {/* INSTRUCTION TEXT */}
        <View style={styles.instructionSection}>
          <Text style={styles.instructionText}>{instruction}</Text>
        </View>

        {/* PROGRESS SLIDER TRACK WITH THUMB */}
        <View style={styles.sliderContainer}>
          <View style={styles.sliderTrack}>
            <View
              style={[
                styles.sliderFill,
                {
                  width:
                    phase === 'Inhale'
                      ? '42%'
                      : phase === 'Hold'
                      ? '50%'
                      : '75%',
                },
              ]}
            />
            <View
              style={[
                styles.sliderThumb,
                {
                  left:
                    phase === 'Inhale'
                      ? '42%'
                      : phase === 'Hold'
                      ? '50%'
                      : '75%',
                },
              ]}
            />
          </View>
        </View>

        {/* BOTTOM PAUSE CONTROL & HOME INDICATOR */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={styles.pauseButton}
            activeOpacity={0.8}
            onPress={() => setIsPaused(!isPaused)}
          >
            {isPaused ? (
              <Text style={styles.playIcon}>▶</Text>
            ) : (
              <View style={styles.pauseBars}>
                <View style={styles.pauseBar} />
                <View style={styles.pauseBar} />
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.homeIndicatorWrapper}>
            <View style={styles.homeIndicator} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FAF7FD',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 12 : 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  backArrow: {
    fontSize: 22,
    color: '#1E1638',
    fontWeight: '600',
    marginTop: -2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1638',
    marginLeft: 14,
  },
  skipButton: {
    borderWidth: 1.5,
    borderColor: '#8447C7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8447C7',
  },
  titleSection: {
    alignItems: 'center',
    marginTop: 10,
  },
  sessionTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1E1638',
    textAlign: 'center',
  },
  orbSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    position: 'relative',
  },
  orbWrapper: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orbImage: {
    width: ORB_SIZE,
    height: ORB_SIZE,
  },
  orbTextOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  orbText: {
    fontSize: 50,
    fontStyle: 'italic',
    fontWeight: '600',
    color: '#3B0D60',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'serif',
  },
  instructionSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#686278',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
  },
  sliderContainer: {
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  sliderTrack: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F0EAF8',
    position: 'relative',
    justifyContent: 'center',
  },
  sliderFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#B38DE8',
  },
  sliderThumb: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1E1638',
    top: -4,
    marginLeft: -6,
  },
  bottomSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  pauseButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 1.5,
    borderColor: '#CEB2F7',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8447C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  pauseBars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBar: {
    width: 4.5,
    height: 19,
    borderRadius: 2.5,
    backgroundColor: '#8447C7',
    marginHorizontal: 3,
  },
  playIcon: {
    fontSize: 22,
    color: '#8447C7',
    marginLeft: 3,
  },
  homeIndicatorWrapper: {
    alignItems: 'center',
    paddingTop: 4,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#1E1638',
    opacity: 0.8,
  },
});
