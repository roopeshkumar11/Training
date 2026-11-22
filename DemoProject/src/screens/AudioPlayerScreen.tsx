import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface AudioPlayerScreenProps {
  onBack?: () => void;
  onClose?: () => void;
}

// 10-step smooth pure CSS gradient slice interpolation
// Matches: linear-gradient(180deg, rgba(147, 83, 210, 0) 0%, #9353D2 52.4%, #9353D2 100%)
const GRADIENT_STOPS = [
  'rgba(147, 83, 210, 0.00)',
  'rgba(147, 83, 210, 0.08)',
  'rgba(147, 83, 210, 0.18)',
  'rgba(147, 83, 210, 0.30)',
  'rgba(147, 83, 210, 0.45)',
  'rgba(147, 83, 210, 0.60)',
  'rgba(147, 83, 210, 0.75)',
  'rgba(147, 83, 210, 0.88)',
  'rgba(147, 83, 210, 0.96)',
  '#9353D2',
];

export const AudioPlayerScreen: React.FC<AudioPlayerScreenProps> = ({
  onBack,
  onClose,
}) => {
  const insets = useSafeAreaInsets();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Exact symmetrical audio waveform bars matching Figma
  const waveBars = [
    6, 10, 16, 12, 18, 26, 20, 32, 28, 42, 34, 48, 38, 56, 44, 52, 36, 46, 30,
    38, 24, 30, 20, 28, 36, 48, 56, 42, 50, 34, 40, 26, 34, 22, 16, 20, 12, 8, 6,
  ];

  const topPadding =
    (Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : (insets.top || 20)) + 8;

  return (
    <View style={styles.rootContainer}>
      <StatusBar barStyle="light-content" />

      {/* 1. Dusk Twilight Base Color Layer at Top */}
      <View style={styles.topDuskBase} />

      {/* 2. Linear Gradient Overlay: rgba(147, 83, 210, 0) to #9353D2 at 52.4% */}
      <View style={styles.gradientContainer} pointerEvents="none">
        {GRADIENT_STOPS.map((color, idx) => (
          <View
            key={idx}
            style={[
              styles.gradientSlice,
              {
                backgroundColor: color,
              },
            ]}
          />
        ))}
      </View>

      {/* 3. Solid #9353D2 Base for Lower Half (52.4% to 100%) */}
      <View style={styles.bottomSolidBase} pointerEvents="none" />

      {/* Main Content */}
      <View style={[styles.contentContainer, { paddingTop: topPadding }]}>
        {/* TOP HEADER: Frosted Back Button & Close Button */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.frostedCircleBtn}
            onPress={onBack}
            activeOpacity={0.75}
          >
            <Text style={styles.headerIconText}>←</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.frostedCircleBtn}
            onPress={onClose}
            activeOpacity={0.75}
          >
            <Text style={styles.headerIconText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* MIDDLE SECTION: Mood Pill + Calligraphic Title */}
        <View style={styles.middleSection}>
          {/* Calm Pill Badge */}
          <View style={styles.calmBadge}>
            <Text style={styles.lotusIcon}>🪷</Text>
            <Text style={styles.calmText}>Calm</Text>
          </View>

          {/* Stylized Title Matching Figma Typography */}
          <View style={styles.titleWrapper}>
            <View style={styles.titleLine}>
              <Text style={styles.scriptInitial}>D</Text>
              <Text style={styles.titleRegular}>eep breathing</Text>
            </View>
            <View style={styles.titleLine}>
              <Text style={styles.titleRegular}>for </Text>
              <Text style={styles.scriptInitial}>R</Text>
              <Text style={styles.titleRegular}>elaxation</Text>
            </View>
          </View>
        </View>

        {/* BOTTOM SECTION: Audio Waveform & Player Controls */}
        <View style={styles.bottomSection}>
          {/* Audio Waveform */}
          <View style={styles.waveformContainer}>
            {waveBars.map((h, i) => (
              <View
                key={i}
                style={[
                  styles.waveformBar,
                  {
                    height: h,
                  },
                ]}
              />
            ))}
          </View>

          {/* Controls: Rewind 10s, Play/Pause, Forward 10s */}
          <View style={styles.controlsRow}>
            {/* Rewind 10 */}
            <TouchableOpacity
              style={styles.skipBtn}
              activeOpacity={0.75}
            >
              <Text style={styles.skipIcon}>↺</Text>
              <Text style={styles.skipSecs}>10</Text>
            </TouchableOpacity>

            {/* Play / Pause Large White Button */}
            <TouchableOpacity
              style={styles.playPauseBtn}
              activeOpacity={0.85}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <View style={styles.pauseBars}>
                  <View style={styles.pauseBar} />
                  <View style={styles.pauseBar} />
                </View>
              ) : (
                <Text style={styles.playArrow}>▶</Text>
              )}
            </TouchableOpacity>

            {/* Forward 10 */}
            <TouchableOpacity
              style={styles.skipBtn}
              activeOpacity={0.75}
            >
              <Text style={styles.skipIcon}>↻</Text>
              <Text style={styles.skipSecs}>10</Text>
            </TouchableOpacity>
          </View>

          {/* Home Indicator */}
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
    backgroundColor: '#9353D2', // Exact Figma Theme Color
  },
  topDuskBase: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '52.4%',
    backgroundColor: '#351C47', // Atmospheric twilight dusk tone
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '52.4%',
    flexDirection: 'column',
  },
  gradientSlice: {
    flex: 1,
    width: '100%',
  },
  bottomSolidBase: {
    position: 'absolute',
    top: '52.4%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#9353D2', // 52.4% to 100% solid #9353D2
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 14 : 22,
    zIndex: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  frostedCircleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: -2,
  },
  middleSection: {
    paddingHorizontal: 6,
    marginTop: -20,
  },
  calmBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.32)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  lotusIcon: {
    fontSize: 13,
    marginRight: 6,
  },
  calmText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  titleWrapper: {
    marginTop: 4,
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scriptInitial: {
    fontSize: 48,
    fontStyle: 'italic',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'serif',
    lineHeight: 56,
    marginRight: 2,
  },
  titleRegular: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 46,
  },
  bottomSection: {
    alignItems: 'center',
    paddingBottom: 4,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
    width: '100%',
    marginBottom: 28,
  },
  waveformBar: {
    width: 3.5,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 2.2,
    opacity: 0.92,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
  },
  skipBtn: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 28,
  },
  skipIcon: {
    fontSize: 26,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  skipSecs: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: -6,
  },
  playPauseBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#301050',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  pauseBars: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseBar: {
    width: 4.5,
    height: 20,
    borderRadius: 2.5,
    backgroundColor: '#9353D2',
    marginHorizontal: 3,
  },
  playArrow: {
    fontSize: 24,
    color: '#9353D2',
    marginLeft: 3,
  },
  homeIndicatorWrapper: {
    alignItems: 'center',
    paddingTop: 6,
  },
  homeIndicator: {
    width: 134,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
});
