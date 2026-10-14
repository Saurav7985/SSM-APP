import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants/colors';
import { CalendarEvent } from '../../types/calendar';
import EventIndicator from './EventIndicator';

interface CalendarDayProps {
  dateObj: Date;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
  events: CalendarEvent[];
  onSelect: (dateStr: string) => void;
}

export default function CalendarDay({ 
  dateObj, 
  isCurrentMonth, 
  isSelected, 
  isToday, 
  events, 
  onSelect 
}: CalendarDayProps) {
  
  const dateStr = dateObj.toISOString().split('T')[0];
  const dayNum = dateObj.getDate();

  // If we only want to show the current month, we can render an empty view or faded text
  // The prompt said "recalculate calendar dates", usually mobile calendars show faded days for previous/next months.
  
  return (
    <Pressable 
      style={styles.container} 
      onPress={() => onSelect(dateStr)}
    >
      <View style={[
        styles.dayCircle,
        isSelected && styles.dayCircleSelected,
        !isSelected && isToday && styles.dayCircleToday
      ]}>
        <Text style={[
          styles.dayText,
          !isCurrentMonth && styles.dayTextFaded,
          isSelected && styles.dayTextSelected,
          !isSelected && isToday && styles.dayTextToday
        ]}>
          {dayNum}
        </Text>
      </View>
      
      <EventIndicator events={events} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 52, // Fixed height keeps the grid perfectly stable
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleSelected: {
    backgroundColor: COLORS.orange,
  },
  dayCircleToday: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dayText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '400',
  },
  dayTextFaded: {
    color: '#444',
  },
  dayTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  dayTextToday: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
