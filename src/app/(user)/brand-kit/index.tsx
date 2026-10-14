import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet,  Platform, StatusBar, ScrollView, RefreshControl } from 'react-native';
import { COLORS } from '../../../constants/colors';
import { BrandKitService } from '../../../services/brandKitService';
import { BrandKit, BrandLogo, BrandColor, BrandGuideline } from '../../../types/brandKit';

import BrandKitHeader from '../../../components/brand-kit/BrandKitHeader';
import LogoSection from '../../../components/brand-kit/LogoSection';
import BrandColors from '../../../components/brand-kit/BrandColors';
import BrandFonts from '../../../components/brand-kit/BrandFonts';
import VoiceTone from '../../../components/brand-kit/VoiceTone';
import BrandGuidelines from '../../../components/brand-kit/BrandGuidelines';
import BrandTraining from '../../../components/brand-kit/BrandTraining';

export default function BrandKitScreen() {
  const [kit, setKit] = useState<BrandKit | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const data = await BrandKitService.getBrandKit();
      setKit(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  };

  const handleAddLogo = async (logo: BrandLogo) => {
    await BrandKitService.addLogo(logo);
    loadData();
  };

  const handleRemoveLogo = async (id: string) => {
    await BrandKitService.removeLogo(id);
    loadData();
  };

  const handleAddColor = async (color: BrandColor) => {
    await BrandKitService.addColor(color);
    loadData();
  };

  const handleRemoveColor = async (id: string) => {
    await BrandKitService.removeColor(id);
    loadData();
  };

  const handleChangeFont = async (type: 'primary' | 'secondary', font: string) => {
    if (!kit) return;
    const newKit = { ...kit, fonts: { ...kit.fonts, [type]: font } };
    await BrandKitService.updateBrandKit(newKit);
    loadData();
  };

  const handleSaveVoice = async (voice: string) => {
    if (!kit) return;
    const newKit = { ...kit, voice };
    await BrandKitService.updateBrandKit(newKit);
    loadData();
  };

  const handleAddGuideline = async (guideline: BrandGuideline) => {
    await BrandKitService.addGuideline(guideline);
    loadData();
  };

  const handleRemoveGuideline = async (id: string) => {
    await BrandKitService.removeGuideline(id);
    loadData();
  };

  const handleTrainAI = async () => {
    return await BrandKitService.trainAI();
  };

  if (!kit) return <View style={styles.safeArea} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <BrandKitHeader />
      
      <ScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl 
            refreshing={isRefreshing} 
            onRefresh={handleRefresh} 
            tintColor={COLORS.orange}
            colors={[COLORS.orange]}
          />
        }
      >
        <View style={styles.spacingContainer}>
          <LogoSection 
            logos={kit.logos} 
            onAddLogo={handleAddLogo} 
            onRemoveLogo={handleRemoveLogo} 
          />
          
          <BrandColors 
            colors={kit.colors} 
            onAddColor={handleAddColor} 
            onRemoveColor={handleRemoveColor} 
          />
          
          <BrandFonts 
            primary={kit.fonts.primary} 
            secondary={kit.fonts.secondary} 
            onChangeFont={handleChangeFont} 
          />
          
          <VoiceTone 
            initialVoice={kit.voice} 
            onSave={handleSaveVoice} 
          />
          
          <BrandGuidelines 
            guidelines={kit.guidelines} 
            onAddGuideline={handleAddGuideline} 
            onRemoveGuideline={handleRemoveGuideline} 
          />
          
          <BrandTraining 
            training={kit.training} 
            onTrainAI={handleTrainAI} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
    paddingTop: 24,
  },
  spacingContainer: {
    gap: 16,
  }
});
