import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function AIStudioHeader() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <LinearGradient
          colors={['rgba(139,92,246,0.2)', 'rgba(236,72,153,0.2)']}
          style={styles.gradientBg}
        />
        <Feather name="star" size={24} color={COLORS.orange} />
      </View>
      <Text style={styles.title}>AI Content Studio</Text>
      <Text style={styles.subtitle}>Let our AI agents create stunning social media content for your brand</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,100,34,0.3)',
  },
  gradientBg: {
    ...StyleSheet.absoluteFill,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },
});
