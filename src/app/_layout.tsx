import { Stack, router, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { authService } from '../services/authService';
import { View, ActivityIndicator } from 'react-native';

export default function RootLayout() {
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await authService.getToken();
        const role = await authService.getRole();
        
        const inAuthGroup = segments[0] === '(auth)';
        const inAdminGroup = segments[0] === '(admin)';
        const inUserGroup = segments[0] === '(user)';

        if (!token) {
          if (!inAuthGroup) {
            router.replace('/(auth)/login');
          }
        } else {
          // Token exists, route based on role
          if (role === 'SUPER_ADMIN' || role === 'ADMIN') {
             if (!inAdminGroup) {
               router.replace('/(admin)/dashboard');
             }
          } else {
             if (!inUserGroup) {
               router.replace('/(user)/dashboard');
             }
          }
        }
      } catch (err) {
        // Fallback
        router.replace('/(auth)/login');
      } finally {
        setIsReady(true);
      }
    };

    checkAuth();
  }, [segments]);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0A0A0A' }}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <Stack
     screenOptions={{
      headerShown: false,
     }}
    />
  );
}

