import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface DesignPreviewProps {
  primaryColor: string;
  secondaryColor: string;
}

export default function DesignPreview({ primaryColor, secondaryColor }: DesignPreviewProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Design Preview</Text>
      <View style={styles.previewCard}>
        
        <View style={styles.colorBadge}>
          <View style={[styles.circle, { backgroundColor: primaryColor || '#333' }]} />
          <Text style={styles.hexText}>{primaryColor || 'Not Set'}</Text>
        </View>

        <View style={styles.colorBadge}>
          <View style={[styles.circle, { backgroundColor: secondaryColor || '#333' }]} />
          <Text style={styles.hexText}>{secondaryColor || 'Not Set'}</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  previewCard: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  colorBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  hexText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
});
