import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../../constants/colors';

interface BrandInformationProps {
  brandName: string;
  brandVoice: string;
  onChange: (field: string, value: string) => void;
}

export default function BrandInformation({ brandName, brandVoice, onChange }: BrandInformationProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Brand Information</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Brand Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. binj.AI"
          placeholderTextColor={COLORS.gray}
          value={brandName}
          onChangeText={(val) => onChange('brandName', val)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Brand Voice & Tone</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g. Professional, innovative, and creative"
          placeholderTextColor={COLORS.gray}
          multiline
          textAlignVertical="top"
          value={brandVoice}
          onChangeText={(val) => onChange('brandVoice', val)}
        />
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    color: COLORS.white,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    paddingVertical: 12,
  },
});
