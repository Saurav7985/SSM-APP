import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface AnalyticsHeaderProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

export default function AnalyticsHeader({ onRefresh, isRefreshing }: AnalyticsHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Feather name="bar-chart-2" size={24} color={COLORS.orange} style={{ marginRight: 12 }} />
        <View>
          <Text style={styles.headerTitle}>Performance Analytics</Text>
          <Text style={styles.headerSubtitle}>
            Track reach, engagement, and impressions across all linked channels
          </Text>
        </View>
      </View>
      <Pressable 
        hitSlop={10} 
        style={[styles.refreshBtn, isRefreshing && styles.refreshing]} 
        onPress={onRefresh}
        disabled={isRefreshing}
      >
        <Feather name="refresh-cw" size={20} color={COLORS.gray} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: COLORS.background,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 16,
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
    flexWrap: 'wrap',
  },
  refreshBtn: {
    padding: 8,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  refreshing: {
    opacity: 0.5,
  },
});
