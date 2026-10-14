import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface PlatformFilterProps {
  activePlatformId: string;
  onSelect: (platformId: string) => void;
}

export default function PlatformFilter({ activePlatformId, onSelect }: PlatformFilterProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Pressable
        style={[
          styles.chip,
          activePlatformId === 'all' && styles.chipActive
        ]}
        onPress={() => onSelect('all')}
      >
        <Feather 
          name="layers" 
          size={14} 
          color={activePlatformId === 'all' ? COLORS.white : COLORS.gray} 
        />
        <Text style={[
          styles.chipText,
          activePlatformId === 'all' && styles.chipTextActive
        ]}>
          All Platforms
        </Text>
      </Pressable>

      {PLATFORMS_DATA.map((platform) => (
        <Pressable
          key={platform.id}
          style={[
            styles.chip,
            activePlatformId === platform.id && styles.chipActive,
            activePlatformId === platform.id && { borderColor: platform.accentColor }
          ]}
          onPress={() => onSelect(platform.id)}
        >
          {activePlatformId === platform.id && (
            <View style={[styles.dot, { backgroundColor: platform.accentColor }]} />
          )}
          <Text style={[
            styles.chipText,
            activePlatformId === platform.id && styles.chipTextActive
          ]}>
            {platform.name}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#111',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  chipText: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 6,
  },
  chipTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
