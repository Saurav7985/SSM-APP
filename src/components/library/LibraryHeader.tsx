import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface LibraryHeaderProps {
  postCount: number;
}

export default function LibraryHeader({ postCount }: LibraryHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Content Library</Text>
      <Text style={styles.subtitle}>{postCount} post{postCount !== 1 ? 's' : ''} created</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
  },
});
