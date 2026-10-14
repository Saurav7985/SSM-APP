import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
}

export default function MetricCard({ title, value, change }: MetricCardProps) {
  const isPositive = change >= 0;
  const changeColor = isPositive ? '#10B981' : '#EF4444';
  const changeIcon = isPositive ? 'trending-up' : 'trending-down';
  
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.changeRow}>
        <Feather name={changeIcon} size={14} color={changeColor} />
        <Text style={[styles.changeText, { color: changeColor }]}>
          {isPositive ? '+' : ''}{change}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: '45%',
    borderWidth: 1,
    borderColor: '#222',
  },
  title: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  value: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
});
