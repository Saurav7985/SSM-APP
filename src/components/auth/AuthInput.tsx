import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface AuthInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  iconName?: keyof typeof Feather.glyphMap;
}

export default function AuthInput({ label, placeholder, value, onChangeText, secureTextEntry, iconName }: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = secureTextEntry !== undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {iconName && (
          <Feather name={iconName} size={14} color={COLORS.gray} style={styles.leftIcon} />
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword ? !showPassword : false}
          autoCapitalize={isPassword ? 'none' : 'none'}
          keyboardType={label.toLowerCase().includes('email') ? 'email-address' : 'default'}
        />
        {isPassword && (
          <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.rightIcon}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={14} color={COLORS.gray} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: 32,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 10,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    padding: 4,
  },
  input: {
    flex: 1,
    color: '#000000',
    fontSize: 12,
    height: '100%',
    padding: 0,
  },
});
