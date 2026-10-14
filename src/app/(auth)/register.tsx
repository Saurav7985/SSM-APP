import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

import { COLORS } from '../../constants/colors';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import { authService } from '../../services/authService';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    setError('');

    if (!name.trim()) {
      setError('Full Name required');
      return;
    }
    if (!email.trim()) {
      setError('Email required');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setError('Valid email required');
      return;
    }
    if (!password) {
      setError('Password required');
      return;
    }
    if (password.length < 6) {
      setError('Password minimum 6 characters');
      return;
    }
    if (!confirmPassword) {
      setError('Confirm Password required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords must match');
      return;
    }

    try {
      const response = await authService.register({
        fullName: name.trim(),
        username: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        confirmPassword: confirmPassword,
        role: role,
        phoneNumber: '0000000000',
        country: 'India',
        timezone: 'Asia/Kolkata'
      });
      
      if (response.role === 'SUPER_ADMIN' || response.role === 'ADMIN') {
        router.replace('/(admin)/dashboard');
      } else {
        router.replace('/(user)/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          
          {/* Header / Branding */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Feather name="share-2" size={24} color={COLORS.orange} />
            </View>
            <Text style={styles.appName}>Create your account</Text>
            <Text style={styles.subtitleText}>Sign up to manage your campaigns</Text>
          </View>

          {/* Registration Card */}
          <View style={styles.cardContainer}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <View style={styles.roleSelectionContainer}>
              <Text style={styles.roleLabel}>Select Account Type</Text>
              <View style={styles.roleButtonsRow}>
                <Pressable
                  style={[styles.roleButton, role === 'USER' && styles.roleButtonActive]}
                  onPress={() => setRole('USER')}
                >
                  <Text style={[styles.roleButtonText, role === 'USER' && styles.roleButtonTextActive]}>User</Text>
                </Pressable>
                <Pressable
                  style={[styles.roleButton, role === 'ADMIN' && styles.roleButtonActive]}
                  onPress={() => setRole('ADMIN')}
                >
                  <Text style={[styles.roleButtonText, role === 'ADMIN' && styles.roleButtonTextActive]}>Admin</Text>
                </Pressable>
              </View>
            </View>

            <AuthInput
              label="Full Name"
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              iconName="user"
            />

            <AuthInput
              label="Email Address"
              placeholder="name@company.com"
              value={email}
              onChangeText={setEmail}
              iconName="mail"
            />
            
            <AuthInput
              label="Password"
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              secureTextEntry={true}
            />

            <AuthInput
              label="Confirm Password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              iconName="lock"
              secureTextEntry={true}
            />

            <View style={styles.buttonContainer}>
              <AuthButton title="Create Account" onPress={handleRegister} />
            </View>

            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <Pressable onPress={() => router.replace('/(auth)/login')} hitSlop={8}>
                <Text style={styles.contactAdmin}>Sign In</Text>
              </Pressable>
            </View>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '4%',
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#222',
  },
  appName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitleText: {
    color: COLORS.gray,
    fontSize: 10,
  },
  cardContainer: {
    width: '82%',
    maxWidth: 400,
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 15,
  },
  buttonContainer: {
    marginBottom: 24,
    marginTop: 10,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {
    color: COLORS.gray,
    fontSize: 10,
  },
  contactAdmin: {
    color: COLORS.orange,
    fontSize: 10,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  roleSelectionContainer: {
    marginBottom: 16,
  },
  roleLabel: {
    color: COLORS.white,
    fontSize: 12,
    marginBottom: 8,
    fontWeight: '500',
  },
  roleButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#222',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  roleButtonActive: {
    backgroundColor: COLORS.orange,
    borderColor: COLORS.orange,
  },
  roleButtonText: {
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: '600',
  },
  roleButtonTextActive: {
    color: COLORS.white,
  }
});
