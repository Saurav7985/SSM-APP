import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface BrandFontsProps {
  primary: string;
  secondary: string;
  onChangeFont: (type: 'primary' | 'secondary', font: string) => void;
}

export default function BrandFonts({ primary, secondary, onChangeFont }: BrandFontsProps) {
  // Mock font selector - in a real app this would open a modal with a list of fonts
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Brand Fonts</Text>
      
      <View style={styles.container}>
        <View style={styles.fontBlock}>
          <Text style={styles.label}>Primary Font (Headings)</Text>
          <Pressable style={styles.selector}>
            <Text style={styles.selectorText}>{primary}</Text>
            <Feather name="chevron-down" size={16} color={COLORS.gray} />
          </Pressable>
          <View style={styles.previewBox}>
            <Text style={[styles.previewTextHeading, { fontFamily: 'System' }]}>Aa Bb Cc</Text>
          </View>
        </View>

        <View style={styles.fontBlock}>
          <Text style={styles.label}>Secondary Font (Body)</Text>
          <Pressable style={styles.selector}>
            <Text style={styles.selectorText}>{secondary}</Text>
            <Feather name="chevron-down" size={16} color={COLORS.gray} />
          </Pressable>
          <View style={styles.previewBox}>
            <Text style={[styles.previewTextBody, { fontFamily: 'System' }]}>
              The quick brown fox jumps over the lazy dog
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  container: {
    gap: 24,
  },
  fontBlock: {
    gap: 8,
  },
  label: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  selectorText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  previewBox: {
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#222',
  },
  previewTextHeading: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  previewTextBody: {
    color: COLORS.gray,
    fontSize: 14,
    lineHeight: 20,
  }
});
