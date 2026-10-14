import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Feather.glyphMap;
  backgroundColor: string;
  onPress: () => void;
}

export default function QuickActionCard({ title, subtitle, icon, backgroundColor, onPress }: QuickActionCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        { backgroundColor },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          <Feather name={icon} size={24} color={COLORS.white} />
        </View>
        <View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
      </View>
      <Feather name="chevron-right" size={24} color={COLORS.white} opacity={0.7} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '100%',
    minWidth: 280,
  },
  pressed: {
    opacity: 0.85,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  titleText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitleText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
});
