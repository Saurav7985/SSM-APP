import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { Platform, AgentConfig } from '../../types/messenger';
import AuthButton from '../auth/AuthButton';

interface AgentSettingsProps {
  platform: Platform;
  config: AgentConfig;
  onChange: (updates: Partial<AgentConfig>) => void;
  onSave: () => void;
}

export default function AgentSettings({ platform, config, onChange, onSave }: AgentSettingsProps) {
  
  const handleCopyPrompt = () => {
    onChange({ commentPrompt: config.dmPrompt });
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Feather name={platform.icon as any} size={24} color={platform.accentColor || COLORS.white} />
          <View style={styles.headerTitleWrap}>
            <Text style={styles.title}>{platform.name} AI Agent</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>OpenAI Powered</Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <Text style={[styles.statusText, config.automationEnabled && styles.statusActive]}>
            Automation {config.automationEnabled ? 'ON' : 'OFF'}
          </Text>
          <Text style={styles.loggingText}>
            {config.logToInbox ? 'Logging to Inbox' : 'Not Logging'}
          </Text>
        </View>
      </View>

      {/* DM Agent */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Auto-DM Agent Purpose & System Prompt</Text>
        <Text style={styles.inputLabel}>Direct Messages (DMs)</Text>
        <TextInput
          style={styles.promptInput}
          placeholder={`e.g. You are an AI sales and support specialist for our ${platform.name} account. Greet customers warmly, answer questions about our packages concisely, and encourage them to book a demo...`}
          placeholderTextColor={COLORS.gray}
          multiline
          textAlignVertical="top"
          value={config.dmPrompt}
          onChangeText={(text) => onChange({ dmPrompt: text })}
        />
        <Text style={styles.helperText}>
          This prompt gives full context and purpose to OpenAI when responding to private DMs on {platform.name}.
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Comment Agent */}
      <View style={styles.section}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>2. Auto-Comment Agent Purpose & System Prompt</Text>
          <Pressable style={styles.copyBtn} onPress={handleCopyPrompt}>
            <Feather name="copy" size={14} color={COLORS.orange} />
            <Text style={styles.copyBtnText}>Copy DM Prompt</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.promptInput}
          placeholder="e.g. You are an enthusiastic community manager replying to post comments. Keep replies under 2 sentences, energetic, and encourage the commenter to DM us for details..."
          placeholderTextColor={COLORS.gray}
          multiline
          textAlignVertical="top"
          value={config.commentPrompt}
          onChangeText={(text) => onChange({ commentPrompt: text })}
        />
        <Text style={styles.helperText}>
          You can define a separate, specialized purpose for post comments, or keep it identical to your DM agent.
        </Text>
      </View>

      <View style={styles.divider} />

      {/* Automation Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Automation Triggers & Inbox Logging Options</Text>
        
        <Pressable 
          style={styles.checkboxRow} 
          onPress={() => onChange({ autoReplyDM: !config.autoReplyDM })}
        >
          <View style={[styles.checkbox, config.autoReplyDM && styles.checkboxActive]}>
            {config.autoReplyDM && <Feather name="check" size={14} color={COLORS.white} />}
          </View>
          <View style={styles.checkboxTextWrap}>
            <Text style={styles.checkboxTitle}>Auto-Reply to DMs</Text>
            <Text style={styles.checkboxDesc}>Enable instant AI replies for incoming Direct Messages.</Text>
          </View>
        </Pressable>

        <Pressable 
          style={styles.checkboxRow} 
          onPress={() => onChange({ autoReplyComments: !config.autoReplyComments })}
        >
          <View style={[styles.checkbox, config.autoReplyComments && styles.checkboxActive]}>
            {config.autoReplyComments && <Feather name="check" size={14} color={COLORS.white} />}
          </View>
          <View style={styles.checkboxTextWrap}>
            <Text style={styles.checkboxTitle}>Auto-Reply to Comments</Text>
            <Text style={styles.checkboxDesc}>Enable AI replies for public post comments.</Text>
          </View>
        </Pressable>

        <Pressable 
          style={styles.checkboxRow} 
          onPress={() => onChange({ logToInbox: !config.logToInbox })}
        >
          <View style={[styles.checkbox, config.logToInbox && styles.checkboxActive]}>
            {config.logToInbox && <Feather name="check" size={14} color={COLORS.white} />}
          </View>
          <View style={styles.checkboxTextWrap}>
            <Text style={styles.checkboxTitle}>Log Messages to Inbox Section (Recommended)</Text>
            <Text style={styles.checkboxDesc}>When checked, every incoming message and automated AI response is logged immediately to your platform inbox section, where you can inspect conversations and edit AI replies anytime.</Text>
          </View>
        </Pressable>
      </View>

      {/* Save Agent */}
      <View style={styles.saveSection}>
        <AuthButton title={`Save ${platform.name} Agent`} onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
    padding: 20,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    minWidth: 200,
  },
  headerTitleWrap: {
    marginLeft: 12,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  badge: {
    backgroundColor: 'rgba(255,100,34,0.1)',
    borderWidth: 1,
    borderColor: COLORS.orange,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: 'bold',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  statusText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusActive: {
    color: '#10B981', // green
  },
  loggingText: {
    color: COLORS.gray,
    fontSize: 12,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  inputLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  promptInput: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    color: COLORS.white,
    fontSize: 14,
    minHeight: 120,
    marginBottom: 8,
  },
  helperText: {
    color: COLORS.gray,
    fontSize: 12,
    lineHeight: 16,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: 'rgba(255,100,34,0.1)',
    borderRadius: 6,
  },
  copyBtnText: {
    color: COLORS.orange,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  checkboxTextWrap: {
    flex: 1,
  },
  checkboxTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  checkboxDesc: {
    color: COLORS.gray,
    fontSize: 12,
    lineHeight: 18,
  },
  saveSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#222',
  }
});
