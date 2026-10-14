import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants/colors';

const TIME_RANGES = [
  { label: '7 Days', value: 7 },
  { label: '30 Days', value: 30 },
  { label: '90 Days', value: 90 },
  { label: '6 Months', value: 180 },
  { label: '1 Year', value: 365 },
];

interface TimeRangeSelectorProps {
  activeRange: number;
  onSelect: (days: number) => void;
}

export default function TimeRangeSelector({ activeRange, onSelect }: TimeRangeSelectorProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {TIME_RANGES.map((range) => (
        <Pressable
          key={range.value}
          style={[
            styles.chip,
            activeRange === range.value && styles.chipActive
          ]}
          onPress={() => onSelect(range.value)}
        >
          <Text style={[
            styles.chipText,
            activeRange === range.value && styles.chipTextActive
          ]}>
            {range.label}
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
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
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
