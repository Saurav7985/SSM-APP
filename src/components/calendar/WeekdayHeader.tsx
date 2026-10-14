import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function WeekdayHeader() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <View key={index} style={styles.dayCell}>
          <Text style={[styles.dayText, (index === 0 || index === 6) && styles.weekendText]}>
            {day}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '600',
  },
  weekendText: {
    color: '#888',
  },
});
