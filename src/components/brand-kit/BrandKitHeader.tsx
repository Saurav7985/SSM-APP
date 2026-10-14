import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function BrandKitHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Brand Kit</Text>
      <Text style={styles.subtitle}>Your brand DNA for consistent AI content</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    backgroundColor: COLORS.background,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 4,
  },
});
