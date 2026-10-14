import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface PlatformSelectorProps {
  activePlatform: string;
  onSelect: (id: string) => void;
}

export default function PlatformSelector({ activePlatform, onSelect }: PlatformSelectorProps) {
  const renderPlatformSelector = ({ item }: { item: typeof PLATFORMS_DATA[0] }) => {
    const isActive = activePlatform === item.id;
    return (
      <Pressable 
        style={[styles.platformChip, isActive && styles.platformChipActive]} 
        onPress={() => onSelect(item.id)}
      >
        <Feather name={item.icon as any} size={16} color={isActive ? COLORS.white : COLORS.gray} />
        <Text style={[styles.platformChipText, isActive && styles.platformChipTextActive]}>{item.name}</Text>
        {item.unreadCount !== undefined && item.unreadCount > 0 && (
          <View style={[styles.badge, isActive && { backgroundColor: COLORS.white }]}>
            <Text style={[styles.badgeText, isActive && { color: COLORS.orange }]}>{item.unreadCount}</Text>
          </View>
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.selectorContainer}>
      <FlatList
        data={PLATFORMS_DATA}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderPlatformSelector}
        contentContainerStyle={styles.selectorContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});
