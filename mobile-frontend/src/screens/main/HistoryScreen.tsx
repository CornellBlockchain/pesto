import React, { useMemo } from 'react';
<<<<<<< HEAD
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAptos } from '../../hooks/useAptos';
import { useContacts } from '../../hooks/useContacts';
import { ListItem, Overlay } from '../../components';
import { theme } from '../../constants';
import type { Transaction } from '../../types';

export const HistoryScreen: React.FC = () => {
  const { transactions, isLoading } = useAptos();
  const { friends } = useContacts();

  const orderedTransactions = useMemo(
    () => [...transactions].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    [transactions]
  );

  const resolveLabel = (transaction: Transaction) => {
    const match = friends.find(friend => friend.aptosAddress === transaction.to || friend.aptosAddress === transaction.from);
    if (match) {
      return match.name;
    }
    return transaction.type === 'send' ? shorten(transaction.to) : shorten(transaction.from);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>History</Text>
        <Text style={styles.subtitle}>Track the latest activity on your Aptos wallet.</Text>

        <View style={styles.list}>
          {orderedTransactions.length === 0 ? (
            <Text style={styles.emptyState}>No activity yet. Once you send or receive funds they will appear here.</Text>
          ) : (
            orderedTransactions.map(transaction => (
              <ListItem
                key={transaction.id}
                title={resolveLabel(transaction)}
                subtitle={`${timeAgo(transaction.timestamp)} • ${transaction.amount.toFixed(2)} APT`}
                showChevron
              />
            ))
          )}
        </View>
      </ScrollView>

      <Overlay visible={isLoading} type="loading" message="Fetching activity" />
=======
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { theme } from '../../constants';
import { useDemoData } from '../../hooks/useDemoData';
import { Transaction } from '../../types';

export const HistoryScreen: React.FC = () => {
  const { transactions, friends } = useDemoData();
  const historyItems = useMemo(() => transactions, [transactions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>History</Text>

        {historyItems.map(item => {
          const counterparty = item.toUser || item.fromUser || friends.find(friend => friend.aptosAddress === item.to || friend.aptosAddress === item.from);
          const isRequest = item.type === 'request';
          const isPositive = item.type === 'receive';
          const description = formatDescription(item.type, item.amount, item.asset);

          return (
            <View key={item.id} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{ uri: counterparty?.avatar ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=60' }}
                    style={styles.avatar}
                  />
                  <View style={[styles.statusDot, isPositive && styles.positiveDot]} />
                </View>
                <View>
                  <Text style={styles.historyName}>{counterparty?.name ?? 'Unknown user'}</Text>
                  <Text style={styles.historyDescription}>{description}</Text>
                </View>
              </View>

              {isRequest ? (
                <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              ) : (
                <View style={[styles.historyPreview, isPositive && styles.incomingPreview]}>
                  <Text style={styles.previewAmount}>${item.amount}</Text>
                  <Text style={styles.previewAsset}>{item.asset}</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
    </SafeAreaView>
  );
};

<<<<<<< HEAD
const shorten = (value: string, keep: number = 4) => {
  if (!value) return '';
  return `${value.slice(0, keep)}…${value.slice(-keep)}`;
};

const timeAgo = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  if (minutes < 60) {
    return `${Math.max(minutes, 1)}m ago`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
=======
const formatDescription = (type: Transaction['type'], amount: number, asset: string) => {
  if (type === 'send') {
    return `successfully sent $${amount}`;
  }
  if (type === 'receive') {
    return `sent you $${amount}`;
  }
  return `requested $${amount}`;
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
<<<<<<< HEAD
  content: {
=======
  scrollContent: {
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing['6xl'],
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
    paddingHorizontal: theme.spacing.screen.horizontal,
    paddingVertical: theme.spacing['2xl'],
    gap: theme.spacing['2xl'],
  },
  title: {
    ...theme.typography.textStyles.h2,
    color: theme.colors.text.primary,
<<<<<<< HEAD
=======
    marginBottom: theme.spacing['3xl'],
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: theme.spacing.lg,
  },
  avatarWrapper: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  statusDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accent.red,
    right: 0,
    bottom: 0,
    borderWidth: 2,
    borderColor: theme.colors.background.primary,
  },
  positiveDot: {
    backgroundColor: theme.colors.accent.green,
  },
  historyName: {
    ...theme.typography.textStyles.transactionName,
    color: theme.colors.text.primary,
  },
  historyDescription: {
    ...theme.typography.textStyles.transactionDescription,
    color: theme.colors.text.tertiary,
<<<<<<< HEAD
  },
  list: {
    gap: theme.spacing.sm,
  },
  emptyState: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.tertiary,
=======
    marginTop: 4,
  },
  sendButton: {
    backgroundColor: theme.colors.button.primary,
    borderRadius: theme.spacing.borderRadius.lg,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    ...theme.typography.textStyles.button,
    color: theme.colors.text.white,
  },
  historyPreview: {
    minWidth: 72,
    borderRadius: theme.spacing.borderRadius.lg,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  incomingPreview: {
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
  },
  previewAmount: {
    ...theme.typography.textStyles.button,
    color: theme.colors.text.primary,
  },
  previewAsset: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.secondary,
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
  },
});

