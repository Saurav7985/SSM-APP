import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

interface RememberMeProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  onForgotPassword: () => void;
}

export default function RememberMe({ checked, onChange, onForgotPassword }: RememberMeProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.checkboxContainer}
        onPress={() => onChange(!checked)}
      >
        <View style={[styles.box, checked && styles.boxChecked]}>
          {checked && <Feather name="check" size={10} color={COLORS.white} />}
        </View>
        <Text style={styles.label}>Remember me</Text>
      </Pressable>
      
      <Pressable onPress={onForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
    backgroundColor: 'transparent',
  },
  boxChecked: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  label: {
    color: COLORS.gray,
    fontSize: 10,
  },
  forgotPassword: {
    color: COLORS.orange,
    fontSize: 10,
  },
});
