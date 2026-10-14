import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, StyleSheet,  ScrollView, Platform, StatusBar, Alert } from 'react-native';
import { COLORS } from '../../constants/colors';
import { AIBuildConfig } from '../../types/ai-build';

import AIStudioHeader from '../../components/ai-build/AIStudioHeader';
import BrandInformation from '../../components/ai-build/BrandInformation';
import ColorPicker from '../../components/ai-build/ColorPicker';
import DesignSystem from '../../components/ai-build/DesignSystem';
import DesignPreview from '../../components/ai-build/DesignPreview';
import ContentDetails from '../../components/ai-build/ContentDetails';
import GenerateButton from '../../components/ai-build/GenerateButton';

export default function AIStudioScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<AIBuildConfig>({
    brandName: 'binj.AI',
    brandVoice: 'Professional, innovative, and creative',
    primaryColor: '#8B5CF6',
    secondaryColor: '#EC4899',
    designSystem: {
      referenceUrl: '',
      headingFont: 'Plus Jakarta Sans (Friendly)',
      bodyFont: 'Inter (Modern Sans)',
      colorScheme: 'Purple & Pink (Creative)',
      designStyle: 'Modern'},
    content: {
      targetPlatform: 'Instagram',
      topic: 'AI-powered social media content creation',
      tone: 'Exciting',
    }
  });

  const handleBrandChange = (field: string, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleDesignSystemChange = (updates: Partial<AIBuildConfig['designSystem']>) => {
    setConfig(prev => ({ 
      ...prev, 
      designSystem: { ...prev.designSystem, ...updates } 
    }));
  };

  const handleContentChange = (updates: Partial<AIBuildConfig['content']>) => {
    setConfig(prev => ({ 
      ...prev, 
      content: { ...prev.content, ...updates } 
    }));
  };

  const handleGenerate = () => {
    if (!config.brandName.trim()) {
      Alert.alert('Please enter a Brand Name');
      return;
    }
    if (!config.content.topic.trim()) {
      Alert.alert('Please enter a Content Topic');
      return;
    }

    setIsLoading(true);
    
    // Simulate generation workflow delay
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('AI Generation complete! Your content is ready.');
      // In a real app, router.push('/generation-results') would happen here
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        
        <AIStudioHeader />

        <View style={styles.formContainer}>
          <BrandInformation 
            brandName={config.brandName}
            brandVoice={config.brandVoice}
            onChange={handleBrandChange}
          />

          <ColorPicker 
            primaryColor={config.primaryColor}
            secondaryColor={config.secondaryColor}
            onChange={handleBrandChange}
          />

          <DesignSystem 
            config={config.designSystem}
            onChange={handleDesignSystemChange}
          />

          <DesignPreview 
            primaryColor={config.primaryColor}
            secondaryColor={config.secondaryColor}
          />

          <ContentDetails 
            config={config.content}
            onChange={handleContentChange}
          />

          <GenerateButton 
            onPress={handleGenerate}
            isLoading={isLoading}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  formContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#222',
    marginHorizontal: 16,
    padding: 24,
  },
});
