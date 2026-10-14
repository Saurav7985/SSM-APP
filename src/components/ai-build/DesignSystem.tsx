import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { AIBuildConfig } from '../../types/ai-build';

interface DesignSystemProps {
  config: AIBuildConfig['designSystem'];
  onChange: (updates: Partial<AIBuildConfig['designSystem']>) => void;
}

// Reusable Custom Dropdown for Mobile
function CustomDropdown({ label, value, options, onSelect, helperText }: { label: string, value: string, options: string[], onSelect: (val: string) => void, helperText?: string }) {
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
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

export default function DesignSystem({ config, onChange }: DesignSystemProps) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionTitleRow}>
        <Feather name="pen-tool" size={18} color={COLORS.orange} style={{ marginRight: 8 }} />
        <Text style={styles.sectionTitle}>Design System</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Design Reference URL (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="https://example.com/design-inspiration"
          placeholderTextColor={COLORS.gray}
          value={config.referenceUrl}
          onChangeText={(val) => onChange({ referenceUrl: val })}
        />
        <Text style={styles.helperText}>Paste a URL to a website or design you'd like to reference for inspiration</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCol}>
          <CustomDropdown 
            label="Heading Font"
            value={config.headingFont}
            options={['Plus Jakarta Sans (Friendly)', 'Inter (Modern Sans)', 'Playfair Display (Elegant)', 'Roboto (Clean)']}
            onSelect={(val) => onChange({ headingFont: val })}
          />
        </View>
        <View style={styles.halfCol}>
          <CustomDropdown 
            label="Body Font"
            value={config.bodyFont}
            options={['Inter (Modern Sans)', 'Open Sans (Readable)', 'Lora (Classic)', 'Lato (Warm)']}
            onSelect={(val) => onChange({ bodyFont: val })}
          />
        </View>
      </View>

      <View style={styles.formGroup}>
        <CustomDropdown 
          label="Color Scheme"
          value={config.colorScheme}
          options={['Purple & Pink (Creative)', 'Blue & Teal (Corporate)', 'Monochrome (Minimal)', 'Orange & Red (Energetic)']}
          onSelect={(val) => onChange({ colorScheme: val })}
        />
      </View>

      <View style={styles.formGroup}>
        <CustomDropdown 
          label="Design Style"
          value={config.designStyle}
          options={['Modern', 'Minimalist', 'Playful', 'Corporate', 'Vintage']}
          onSelect={(val) => onChange({ designStyle: val })}
          helperText="Clean lines, bold typography, elegant accents"
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
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
    marginBottom: 4,
  },
  helperText: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  halfCol: {
    flex: 1,
    minWidth: 140,
  },
  dropdownContainer: {
    marginBottom: 16,
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
