import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get('window');

// Exact sampled colors from the Figma design
const BG_COLOR = '#16104E'; // Deep midnight royal indigo
const PRIMARY_PURPLE = '#8447C7'; // Vibrant purple
const SUBTITLE_COLOR = '#C5BFEC'; // Soft lavender tint

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  onLogin?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onGetStarted,
  onLogin,
}) => {
  const insets = useSafeAreaInsets();
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const bottomInset = Math.max(insets.bottom, 16);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Video Section - Extends down ~52% of screen */}
      <View style={styles.videoWrapper}>
        <Video
          source={require('../../assets/0_Abstract_Liquid_Metal_1280x720.mp4')}
          style={styles.backgroundVideo}
          resizeMode="cover"
          repeat={true}
          muted={true}
          paused={false}
        />

        {/* Multi-layered smooth gradient fade into BG_COLOR */}
        <View style={styles.fadeLayer1} />
        <View style={styles.fadeLayer2} />
        <View style={styles.fadeLayer3} />
        <View style={styles.fadeLayer4} />
      </View>

      {/* SafeArea-aware Scrollable Bottom Content Area */}
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          {
            paddingBottom: bottomInset + 12,
            paddingTop: insets.top > 0 ? insets.top + 16 : 16,
          },
        ]}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Block */}
        <View style={styles.headingBlock}>
          <Text style={styles.titleText}>
            Welcome to <Text style={styles.titleBrand}>Nuvani</Text>
          </Text>
          <Text style={styles.subtitleText}>
            Monitor your mood, emotions, and progress{'\n'}with simple daily check-ins.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={onGetStarted}
          >
            <Text style={styles.primaryButtonText}>Create New Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.8}
            onPress={onLogin}
          >
            <Text style={styles.secondaryButtonText}>I'm already a Member</Text>
          </TouchableOpacity>
        </View>

        {/* Terms Checkbox Row */}
        <TouchableOpacity
          style={styles.checkboxRow}
          activeOpacity={0.8}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        >
          <View
            style={[
              styles.checkboxBox,
              agreedToTerms && styles.checkboxBoxChecked,
            ]}
          >
            {agreedToTerms && <Text style={styles.checkMark}>✓</Text>}
          </View>
          <Text style={styles.termsLabel}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms & Privacy Policy</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    justifyContent: 'space-between',
  },
  videoWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.52,
    overflow: 'hidden',
    backgroundColor: '#0F093C',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  fadeLayer1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
    backgroundColor: BG_COLOR,
    opacity: 0.35,
  },
  fadeLayer2: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 105,
    backgroundColor: BG_COLOR,
    opacity: 0.65,
  },
  fadeLayer3: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 55,
    backgroundColor: BG_COLOR,
    opacity: 0.90,
  },
  fadeLayer4: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 20,
    backgroundColor: BG_COLOR,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 22,
  },
  headingBlock: {
    marginBottom: 22,
  },
  titleText: {
    fontSize: 29,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: -0.2,
    marginBottom: 8,
  },
  titleBrand: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subtitleText: {
    fontSize: 14,
    lineHeight: 21,
    color: SUBTITLE_COLOR,
    fontWeight: '400',
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 18,
  },
  primaryButton: {
    backgroundColor: PRIMARY_PURPLE,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: PRIMARY_PURPLE,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 2,
    marginBottom: 6,
  },
  checkboxBox: {
    width: 17,
    height: 17,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  checkboxBoxChecked: {
    backgroundColor: PRIMARY_PURPLE,
    borderColor: PRIMARY_PURPLE,
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    marginTop: -1,
  },
  termsLabel: {
    fontSize: 11.5,
    color: SUBTITLE_COLOR,
    flex: 1,
  },
  termsLink: {
    color: '#FFFFFF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
