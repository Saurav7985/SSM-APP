import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, ActivityIndicator, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';

interface VoiceToneProps {
  initialVoice: string;
  onSave: (voice: string) => Promise<void>;
}

const EXAMPLE_PROMPTS = [
  "We speak like a trusted friend who happens to be an expert in the field.",
  "Professional but never stuffy, informative but never boring.",
  "Bold, energetic, and unafraid to challenge the status quo.",
  "Empathetic, nurturing, and highly focused on community support."
];

export default function VoiceTone({ initialVoice, onSave }: VoiceToneProps) {
  const [voice, setVoice] = useState(initialVoice);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(voice);
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handlePromptSelect = (prompt: string) => {
    setVoice(prompt);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Voice & Tone</Text>
      
      <View style={styles.labelRow}>
        <Text style={styles.label}>Brand Voice</Text>
        <Text style={styles.counter}>{voice.length}/1000</Text>
      </View>

      <TextInput
        style={styles.input}
        multiline
        value={voice}
        onChangeText={setVoice}
        maxLength={1000}
        placeholder="Describe how your brand sounds..."
        placeholderTextColor="#666"
        textAlignVertical="top"
      />
      <Text style={styles.helperText}>This helps AI write in your unique style</Text>

      <Text style={styles.subTitle}>Example Prompts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promptsContainer} contentContainerStyle={styles.promptsContent}>
        {EXAMPLE_PROMPTS.map((prompt, idx) => (
          <Pressable key={idx} style={styles.promptCard} onPress={() => handlePromptSelect(prompt)}>
            <Text style={styles.promptText}>"{prompt}"</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Pressable style={styles.saveBtn} onPress={handleSave} disabled={isSaving}>
        {isSaving ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.saveBtnText}>{saved ? 'Saved!' : 'Save Voice Settings'}</Text>
        )}
      </Pressable>
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
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  label: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '500',
  },
  counter: {
    color: '#666',
    fontSize: 12,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    color: COLORS.white,
    padding: 16,
    minHeight: 120,
    fontSize: 14,
    lineHeight: 22,
  },
  helperText: {
    color: COLORS.gray,
    fontSize: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  subTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  promptsContainer: {
    marginBottom: 24,
    maxHeight: 120,
  },
  promptsContent: {
    gap: 12,
  },
  promptCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 12,
    padding: 16,
    width: 200,
    justifyContent: 'center',
  },
  promptText: {
    color: COLORS.gray,
    fontSize: 13,
    lineHeight: 18,
    fontStyle: 'italic',
  },
  saveBtn: {
    backgroundColor: COLORS.orange,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  }
});
