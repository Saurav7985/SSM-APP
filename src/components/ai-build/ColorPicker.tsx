import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../constants/colors';

interface ColorPickerProps {
  primaryColor: string;
  secondaryColor: string;
  onChange: (field: string, value: string) => void;
}

export default function ColorPicker({ primaryColor, secondaryColor, onChange }: ColorPickerProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.label}>Brand Colors</Text>
      <View style={styles.row}>
        
        <View style={styles.colorInputContainer}>
          <Text style={styles.subLabel}>Primary Color</Text>
          <View style={styles.inputWrapper}>
            <View style={[styles.colorPreview, { backgroundColor: primaryColor || '#333' }]} />
            <TextInput
              style={styles.input}
              placeholder="#8B5CF6"
              placeholderTextColor={COLORS.gray}
              value={primaryColor}
              onChangeText={(val) => onChange('primaryColor', val)}
              maxLength={7}
            />
          </View>
        </View>

        <View style={styles.colorInputContainer}>
          <Text style={styles.subLabel}>Secondary Color</Text>
          <View style={styles.inputWrapper}>
            <View style={[styles.colorPreview, { backgroundColor: secondaryColor || '#333' }]} />
            <TextInput
              style={styles.input}
              placeholder="#EC4899"
              placeholderTextColor={COLORS.gray}
              value={secondaryColor}
              onChangeText={(val) => onChange('secondaryColor', val)}
              maxLength={7}
            />
          </View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  subLabel: {
    color: COLORS.gray,
    fontSize: 12,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  colorInputContainer: {
    flex: 1,
    minWidth: 140,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 48,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
  },
});
