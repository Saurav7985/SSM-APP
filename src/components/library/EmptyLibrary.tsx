import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { router } from 'expo-router';
import AuthButton from '../auth/AuthButton';

export default function EmptyLibrary() {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="folder" size={32} color={COLORS.orange} />
      </View>
      <Text style={styles.title}>No posts yet</Text>
      <Text style={styles.description}>
        Create your first post to get started with binj.AI
      </Text>
      <View style={{ width: 160 }}>
        <AuthButton 
          title="Create Post" 
          onPress={() => router.push('/(user)/create')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 64,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,100,34,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,100,34,0.3)',
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: COLORS.gray,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 240,
    lineHeight: 20,
  },
});
