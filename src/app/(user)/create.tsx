import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView,  Pressable, TextInput, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import AuthButton from '../../components/auth/AuthButton';

// --- Shared Types & Constants ---
type ContentType = 'image' | 'reel' | 'video';
type CaptionMode = 'same' | 'custom';

const PLATFORMS = [
  { name: 'Instagram', icon: 'instagram' },
  { name: 'Facebook', icon: 'facebook' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'YouTube', icon: 'youtube' },
  { name: 'Threads', icon: 'at-sign' },
  { name: 'Pinterest', icon: 'image' },
  { name: 'WhatsApp', icon: 'message-circle' },
  { name: 'Bluesky', icon: 'cloud' },
  { name: 'TikTok', icon: 'music' },
  { name: 'Slack', icon: 'slack' },
  { name: 'Telegram', icon: 'send' },
  { name: 'Discord', icon: 'message-square' },
  { name: 'Canva', icon: 'pen-tool' },
  { name: 'Medium', icon: 'book' },
  { name: 'Reddit', icon: 'smile' },
  { name: 'Twitch', icon: 'tv' },
  { name: 'Kick', icon: 'play' },
];

const PRESET_COLORS = [
  '#FF6422', '#E1306C', '#1DA1F2', '#0A66C2', '#FF0000', '#25D366', '#5865F2', '#8B5CF6', '#10B981', '#F59E0B'
];

// --- Sub-components ---

