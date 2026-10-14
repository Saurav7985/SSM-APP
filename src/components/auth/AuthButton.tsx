import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
}

export default function AuthButton({ title, onPress }: AuthButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.orange,
    height: 32,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  text: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
