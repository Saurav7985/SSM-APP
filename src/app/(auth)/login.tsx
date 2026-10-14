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

import { COLORS } from '../../constants/colors';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import RememberMe from '../../components/auth/RememberMe';
import { router } from 'expo-router';
import { ADMIN } from '../../constants/admin';
import { getUser } from '../../utils/authStorage';
import { authService } from '../../services/authService';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setError('');

    if (!email.trim()) {
      setError('Email required');
      return;
    }
    if (!password) {
      setError('Password required');
      return;
    }

    try {
      const response = await authService.login({ email: email.trim(), password });

      if (response.role === 'ADMIN') {
        router.replace('/(admin)/dashboard');
      }
       else if (response.role === 'SUPER_ADMIN') {
        router.replace('/(super-admin)' as any);
      }
       else {
        router.replace('/(user)/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  const handleContactAdmin = () => {
    console.log('Contact Admin');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>

          {/* Header / Branding */}
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <Feather name="share-2" size={24} color={COLORS.orange} />
            </View>
            <Text style={styles.appName}>Binjwa</Text>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.subtitleText}>Sign in to manage your campaigns</Text>
          </View>

          {/* Login Card */}
          <View style={styles.cardContainer}>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <AuthInput
              label="Email Address"
              placeholder="write your mail"
              value={email}
              onChangeText={setEmail}
              iconName="mail"
            />

            <AuthInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              iconName="lock"
              secureTextEntry={true}
            />

            <RememberMe
              checked={rememberMe}
              onChange={setRememberMe}
              onForgotPassword={handleForgotPassword}
            />

            <View style={styles.buttonContainer}>
              <AuthButton title="Sign In" onPress={handleSignIn} />
            </View>

            <View style={styles.bottomTextContainer}>
              <Text style={styles.bottomText}>Don't have an account? </Text>
              <Pressable onPress={() => router.replace('/(auth)/register')} hitSlop={8}>
                <Text style={styles.contactAdmin}>Sign Up</Text>
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
  },
  container: {
    flex: 1,
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
  welcomeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
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
  }
});
