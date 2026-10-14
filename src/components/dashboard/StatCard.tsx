import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface StatCardProps {
  value: string;
  label: string;
  icon: keyof typeof Feather.glyphMap;
}

export default function StatCard({ value, label, icon }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Feather name={icon} size={20} color={COLORS.orange} />
      </View>
      <Text style={styles.valueText}>{value}</Text>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '45%',
    minWidth: 140,
    borderWidth: 1,
    borderColor: '#222',
  },
  iconContainer: {
    marginBottom: 12,
  },
  valueText: {
    color: COLORS.orange,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  labelText: {
    color: COLORS.white,
    fontSize: 12,
  },
});
