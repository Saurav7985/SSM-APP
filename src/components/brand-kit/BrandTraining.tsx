import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface TrainingStatus {
  logo: boolean;
  colors: boolean;
  voice: boolean;
  typography: boolean;
}

interface BrandTrainingProps {
  training: TrainingStatus;
  onTrainAI: () => Promise<boolean>;
}

export default function BrandTraining({ training, onTrainAI }: BrandTrainingProps) {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingSuccess, setTrainingSuccess] = useState(false);

  const calculateProgress = () => {
    let completed = 0;
    if (training.logo) completed += 25;
    if (training.colors) completed += 25;
    if (training.voice) completed += 25;
    if (training.typography) completed += 25;
    return completed;
  };

  const progress = calculateProgress();

  const handleTrain = async () => {
    if (progress === 0) return;
    setIsTraining(true);
    setTrainingSuccess(false);
    
    const success = await onTrainAI();
    
    setIsTraining(false);
    if (success) {
      setTrainingSuccess(true);
      setTimeout(() => setTrainingSuccess(false), 3000);
    }
  };

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>AI Brand Training</Text>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>AI Brand Training: {progress}% Complete</Text>
        <Text style={styles.cardSubtitle}>Help AI understand your brand better by completing all sections</Text>

        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        <View style={styles.checklist}>
          <View style={styles.checkItem}>
            <Feather name={training.logo ? "check-circle" : "circle"} size={16} color={training.logo ? "#10B981" : COLORS.gray} />
            <Text style={[styles.checkText, training.logo && styles.checkTextComplete]}>Logo uploaded</Text>
          </View>
          <View style={styles.checkItem}>
            <Feather name={training.colors ? "check-circle" : "circle"} size={16} color={training.colors ? "#10B981" : COLORS.gray} />
            <Text style={[styles.checkText, training.colors && styles.checkTextComplete]}>Colors defined</Text>
          </View>
          <View style={styles.checkItem}>
            <Feather name={training.voice ? "check-circle" : "circle"} size={16} color={training.voice ? "#10B981" : COLORS.gray} />
            <Text style={[styles.checkText, training.voice && styles.checkTextComplete]}>Voice documented</Text>
          </View>
          <View style={styles.checkItem}>
            <Feather name={training.typography ? "check-circle" : "circle"} size={16} color={training.typography ? "#10B981" : COLORS.gray} />
            <Text style={[styles.checkText, training.typography && styles.checkTextComplete]}>Typography set</Text>
          </View>
        </View>

        <Pressable 
          style={[styles.trainBtn, (progress === 0 || isTraining) && styles.trainBtnDisabled]} 
          onPress={handleTrain} 
          disabled={progress === 0 || isTraining}
        >
          {isTraining ? (
            <>
              <ActivityIndicator color={COLORS.white} size="small" style={{ marginRight: 8 }} />
              <Text style={styles.trainBtnText}>Training AI on Assets...</Text>
            </>
          ) : trainingSuccess ? (
            <>
              <Feather name="check" size={18} color={COLORS.white} style={{ marginRight: 8 }} />
              <Text style={styles.trainBtnText}>Training Complete!</Text>
            </>
          ) : (
            <Text style={styles.trainBtnText}>Train AI on All Assets</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  cardTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: COLORS.gray,
    fontSize: 13,
    marginBottom: 20,
    lineHeight: 18,
  },
  progressTrack: {
    height: 8,
    backgroundColor: '#111',
    borderRadius: 4,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.orange,
    borderRadius: 4,
  },
  checklist: {
    gap: 12,
    marginBottom: 24,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    color: COLORS.gray,
    fontSize: 14,
    marginLeft: 12,
  },
  checkTextComplete: {
    color: COLORS.white,
  },
  trainBtn: {
    backgroundColor: COLORS.orange,
    flexDirection: 'row',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trainBtnDisabled: {
    opacity: 0.5,
  },
  trainBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  }
});
