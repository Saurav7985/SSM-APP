import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { SettingsState } from '../../types/settings';

interface BillingSettingsProps {
  billing: SettingsState['billing'];
}

export default function BillingSettings({ billing }: BillingSettingsProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Billing</Text>
        <Text style={styles.subtitle}>Manage your subscription plan and billing information</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.planHeader}>
          <View>
            <Text style={styles.planTitle}>Current Plan</Text>
            <Text style={styles.planName}>{billing.plan}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{billing.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Next Billing Date</Text>
          <Text style={styles.detailValue}>{billing.nextBillingDate}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Method</Text>
          <View style={styles.paymentMethod}>
            <Feather name="credit-card" size={16} color={COLORS.gray} style={{ marginRight: 8 }} />
            <Text style={styles.detailValue}>•••• 4242</Text>
          </View>
        </View>

        <Pressable style={styles.manageBtn}>
          <Text style={styles.manageBtnText}>Manage Subscription</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.gray,
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  planTitle: {
    color: COLORS.gray,
    fontSize: 13,
    marginBottom: 4,
  },
  planName: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#222',
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabel: {
    color: COLORS.gray,
    fontSize: 14,
  },
  detailValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageBtn: {
    backgroundColor: '#222',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  manageBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  }
});
