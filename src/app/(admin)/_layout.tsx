import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { AdminDrawerContent } from '../../components/admin/AdminDrawer';

export default function AdminLayout() {
  return (
    <Drawer
      drawerContent={(props) => <AdminDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#111111',
          width: '80%', // Mobile-friendly width as requested
          maxWidth: 400,
        },
      }}
    >
      <Drawer.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Drawer.Screen name="team" options={{ title: 'Team Management' }} />
      <Drawer.Screen name="users" options={{ title: 'User Management' }} />
      <Drawer.Screen name="brands" options={{ title: 'Brand Management' }} />
      <Drawer.Screen name="social-accounts" options={{ title: 'Social Accounts' }} />
      <Drawer.Screen name="content-approval" options={{ title: 'Content Approval' }} />
      <Drawer.Screen name="content-library" options={{ title: 'Content Library' }} />
      <Drawer.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Drawer.Screen name="analytics" options={{ title: 'Analytics' }} />
      <Drawer.Screen name="reports" options={{ title: 'Client Reports' }} />
      <Drawer.Screen name="credits" options={{ title: 'Credits' }} />
      <Drawer.Screen name="tickets" options={{ title: 'Support Tickets' }} />
      <Drawer.Screen name="notifications" options={{ title: 'Notifications' }} />
      <Drawer.Screen name="sessions" options={{ title: 'User Sessions' }} />
      <Drawer.Screen name="activity" options={{ title: 'Activity Logs' }} />
      <Drawer.Screen name="settings" options={{ title: 'Workspace Settings' }} />
      <Drawer.Screen name="profile" options={{ title: 'Profile' }} />
    </Drawer>
  );
}
