import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SettingsState, AIModelType, AIResponseStyle } from '../../types/settings';
import { SettingsService } from '../../services/settingsService';

interface AIPreferencesProps {
  preferences: SettingsState['aiPreferences'];
  onUpdate: () => void;
}

const MODELS: AIModelType[] = ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Llama 3'];
const STYLES: AIResponseStyle[] = ['Professional', 'Friendly', 'Concise', 'Creative', 'Detailed'];

export default function AIPreferences({ preferences, onUpdate }: AIPreferencesProps) {
  const [prefs, setPrefs] = useState(preferences);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // For dropdowns in a real app you'd use a Modal or Picker, mocking with simple cycle for now
  const cycleModel = () => {
    const idx = MODELS.indexOf(prefs.defaultModel);
    setPrefs({ ...prefs, defaultModel: MODELS[(idx + 1) % MODELS.length] });
  };

  const cycleStyle = () => {
    const idx = STYLES.indexOf(prefs.responseStyle);
    setPrefs({ ...prefs, responseStyle: STYLES[(idx + 1) % STYLES.length] });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await SettingsService.updateAIPreferences(prefs);
    setIsSaving(false);
    setSaveSuccess(true);
    onUpdate();
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Preferences</Text>
        <Text style={styles.subtitle}>Configure how the AI agent creates content and interacts</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View>
            <Text style={styles.label}>Default AI Model</Text>
            <Text style={styles.helperText}>The underlying engine used for generation</Text>
          </View>
          <Pressable style={styles.selector} onPress={cycleModel}>
            <Text style={styles.selectorText}>{prefs.defaultModel}</Text>
            <Feather name="chevron-down" size={16} color={COLORS.gray} />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View>
            <Text style={styles.label}>Response Style</Text>
            <Text style={styles.helperText}>The tone of voice used by the AI</Text>
          </View>
          <Pressable style={styles.selector} onPress={cycleStyle}>
            <Text style={styles.selectorText}>{prefs.responseStyle}</Text>
            <Feather name="chevron-down" size={16} color={COLORS.gray} />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.label}>AI Content Generation</Text>
            <Text style={styles.helperText}>Allow AI to automatically draft posts</Text>
          </View>
          <Switch
            trackColor={{ false: '#333', true: COLORS.orange }}
            thumbColor={COLORS.white}
            value={prefs.autoGenerateContent}
            onValueChange={(val) => setPrefs({ ...prefs, autoGenerateContent: val })}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.toggleRow}>
          <View style={styles.toggleInfo}>
            <Text style={styles.label}>AI Auto Reply</Text>
            <Text style={styles.helperText}>Allow AI to automatically respond to comments</Text>
          </View>
          <Switch
            trackColor={{ false: '#333', true: COLORS.orange }}
            thumbColor={COLORS.white}
            value={prefs.autoReply}
            onValueChange={(val) => setPrefs({ ...prefs, autoReply: val })}
          />
        </View>

        <Pressable 
          style={styles.saveBtn} 
          onPress={handleSave} 
          disabled={isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.saveBtnText}>{saveSuccess ? 'Saved!' : 'Save AI Preferences'}</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  settingRow: {
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleInfo: {
    flex: 1,
    paddingRight: 16,
  },
  label: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  helperText: {
    color: COLORS.gray,
    fontSize: 13,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 12,
  },
  selectorText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 20,
  },
  saveBtn: {
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  }
});
