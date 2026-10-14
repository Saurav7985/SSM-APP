import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { CalendarEvent } from '../../types/calendar';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface SelectedDayEventsProps {
  dateStr: string;
  events: CalendarEvent[];
}

export default function SelectedDayEvents({ dateStr, events }: SelectedDayEventsProps) {
  // Parse date for display
  const dateObj = new Date(dateStr);
  const displayDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'published': return '#10B981';
      case 'scheduled': return '#3B82F6';
      case 'draft': return COLORS.orange;
      default: return COLORS.gray;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.dateText}>{displayDate}</Text>
        <Text style={styles.countText}>
          {events.length} {events.length === 1 ? 'post' : 'posts'}
        </Text>
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {events.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No events scheduled for this day.</Text>
          </View>
        ) : (
          events.map(evt => {
            const platform = PLATFORMS_DATA.find(p => p.id === evt.platformId);
            return (
              <View key={evt.id} style={styles.eventCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.platformRow}>
                    <View style={[styles.platformDot, { backgroundColor: platform?.accentColor || '#888' }]} />
                    <Text style={styles.platformName}>{platform?.name || 'Unknown'}</Text>
                  </View>
                  <View style={styles.statusBadge}>
                    <Text style={[styles.statusText, { color: getStatusColor(evt.status) }]}>
                      {evt.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <Text style={styles.eventTitle}>{evt.title}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.timeText}>{evt.time || 'All Day'}</Text>
                  <Text style={styles.typeText}>{evt.contentType?.toUpperCase()}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  dateText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  countText: {
    color: COLORS.orange,
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  eventCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  platformRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  platformName: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    backgroundColor: '#111',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  eventTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    color: COLORS.gray,
    fontSize: 12,
  },
  typeText: {
    color: '#888',
    fontSize: 10,
    fontWeight: '600',
  },
});
