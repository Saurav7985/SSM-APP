import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet,  ScrollView, Platform, StatusBar, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../../constants/colors';
import { PLATFORMS_DATA } from '../../../constants/platforms';
import { AgentConfig, Platform as MessengerPlatform } from '../../../types/messenger';
import PlatformSelector from '../../../components/messenger/PlatformSelector';
import AgentSettings from '../../../components/messenger/AgentSettings';
import Simulator from '../../../components/messenger/Simulator';
import AuthButton from '../../../components/auth/AuthButton';

export default function AIAgentStudioScreen() {
  const [activePlatformId, setActivePlatformId] = useState<string>('facebook');
  
  const createDefaultConfig = (id: string): AgentConfig => ({
    platformId: id,
    dmPrompt: '',
    commentPrompt: '',
    autoReplyDM: false,
    autoReplyComments: false,
    logToInbox: true,
    automationEnabled: false});

  const [configMap, setConfigMap] = useState<Record<string, AgentConfig>>({
    facebook: createDefaultConfig('facebook'),
  });

  const activePlatform: MessengerPlatform = PLATFORMS_DATA.find(p => p.id === activePlatformId) || PLATFORMS_DATA[1];
  
  const currentConfig = configMap[activePlatformId] || createDefaultConfig(activePlatformId);

  const handleConfigChange = (updates: Partial<AgentConfig>) => {
    setConfigMap(prev => ({
      ...prev,
      [activePlatformId]: { ...currentConfig, ...updates }
    }));
  };

  const handleSave = () => {
    if (!currentConfig.dmPrompt.trim() && !currentConfig.commentPrompt.trim()) {
      Alert.alert('Please provide at least a DM prompt or Comment prompt.');
      return;
    }
    
    handleConfigChange({ automationEnabled: true });
    Alert.alert(`${activePlatform.name} Agent configuration saved successfully!`);
  };

  useEffect(() => {
    if (!configMap[activePlatformId]) {
      setConfigMap(prev => ({
        ...prev,
        [activePlatformId]: createDefaultConfig(activePlatformId)
      }));
    }
  }, [activePlatformId]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Feather name="cpu" size={24} color={COLORS.orange} style={{ marginRight: 12 }} />
          <View>
            <Text style={styles.headerTitle}>AI Agent Studio & Automation</Text>
            <Text style={styles.headerSubtitle}>
              Configure platform-specific OpenAI agents. Define the purpose of each agent, set rules for DMs and Comments, and choose whether interactions are logged to your inbox.
            </Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <AuthButton title="Save & Activate" onPress={handleSave} />
        </View>
      </View>

      <PlatformSelector activePlatform={activePlatformId} onSelect={setActivePlatformId} />

      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.mainLayout}>
          <View style={styles.leftCol}>
            <AgentSettings 
              platform={activePlatform}
              config={currentConfig}
              onChange={handleConfigChange}
              onSave={handleSave}
            />
          </View>
          <View style={styles.rightCol}>
            <Simulator 
              dmPrompt={currentConfig.dmPrompt}
              commentPrompt={currentConfig.commentPrompt}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background, },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#222', flexWrap: 'wrap', gap: 16 },
  headerLeft: { flexDirection: 'row', flex: 1, minWidth: 280 },
  headerTitle: { color: COLORS.white, fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  headerSubtitle: { color: COLORS.gray, fontSize: 12, lineHeight: 18, paddingRight: 16 },
  headerRight: { width: 140 },
  scrollContent: { paddingBottom: 40 },
  mainLayout: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 16 },
  leftCol: { flex: 1, minWidth: 300 },
  rightCol: { flex: 1, minWidth: 300 }
});
