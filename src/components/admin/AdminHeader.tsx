import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { DrawerActions, useNavigation } from "expo-router/react-navigation";
import { authService } from '../../services/authService';

interface AdminHeaderProps {
  title: string;
}

export function AdminHeader({ title }: AdminHeaderProps) {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Admin');

  useEffect(() => {
    authService.getMe().then((user: any) => {
      if (user && user.name) {
        setUsername(user.name);
      }
    });
  }, []);

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftSection}>
          <Pressable onPress={openDrawer} style={styles.iconButton}>
            <Feather name="menu" size={24} color={COLORS.gray} />
          </Pressable>
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.rightSection}>
          <Pressable style={styles.iconButton}>
            <Feather name="bell" size={22} color={COLORS.gray} />
          </Pressable>
          
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{username.charAt(0).toUpperCase()}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#111111',
  },
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#111111',
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 8,
    marginRight: 8,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
  },
  avatarText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
