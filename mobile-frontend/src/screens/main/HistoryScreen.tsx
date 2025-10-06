import React, { useMemo } from 'react';
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
    </SafeAreaView>
  );
};

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
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  content: {
    paddingHorizontal: theme.spacing.screen.horizontal,
    paddingVertical: theme.spacing['2xl'],
    gap: theme.spacing['2xl'],
  },
  title: {
    ...theme.typography.textStyles.h2,
    color: theme.colors.text.primary,
  },
  subtitle: {
    ...theme.typography.textStyles.body,
    color: theme.colors.text.tertiary,
  },
  list: {
    gap: theme.spacing.sm,
  },
  emptyState: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.tertiary,
  },
});

