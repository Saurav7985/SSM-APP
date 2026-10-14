import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { AIBuildConfig } from '../../types/ai-build';
import { PLATFORMS_DATA } from '../../constants/platforms';

interface ContentDetailsProps {
  config: AIBuildConfig['content'];
  onChange: (updates: Partial<AIBuildConfig['content']>) => void;
}

// Reusable Custom Dropdown
function CustomDropdown({ label, value, options, onSelect }: { label: string, value: string, options: string[], onSelect: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.dropdownHeader} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.dropdownValue}>{value || 'Select an option'}</Text>
        <Feather name={isOpen ? "chevron-up" : "chevron-down"} size={16} color={COLORS.gray} />
      </Pressable>
      
      {isOpen && (
        <View style={styles.dropdownList}>
          {options.map((opt) => (
            <Pressable 
              key={opt} 
              style={styles.dropdownItem} 
              onPress={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
            >
              <Text style={[styles.dropdownItemText, value === opt && styles.dropdownItemTextActive]}>{opt}</Text>
              {value === opt && <Feather name="check" size={14} color={COLORS.orange} />}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

export default function ContentDetails({ config, onChange }: ContentDetailsProps) {
  const platformOptions = PLATFORMS_DATA.map(p => p.name);
  const toneOptions = ['Professional', 'Friendly', 'Exciting', 'Educational', 'Inspirational', 'Casual', 'Persuasive'];

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Content Details</Text>

      <View style={styles.formGroup}>
        <CustomDropdown 
          label="Target Platform"
          value={config.targetPlatform}
          options={platformOptions}
          onSelect={(val) => onChange({ targetPlatform: val })}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Content Topic</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. AI-powered social media content creation"
          placeholderTextColor={COLORS.gray}
          value={config.topic}
          onChangeText={(val) => onChange({ topic: val })}
        />
      </View>

      <View style={styles.formGroup}>
        <CustomDropdown 
          label="Content Tone"
          value={config.tone}
          options={toneOptions}
          onSelect={(val) => onChange({ tone: val })}
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
  dropdownContainer: {
    zIndex: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  dropdownValue: {
    color: COLORS.white,
    fontSize: 14,
  },
  dropdownList: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  dropdownItemText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  dropdownItemTextActive: {
    color: COLORS.orange,
    fontWeight: '600',
  },
});
