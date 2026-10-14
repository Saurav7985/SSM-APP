import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants/colors';

const FILTERS = ['All', 'Connected', 'Not Connected'];

interface ConnectionsFilterProps {
  activeFilter: string;
  onSelect: (filter: string) => void;
}

export default function ConnectionsFilter({ activeFilter, onSelect }: ConnectionsFilterProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {FILTERS.map((filter) => (
        <Pressable
          key={filter}
          style={[
            styles.chip,
            activeFilter === filter && styles.chipActive
          ]}
          onPress={() => onSelect(filter)}
        >
          <Text style={[
            styles.chipText,
            activeFilter === filter && styles.chipTextActive
          ]}>
            {filter}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    marginBottom: 8,
  },
  content: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
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
  chipText: {
    color: COLORS.gray,
    fontSize: 13,
    fontWeight: '500',
  },
  chipTextActive: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
