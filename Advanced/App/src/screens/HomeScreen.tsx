import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TOPICS } from '../topics';

export function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Top Banner */}
      <View style={styles.banner}>
        <Text style={styles.appTitle}>React Native Hub 🚀</Text>
        <Text style={styles.appSubtitle}>
          Practice all topics inside one project ({TOPICS.length} topics)
        </Text>
      </View>

      {/* Topics List */}
      <FlatList
        data={TOPICS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.topicCard}
            onPress={() => navigation.navigate(item.id)}
            activeOpacity={0.75}
          >
            <View style={styles.cardHeader}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.category}</Text>
              </View>
              <Text style={styles.topicNumber}>#{index + 1}</Text>
            </View>

            <Text style={styles.topicTitle}>{item.title}</Text>
            <Text style={styles.topicDesc}>{item.description}</Text>

            <View style={styles.cardFooter}>
              <Text style={styles.openText}>Open Topic →</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  banner: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  appTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  appSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  topicCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  topicNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  topicTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  topicDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 19,
  },
  cardFooter: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  openText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563eb',
  },
});
