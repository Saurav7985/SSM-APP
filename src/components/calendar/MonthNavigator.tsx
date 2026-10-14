import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface MonthNavigatorProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

export default function MonthNavigator({ currentDate, onPrevMonth, onNextMonth, onToday }: MonthNavigatorProps) {
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <View style={styles.container}>
      <Pressable style={styles.navButton} onPress={onPrevMonth}>
        <Feather name="chevron-left" size={24} color={COLORS.white} />
      </Pressable>
      
      <Text style={styles.monthText}>{monthName} {year}</Text>
      
      <Pressable style={styles.navButton} onPress={onNextMonth}>
        <Feather name="chevron-right" size={24} color={COLORS.white} />
      </Pressable>
      
      <Pressable style={styles.todayButton} onPress={onToday}>
        <Text style={styles.todayText}>Today</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  navButton: {
    padding: 8,
  },
  monthText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    minWidth: 120,
    textAlign: 'center',
  },
  todayButton: {
    position: 'absolute',
    right: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
  },
  todayText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
