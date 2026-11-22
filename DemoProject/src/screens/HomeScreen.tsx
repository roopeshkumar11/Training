import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const HomeScreen: React.FC<{
  onNavigateToTimer?: () => void;
  onNavigateToShop?: () => void;
  onNavigateToBreathing?: () => void;
  onNavigateToAudio?: () => void;
}> = ({
  onNavigateToTimer,
  onNavigateToShop,
  onNavigateToBreathing,
  onNavigateToAudio,
}) => {
  const insets = useSafeAreaInsets();
  const [selectedMood, setSelectedMood] = useState<string>('Okay');
  const [stressLevel, setStressLevel] = useState<number>(7);
  const [activeTab, setActiveTab] = useState<'home' | 'course' | 'shop' | 'community' | 'profile'>('home');

  const topPadding = (Platform.OS === 'android' ? (StatusBar.currentHeight || 24) : (insets.top || 20)) + 6;

  const moods = [
    {
      id: 'terrible',
      label: 'Terrible',
      iconName: 'emoticon-dead-outline',
    },
    {
      id: 'bad',
      label: 'Bad',
      iconName: 'emoticon-sad-outline',
    },
    {
      id: 'okay',
      label: 'Okay',
      iconName: 'emoticon-neutral-outline',
    },
    {
      id: 'good',
      label: 'Good',
      iconName: 'emoticon-happy-outline',
    },
    {
      id: 'great',
      label: 'Great',
      iconName: 'emoticon-excited-outline',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.rootContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Lavender Header Container (Wraps User Info & Mood Card) */}
          <View style={[styles.headerContainer, { paddingTop: topPadding }]}>
            {/* Background Geometric Tint Tile */}
            <View style={styles.headerTintTile} />

            {/* Top User Info Row */}
            <View style={styles.userInfoRow}>
              <View style={styles.userInfoLeft}>
                <View style={styles.avatarWrap}>
                  <Image
                    source={require('../../assets/doctor_avatar.png')}
                    style={styles.avatarImg}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.userTextCol}>
                  <Text style={styles.welcomeSubtitle}>Welcome Back</Text>
                  <Text style={styles.userName}>Dr. Arshia!</Text>
                </View>
              </View>

              {/* Streak Pill */}
              <View style={styles.streakPill}>
                <Ionicons name="flame" size={16} color="#FFA502" />
                <Text style={styles.streakNumber}>5</Text>
              </View>
            </View>

            {/* Floating Mood Card (Inside Lavender Wrapper) */}
            <View style={styles.moodCard}>
              <Text style={styles.moodCardTitle}>How are you feeling today?</Text>

              <View style={styles.moodsRow}>
                {moods.map((m) => {
                  const isSelected = selectedMood === m.label;
                  return (
                    <TouchableOpacity
                      key={m.id}
                      style={styles.moodItem}
                      activeOpacity={0.7}
                      onPress={() => setSelectedMood(m.label)}
                    >
                      <View
                        style={[
                          styles.moodCircle,
                          isSelected && styles.moodCircleSelected,
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={m.iconName}
                          size={24}
                          color={isSelected ? '#A259FF' : '#7E7893'}
                        />
                      </View>
                      <Text
                        style={[
                          styles.moodLabel,
                          isSelected && styles.moodLabelSelected,
                        ]}
                      >
                        {m.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* Section: Energy, Sleep and stress level */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Energy, Sleep and stress level</Text>
            <Text style={styles.sectionSubtitle}>Check your levels</Text>
          </View>

          {/* Energy & Sleep Two Cards Row */}
          <View style={styles.twoCardsRow}>
            {/* Energy Card */}
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.8}
              onPress={onNavigateToTimer}
            >
              <View style={styles.cardLeft}>
                <View style={styles.greenIconCircle}>
                  <Ionicons name="flash" size={18} color="#27AE60" />
                </View>
                <Text style={styles.cardName}>Energy</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#342948" />
            </TouchableOpacity>

            {/* Sleep Card */}
            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.8}
              onPress={onNavigateToAudio}
            >
              <View style={styles.cardLeft}>
                <View style={styles.purpleIconCircle}>
                  <Ionicons name="moon" size={18} color="#9B51E0" />
                </View>
                <Text style={styles.cardName}>Sleep</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#342948" />
            </TouchableOpacity>
          </View>

          {/* Stress Level Card */}
          <View style={styles.stressCard}>
            <View style={styles.stressHeader}>
              <View style={styles.blueIconBox}>
                <MaterialCommunityIcons
                  name="head-snowflake-outline"
                  size={22}
                  color="#2D9CDB"
                />
              </View>
              <View style={styles.stressTextCol}>
                <Text style={styles.stressTitle}>Stress</Text>
                <Text style={styles.stressSubtitle}>Check your Stress Level</Text>
              </View>
            </View>

            {/* Slider Track */}
            <View style={styles.sliderContainer}>
              <View style={styles.trackLine}>
                <View
                  style={[
                    styles.trackFilled,
                    { width: `${(stressLevel / 10) * 100}%` },
                  ]}
                />
                <View
                  style={[
                    styles.thumbKnob,
                    { left: `${(stressLevel / 10) * 100}%` },
                  ]}
                />
              </View>

              {/* Slider Numeric Scale Row */}
              <View style={styles.scaleRow}>
                <TouchableOpacity onPress={() => setStressLevel(0)}>
                  <Text style={styles.scaleLabel}>0</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.currentValLabel,
                    { left: `${(stressLevel / 10) * 90}%` },
                  ]}
                >
                  <Text style={styles.scaleActiveNum}>{stressLevel}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setStressLevel(10)}>
                  <Text style={styles.scaleLabel}>10</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            activeOpacity={0.85}
            onPress={onNavigateToTimer}
          >
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Custom Bottom Wave Navigation Bar */}
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomNavWaveOverlay}>
            {/* Left Elevated Home Button with Arch */}
            <TouchableOpacity
              style={styles.elevatedHomeBtn}
              activeOpacity={0.85}
              onPress={() => setActiveTab('home')}
            >
              <View style={styles.elevatedHomeCircle}>
                <Ionicons name="home" size={22} color="#FFFFFF" />
              </View>
              <Text style={styles.homeActiveLabel}>Home</Text>
            </TouchableOpacity>

            {/* Course */}
            <TouchableOpacity
              style={styles.navTab}
              activeOpacity={0.7}
              onPress={() => {
                setActiveTab('course');
                onNavigateToBreathing?.();
              }}
            >
              <Ionicons
                name={activeTab === 'course' ? 'school' : 'school-outline'}
                size={22}
                color={activeTab === 'course' ? '#7C3AED' : '#7E7893'}
              />
              <Text style={styles.navLabel}>Course</Text>
            </TouchableOpacity>

            {/* Shop */}
            <TouchableOpacity
              style={styles.navTab}
              activeOpacity={0.7}
              onPress={() => {
                setActiveTab('shop');
                onNavigateToShop?.();
              }}
            >
              <Feather
                name="shopping-bag"
                size={20}
                color={activeTab === 'shop' ? '#7C3AED' : '#7E7893'}
              />
              <Text style={styles.navLabel}>Shop</Text>
            </TouchableOpacity>

            {/* Community */}
            <TouchableOpacity
              style={styles.navTab}
              activeOpacity={0.7}
              onPress={() => {
                setActiveTab('community');
                onNavigateToAudio?.();
              }}
            >
              <Ionicons
                name={activeTab === 'community' ? 'people' : 'people-outline'}
                size={22}
                color={activeTab === 'community' ? '#7C3AED' : '#7E7893'}
              />
              <Text style={styles.navLabel}>Community</Text>
            </TouchableOpacity>

            {/* Profile */}
            <TouchableOpacity
              style={styles.navTab}
              activeOpacity={0.7}
              onPress={() => setActiveTab('profile')}
            >
              <Feather
                name="user"
                size={20}
                color={activeTab === 'profile' ? '#7C3AED' : '#7E7893'}
              />
              <Text style={styles.navLabel}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E5CDFD',
  },
  rootContainer: {
    flex: 1,
    backgroundColor: '#FAFAFD',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    backgroundColor: '#E5CDFD',
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  headerTintTile: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: 140,
    height: 100,
    backgroundColor: '#DEC4FA',
    opacity: 0.5,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  userInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#4A3468',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  userTextCol: {
    justifyContent: 'center',
  },
  welcomeSubtitle: {
    fontSize: 12.5,
    color: '#6F6A85',
    fontWeight: '400',
    marginBottom: 2,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1638',
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  streakNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8447C7',
  },
  moodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 14,
    shadowColor: '#533C7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginTop: 6,
  },
  moodCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1638',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  moodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodItem: {
    alignItems: 'center',
    flex: 1,
  },
  moodCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F7F5FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    borderWidth: 1.5,
    borderColor: '#EFEBF5',
  },
  moodCircleSelected: {
    borderColor: '#A259FF',
    backgroundColor: '#F3E8FF',
    shadowColor: '#A259FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  moodLabel: {
    fontSize: 11.5,
    color: '#7E7893',
    fontWeight: '500',
  },
  moodLabelSelected: {
    color: '#A259FF',
    fontWeight: '700',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1638',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: '#7E7893',
    fontWeight: '400',
  },
  twoCardsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 14,
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F0EAF8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  greenIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E8F8EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  purpleIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F5ECFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1638',
  },
  stressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F0EAF8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  stressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  blueIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EBF6FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stressTextCol: {
    justifyContent: 'center',
  },
  stressTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#1E1638',
    marginBottom: 2,
  },
  stressSubtitle: {
    fontSize: 12,
    color: '#7E7893',
  },
  sliderContainer: {
    paddingHorizontal: 4,
    paddingTop: 8,
  },
  trackLine: {
    width: '100%',
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#F0EAF8',
    position: 'relative',
    justifyContent: 'center',
  },
  trackFilled: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#A259FF',
  },
  thumbKnob: {
    position: 'absolute',
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#A259FF',
    marginLeft: -7,
    shadowColor: '#A259FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  scaleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    position: 'relative',
  },
  scaleLabel: {
    fontSize: 12,
    color: '#7E7893',
    fontWeight: '500',
  },
  currentValLabel: {
    position: 'absolute',
  },
  scaleActiveNum: {
    fontSize: 13,
    color: '#1E1638',
    fontWeight: '700',
  },
  submitBtn: {
    backgroundColor: '#F4EFFB',
    marginHorizontal: 20,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  submitBtnText: {
    color: '#6F6A85',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNavContainer: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F2EDF8',
    paddingBottom: Platform.OS === 'ios' ? 14 : 8,
  },
  bottomNavWaveOverlay: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 64,
    paddingHorizontal: 8,
  },
  elevatedHomeBtn: {
    alignItems: 'center',
    marginTop: -22,
    width: 58,
  },
  elevatedHomeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6A2BE2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 4,
  },
  homeActiveLabel: {
    fontSize: 11,
    color: '#6A2BE2',
    fontWeight: '700',
  },
  navTab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 6,
  },
  navLabel: {
    fontSize: 11,
    color: '#7E7893',
    fontWeight: '500',
  },
});
