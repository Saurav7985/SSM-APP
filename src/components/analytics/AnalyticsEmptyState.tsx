import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

export default function AnalyticsEmptyState() {
  return (
    <View style={styles.container}>
      <Feather name="bar-chart-2" size={48} color={COLORS.gray} style={styles.icon} />
      <Text style={styles.title}>No analytics data available.</Text>
      <Text style={styles.subtitle}>Check back later after your posts have reached an audience.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 64,
  },
  icon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
