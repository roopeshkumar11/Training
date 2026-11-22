import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const RIPPLE_SIZE = width * 1.35;

interface ActiveMovementScreenProps {
  initialMinutes?: number;
  onClose?: () => void;
  onFinish?: () => void;
}

export const ActiveMovementScreen: React.FC<ActiveMovementScreenProps> = ({
  initialMinutes = 0,
  onClose,
  onFinish,
}) => {
  const insets = useSafeAreaInsets();
  const [secondsLeft, setSecondsLeft] = useState<number>(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const topPadding =
    (Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : (insets.top || 20)) + 8;

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" />

      {/* 2. TOP HEADER SECTION */}
      <View style={[styles.topSection, { paddingTop: topPadding }]}>
        {/* Back Button */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={onClose}
            activeOpacity={0.75}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Title, Subtitle and Giant 00:00 Timer in Upper Third */}
        <View style={styles.titleWrapper}>
          <Text style={styles.screenTitle}>Full Body Movement</Text>
          <Text style={styles.screenSubtitle}>
            3 Min exercise & Breath naturally
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsRunning(!isRunning)}
            style={styles.timerTouch}
          >
            <Text style={styles.timerDigits}>{formatTime(secondsLeft)}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. BOTTOM CARD WITH FIGMA RIPPLE CIRCLES ASSET */}
      <View style={styles.bottomCardContainer}>
        {/* Concentric Ripple circles exported from Figma, centered at badge */}
        <View style={styles.rippleWrapper} pointerEvents="none">
          <Image
            source={require('../../assets/ripple_circles.png')}
            style={styles.rippleImage}
            resizeMode="contain"
          />
        </View>

        {/* Circular Sparkle Badge Overlapping Top Edge */}
        <View style={styles.sparkleBadge}>
          <Text style={styles.sparkleTop}>✦</Text>
          <Text style={styles.sparkleBottom}>✦</Text>
        </View>

        {/* White Card */}
        <View
          style={[
            styles.bottomCard,
            { paddingBottom: Math.max(insets.bottom, 16) + 12 },
          ]}
        >
          <Text style={styles.progressHeading}>Good Progress</Text>
          <Text style={styles.progressSubtext}>
            This is what self-trust looks like
          </Text>

          {/* Muted Finish Button */}
          <TouchableOpacity
            style={styles.finishButton}
            activeOpacity={0.85}
            onPress={onFinish}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>

          {/* Home Bar Indicator */}
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#EDA0D6',
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
  topSection: {
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: -2,
  },
  titleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  screenTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
    letterSpacing: 0.2,
  },
  screenSubtitle: {
    fontSize: 13.5,
    color: 'rgba(255, 255, 255, 0.92)',
    textAlign: 'center',
    marginBottom: 14,
    fontWeight: '400',
  },
  timerTouch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerDigits: {
    fontSize: 54,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  bottomCardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 30,
  },
  rippleWrapper: {
    position: 'absolute',
    top: -RIPPLE_SIZE / 2,
    alignSelf: 'center',
    width: RIPPLE_SIZE,
    height: RIPPLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  rippleImage: {
    width: RIPPLE_SIZE,
    height: RIPPLE_SIZE,
  },
  sparkleBadge: {
    position: 'absolute',
    top: -29,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 40,
    shadowColor: '#452D68',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  sparkleTop: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '700',
    lineHeight: 14,
  },
  sparkleBottom: {
    fontSize: 11,
    color: '#7C3AED',
    fontWeight: '700',
    lineHeight: 12,
    marginTop: -2,
  },
  bottomCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 42,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    paddingHorizontal: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 30,
  },
  progressHeading: {
    fontSize: 19,
    fontWeight: '700',
    color: '#7C3AED',
    textAlign: 'center',
    marginBottom: 5,
  },
  progressSubtext: {
    fontSize: 13,
    color: '#7E7893',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '400',
  },
  finishButton: {
    width: '100%',
    backgroundColor: '#F6F5F8',
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  finishButtonText: {
    color: '#9E98AB',
    fontSize: 14,
    fontWeight: '600',
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
