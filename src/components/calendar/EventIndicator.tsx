import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CalendarEvent } from '../../types/calendar';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface EventIndicatorProps {
  events: CalendarEvent[];
}

export default function EventIndicator({ events }: EventIndicatorProps) {
  if (!events || events.length === 0) return <View style={styles.container} />;

  // Group events by platform to show distinct dots, or max 3 dots
  const displayEvents = events.slice(0, 3);
  const hasMore = events.length > 3;

  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        {displayEvents.map((evt, idx) => {
          const platform = PLATFORMS_DATA.find(p => p.id === evt.platformId);
          const color = platform?.accentColor || '#888';
          return (
            <View key={`${evt.id}-${idx}`} style={[styles.dot, { backgroundColor: color }]} />
          );
        })}
        {hasMore && <Text style={styles.plusText}>+</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 2,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  plusText: {
    color: '#888',
    fontSize: 8,
    fontWeight: 'bold',
    marginLeft: 1,
    lineHeight: 8,
  },
});
