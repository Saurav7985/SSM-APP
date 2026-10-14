import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable,  Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { COLORS } from '../../../constants/colors';
import { PLATFORMS_DATA } from '../../../constants/platforms';
import PlatformSelector from '../../../components/messenger/PlatformSelector';

export default function InboxScreen() {
  const [activePlatform, setActivePlatform] = useState<string>('instagram');

  const renderInboxCard = ({ item }: { item: typeof PLATFORMS_DATA[0] }) => {
    return (
      <Pressable 
        style={styles.card} 
        onPress={() => router.push(`/(user)/inbox/${item.id}` as any)}
      >
        <View style={styles.cardTop}>
          <View style={styles.cardIconName}>
            <View style={[styles.cardIconContainer, { backgroundColor: item.accentColor + '20' }]}>
              <Feather name={item.icon as any} size={24} color={item.accentColor} />
            </View>
            <View>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={[styles.cardStatus, (item.activeConversations || 0) > 0 && { color: COLORS.white }]}>
                {(item.activeConversations || 0) > 0 
                  ? `${item.activeConversations} Active Conversation${(item.activeConversations || 0) > 1 ? 's' : ''}` 
                  : 'No active conversations'}
              </Text>
            </View>
          </View>
          <Feather name="chevron-right" size={24} color={COLORS.gray} />
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.cardBottom}>
          <Text style={styles.cardStats}>
            {item.dmCount} DMs • {item.commentCount} Comments
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Feather name="inbox" size={24} color={COLORS.orange} style={{ marginRight: 12 }} />
          <View>
            <Text style={styles.headerTitle}>AI Inbox & Messenger</Text>
            <Text style={styles.headerSubtitle}>Separate chatboxes for every platform.</Text>
          </View>
        </View>
        <Pressable hitSlop={10} style={styles.refreshBtn}>
          <Feather name="refresh-cw" size={20} color={COLORS.gray} />
        </Pressable>
      </View>

      {/* Platform Selector */}
      <PlatformSelector 
        activePlatform={activePlatform} 
        onSelect={setActivePlatform} 
      />

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={styles.sectionTitle}>Select a Platform Inbox</Text>
        
        <FlatList
          data={PLATFORMS_DATA}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderInboxCard}
          contentContainerStyle={styles.cardsContent}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 2,
  },
  refreshBtn: {
    padding: 8,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
  },
  selectorContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  selectorContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  platformChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  platformChipActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  platformChipText: {
    color: COLORS.gray,
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '500',
  },
  platformChipTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardsContent: {
    paddingBottom: 40,
    gap: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
    padding: 16,
    width: '100%',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIconName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardStatus: {
    color: COLORS.gray,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 12,
  },
  cardBottom: {
    flexDirection: 'row',
  },
  cardStats: {
    color: COLORS.gray,
    fontSize: 12,
  }
});