function DirectPublisher() {
  const [contentType, setContentType] = useState<ContentType>('image');
  const [captionMode, setCaptionMode] = useState<CaptionMode>('same');
  const [caption, setCaption] = useState('');
  const [pubDate, setPubDate] = useState('2026-08-20');
  const [pubTime, setPubTime] = useState('12:00 PM');
  const [pubStatus, setPubStatus] = useState('Published');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram']);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) ? prev.filter(p => p !== platform) : [...prev, platform]
    );
  };

  const handlePublish = () => {
    console.log('Publish Direct', { contentType, captionMode, caption, pubDate, pubTime, pubStatus, selectedPlatforms });
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Direct Publisher</Text>
        <Text style={styles.pageSubtitle}>Publish images, reels, and videos across your social networks from one place.</Text>
      </View>

      <View style={styles.tabsContainer}>
        <Pressable style={[styles.tabBtn, contentType === 'image' && styles.tabBtnActive]} onPress={() => setContentType('image')}>
          <Text style={[styles.tabBtnText, contentType === 'image' && styles.tabBtnTextActive]}>Image Post</Text>
        </Pressable>
        <Pressable style={[styles.tabBtn, contentType === 'reel' && styles.tabBtnActive]} onPress={() => setContentType('reel')}>
          <Text style={[styles.tabBtnText, contentType === 'reel' && styles.tabBtnTextActive]}>Reel (Short-form)</Text>
        </Pressable>
        <Pressable style={[styles.tabBtn, contentType === 'video' && styles.tabBtnActive]} onPress={() => setContentType('video')}>
          <Text style={[styles.tabBtnText, contentType === 'video' && styles.tabBtnTextActive]}>Video (Long-form)</Text>
        </Pressable>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Caption & Content</Text>
        
        <View style={styles.captionToggleRow}>
          <Pressable style={styles.captionToggleBtn} onPress={() => setCaptionMode('same')}>
            <View style={[styles.radioOuter, captionMode === 'same' && styles.radioOuterActive]}>
              {captionMode === 'same' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.captionToggleText}>Same Caption for All</Text>
          </Pressable>
          <Pressable style={styles.captionToggleBtn} onPress={() => setCaptionMode('custom')}>
            <View style={[styles.radioOuter, captionMode === 'custom' && styles.radioOuterActive]}>
              {captionMode === 'custom' && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.captionToggleText}>Custom Caption per Platform</Text>
          </Pressable>
        </View>

        <TextInput
          style={styles.captionInput}
          placeholder="Write your main post caption here..."
          placeholderTextColor={COLORS.gray}
          multiline={true}
          textAlignVertical="top"
          value={caption}
          onChangeText={setCaption}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.detailsRow}>
          <View style={styles.detailInputBox}>
            <Text style={styles.detailLabel}>Publication Date</Text>
            <View style={styles.fakeInput}>
              <Text style={styles.fakeInputText}>{pubDate}</Text>
              <Feather name="calendar" size={14} color={COLORS.gray} />
            </View>
          </View>
          <View style={styles.detailInputBox}>
            <Text style={styles.detailLabel}>Publication Time</Text>
            <View style={styles.fakeInput}>
              <Text style={styles.fakeInputText}>{pubTime}</Text>
              <Feather name="clock" size={14} color={COLORS.gray} />
            </View>
          </View>
          <View style={styles.detailInputBox}>
            <Text style={styles.detailLabel}>Status</Text>
            <View style={styles.fakeInput}>
              <Text style={styles.fakeInputText}>{pubStatus}</Text>
              <Feather name="chevron-down" size={14} color={COLORS.gray} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Target Platforms</Text>
        <View style={styles.platformsGrid}>
          {PLATFORMS.map((platform) => {
            const isActive = selectedPlatforms.includes(platform.name);
            return (
              <Pressable
                key={platform.name}
                style={[styles.platformChip, isActive && styles.platformChipActive]}
                onPress={() => togglePlatform(platform.name)}
              >
                <Feather name={platform.icon as any} size={14} color={isActive ? COLORS.white : COLORS.gray} style={{ marginRight: 6 }} />
                <Text style={[styles.platformText, isActive && styles.platformTextActive]}>{platform.name}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Visual Attachment</Text>
        <Pressable style={styles.uploadZone} onPress={() => console.log('Open File Picker')}>
          <View style={styles.uploadIconCircle}>
            <Feather name="upload-cloud" size={24} color={COLORS.orange} />
          </View>
          <Text style={styles.uploadMainText}>Click to browse or drag and drop</Text>
          <Text style={styles.uploadSubText}>JPG, PNG or GIF (Max 10MB)</Text>
        </Pressable>
      </View>

      <View style={styles.divider} />

      <View style={styles.bottomActionRow}>
        <View style={{ width: 140 }}>
          <AuthButton title="Publish Now" onPress={handlePublish} />
        </View>
      </View>
    </View>
  );
}

function AICreatorStudio() {
  const [aiStep, setAiStep] = useState(1);
  
  // Brand Data State
  const [logo, setLogo] = useState<string | null>(null);
  const [brandVoice, setBrandVoice] = useState('');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  // Validation Error
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddKeyword = () => {
    const trimmed = keywordInput.trim();
    if (trimmed && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
    }
    setKeywordInput('');
  };

  const removeKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const toggleColor = (c: string) => {
    setColors(prev => prev.includes(c) ? prev.filter(col => col !== c) : [...prev, c]);
  };

  const handleNext = () => {
    setErrorMsg('');
    if (aiStep === 1) {
      if (!brandVoice.trim()) {
        setErrorMsg('Please describe your brand voice.');
        return;
      }
      if (keywords.length === 0) {
        setErrorMsg('Please add at least one keyword.');
        return;
      }
      if (colors.length === 0) {
        setErrorMsg('Please select at least one brand color.');
        return;
      }
      setAiStep(2);
    } else if (aiStep === 2) {
      setAiStep(3);
    }
  };

  return (
    <View style={styles.aiContainer}>
      
      {/* Progress Stepper */}
      <View style={styles.stepperContainer}>
        {[1, 2, 3].map((step, index) => {
          const isActive = step === aiStep;
          const isPast = step < aiStep;
          const stepLabels = ['Brand Inputs', 'Content Settings', 'Generate'];
          return (
            <React.Fragment key={step}>
              <View style={styles.stepItem}>
                <View style={[styles.stepCircle, (isActive || isPast) && styles.stepCircleActive]}>
                  <Text style={[styles.stepNumber, (isActive || isPast) && styles.stepNumberActive]}>{step}</Text>
                </View>
                <Text style={[styles.stepLabel, isActive && styles.stepLabelActive, isPast && styles.stepLabelPast]}>
                  {stepLabels[index]}
                </Text>
              </View>
              {index < 2 && <View style={[styles.stepLine, isPast && styles.stepLineActive]} />}
            </React.Fragment>
          );
        })}
      </View>

      {/* Step 1: Brand Inputs */}
      {aiStep === 1 && (
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Let's understand your brand</Text>
            <Text style={styles.cardSubtitle}>Upload your brand assets so AI can match your style</Text>
          </View>

          {/* Logo Upload */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Brand Logo</Text>
            <Pressable style={styles.aiUploadZone} onPress={() => {
              console.log('Mock Upload Logo');
              setLogo('mock_logo_path.png');
            }}>
              <Feather name="image" size={24} color={COLORS.gray} style={{ marginBottom: 8 }} />
              {logo ? (
                <Text style={styles.uploadMainText}>Logo Selected ({logo})</Text>
              ) : (
                <Text style={styles.uploadMainText}>Drop your logo here or click to browse</Text>
              )}
              <Text style={styles.uploadSubText}>PNG, JPG or SVG (max 5MB)</Text>
            </Pressable>
          </View>

          {/* Brand Voice */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>How would you describe your brand voice?</Text>
            <TextInput
              style={styles.aiCaptionInput}
              placeholder="We're friendly, professional, and love helping small businesses grow..."
              placeholderTextColor={COLORS.gray}
              multiline={true}
              textAlignVertical="top"
              maxLength={500}
              value={brandVoice}
              onChangeText={setBrandVoice}
            />
            <View style={styles.voiceFooter}>
              <Text style={styles.helperText}>This helps AI write in your style</Text>
              <Text style={styles.charCount}>{brandVoice.length}/500</Text>
            </View>
          </View>

          {/* Brand Keywords */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Keywords that represent your brand</Text>
            <TextInput
              style={styles.aiTextInput}
              placeholder="Type and press enter..."
              placeholderTextColor={COLORS.gray}
              value={keywordInput}
              onChangeText={setKeywordInput}
              onSubmitEditing={handleAddKeyword}
              blurOnSubmit={false}
            />
            {keywords.length > 0 && (
              <View style={styles.keywordsWrap}>
                {keywords.map(kw => (
                  <View key={kw} style={styles.keywordChip}>
                    <Text style={styles.keywordText}>{kw}</Text>
                    <Pressable onPress={() => removeKeyword(kw)} hitSlop={5}>
                      <Feather name="x" size={14} color={COLORS.white} style={{ marginLeft: 6 }} />
                    </Pressable>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Brand Colors */}
          <View style={styles.formGroup}>
            <Text style={styles.inputLabel}>Pick your brand colors</Text>
            <View style={styles.colorsGrid}>
              {PRESET_COLORS.map(c => {
                const selected = colors.includes(c);
                return (
                  <Pressable 
                    key={c} 
                    style={[styles.colorCircle, { backgroundColor: c }, selected && styles.colorCircleSelected]}
                    onPress={() => toggleColor(c)}
                  >
                    {selected && <Feather name="check" size={16} color="#fff" />}
                  </Pressable>
                );
              })}
            </View>
          </View>

          {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

          <View style={styles.nextRow}>
            <Pressable style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>Next: Content Details</Text>
              <Feather name="arrow-right" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
            </Pressable>
          </View>
        </View>
      )}

      {/* Step 2 Placeholder */}
      {aiStep === 2 && (
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Content Settings</Text>
            <Text style={styles.cardSubtitle}>Define what you want the AI to create for you.</Text>
          </View>
          <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: COLORS.gray }}>Step 2 Implementation Coming Soon...</Text>
          </View>
          <View style={styles.nextRow}>
            <Pressable style={[styles.nextBtn, { backgroundColor: COLORS.card, borderWidth: 1, borderColor: '#333', marginRight: 12 }]} onPress={() => setAiStep(1)}>
              <Text style={styles.nextBtnText}>Back</Text>
            </Pressable>
            <Pressable style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.nextBtnText}>Next: Generate</Text>
              <Feather name="arrow-right" size={16} color={COLORS.white} style={{ marginLeft: 6 }} />
            </Pressable>
          </View>
        </View>
      )}

      {/* Step 3 Placeholder */}
      {aiStep === 3 && (
        <View style={styles.cardContainer}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Generate Content</Text>
            <Text style={styles.cardSubtitle}>Review settings and generate your AI content.</Text>
          </View>
          <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: COLORS.gray }}>Step 3 Implementation Coming Soon...</Text>
          </View>
          <View style={styles.nextRow}>
            <Pressable style={[styles.nextBtn, { backgroundColor: COLORS.card, borderWidth: 1, borderColor: '#333', marginRight: 12 }]} onPress={() => setAiStep(2)}>
              <Text style={styles.nextBtnText}>Back</Text>
            </Pressable>
            <AuthButton title="Generate Now" onPress={() => console.log('Generate!')} />
          </View>
        </View>
      )}

    </View>
  );
}

// --- Main Screen Component ---
export default function CreateContentScreen() {
  const [activeMode, setActiveMode] = useState<'ai' | 'direct'>('ai'); // Default to AI

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        
        {/* Top Toggle */}
        <View style={styles.topToggleContainer}>
          <Pressable 
            style={[styles.toggleBtn, activeMode === 'ai' && styles.toggleBtnActive]}
            onPress={() => setActiveMode('ai')}
          >
            <Text style={[styles.toggleBtnText, activeMode === 'ai' && styles.toggleBtnTextActive]}>AI Creator Studio</Text>
          </Pressable>
          <Pressable 
            style={[styles.toggleBtn, activeMode === 'direct' && styles.toggleBtnActive]}
            onPress={() => setActiveMode('direct')}
          >
            <Text style={[styles.toggleBtnText, activeMode === 'direct' && styles.toggleBtnTextActive]}>Direct Publisher</Text>
          </Pressable>
        </View>

        {activeMode === 'ai' ? <AICreatorStudio /> : <DirectPublisher />}
        
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,},
  scrollContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  topToggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#222',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: '#333',
  },
  toggleBtnText: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: '600',
  },
  toggleBtnTextActive: {
    color: COLORS.white,
  },
  headerContainer: {
    marginBottom: 24,
  },
  pageTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pageSubtitle: {
    color: COLORS.gray,
    fontSize: 12,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
    marginBottom: 24,
    flexWrap: 'wrap',
    gap: 10,
  },
  tabBtn: {
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: COLORS.orange,
  },
  tabBtnText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '600',
  },
  tabBtnTextActive: {
    color: COLORS.orange,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  captionToggleRow: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 16,
  },
  captionToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioOuter: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterActive: {
    borderColor: COLORS.orange,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.orange,
  },
  captionToggleText: {
    color: COLORS.white,
    fontSize: 12,
  },
  captionInput: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    color: COLORS.white,
    padding: 12,
    minHeight: 120,
    fontSize: 14,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  detailInputBox: {
    flex: 1,
    minWidth: 100,
  },
  detailLabel: {
    color: COLORS.white,
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '600',
  },
  fakeInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.card,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 12,
    height: 40,
  },
  fakeInputText: {
    color: COLORS.white,
    fontSize: 12,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  platformChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  platformChipActive: {
    borderColor: COLORS.orange,
    backgroundColor: 'rgba(255, 100, 34, 0.1)',
  },
  platformText: {
    color: COLORS.gray,
    fontSize: 12,
  },
  platformTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  uploadZone: {
    borderWidth: 1,
    borderColor: '#444',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
  },
  uploadIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 100, 34, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadMainText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  uploadSubText: {
    color: COLORS.gray,
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 24,
  },
  bottomActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  // --- AI Creator Studio Styles ---
  aiContainer: {
    flex: 1,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  stepCircleActive: {
    backgroundColor: COLORS.orange,
  },
  stepNumber: {
    color: COLORS.gray,
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepNumberActive: {
    color: COLORS.white,
  },
  stepLabel: {
    color: COLORS.gray,
    fontSize: 10,
  },
  stepLabelActive: {
    color: COLORS.orange,
    fontWeight: 'bold',
  },
  stepLabelPast: {
    color: COLORS.white,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#222',
    marginHorizontal: 8,
    marginBottom: 16,
  },
  stepLineActive: {
    backgroundColor: COLORS.orange,
  },
  cardContainer: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardHeader: {
    marginBottom: 20,
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardSubtitle: {
    color: COLORS.gray,
    fontSize: 12,
  },
  formGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  aiUploadZone: {
    borderWidth: 1,
    borderColor: '#444',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  aiCaptionInput: {
    backgroundColor: '#0A0A0A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    color: COLORS.white,
    padding: 12,
    minHeight: 100,
    fontSize: 14,
  },
  voiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  helperText: {
    color: COLORS.gray,
    fontSize: 11,
  },
  charCount: {
    color: COLORS.gray,
    fontSize: 11,
  },
  aiTextInput: {
    backgroundColor: '#0A0A0A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#222',
    color: COLORS.white,
    paddingHorizontal: 12,
    height: 44,
    fontSize: 14,
  },
  keywordsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  keywordChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  keywordText: {
    color: COLORS.white,
    fontSize: 12,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorCircleSelected: {
    borderColor: COLORS.white,
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginBottom: 12,
    textAlign: 'center',
  },
  nextRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.orange,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  nextBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
