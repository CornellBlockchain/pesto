import React, { useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Button, Card, ListItem } from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { useAptos } from '../../hooks/useAptos';
import { useContacts } from '../../hooks/useContacts';
import { theme } from '../../constants';
import type { HomeStackParamList, Transaction } from '../../types';
import type { StackNavigationProp } from '@react-navigation/stack';

const MAX_RECENT_TRANSACTIONS = 5;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const { user, logout } = useAuth();
  const { assets, transactions, isLoading } = useAptos();
  const { friends } = useContacts();

  const topAssets = useMemo(() => assets.slice(0, 4), [assets]);
  const recentTransactions = useMemo(
    () => transactions.slice(0, MAX_RECENT_TRANSACTIONS),
    [transactions]
  );

  const resolveTransactionLabel = (transaction: Transaction) => {
    const friendMatch = friends.find(friend => friend.aptosAddress === transaction.to || friend.aptosAddress === transaction.from);
    if (friendMatch) {
      return friendMatch.name;
    }
    return transaction.type === 'send' ? shorten(transaction.to) : shorten(transaction.from);
  };

  const resolveTransactionSubtitle = (transaction: Transaction) => {
    const verb = transaction.type === 'send' ? 'Sent' : transaction.type === 'request' ? 'Requested' : 'Received';
    const amount = transaction.amount.toFixed(2);
    return `${verb} ${amount} APT`;
  };

  const handleNavigateToSend = () => {
    navigation.navigate('SendMoney', {});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back</Text>
            <Text style={styles.title}>Pesto</Text>
          </View>
          <TouchableOpacity onPress={logout} activeOpacity={0.8}>
            <Avatar name={user?.name ?? 'User'} size="small" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={theme.colors.text.tertiary} />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </View>

        <Card>
          <View style={styles.bannerContent}>
            <View style={styles.bannerCopy}>
              <Text style={styles.bannerTitle}>Move money instantly</Text>
              <Text style={styles.bannerSubtitle}>Secure Aptos payments with compliance ready contacts.</Text>
            </View>
            <View style={styles.bannerIcon}>
              <Ionicons name="wallet" size={48} color={theme.colors.primary.green} />
            </View>
          </View>
        </Card>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your assets</Text>
          <TouchableOpacity onPress={() => navigation.getParent()?.navigate('Assets' as never)}>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.assetsRow}>
          {topAssets.length === 0 && (
            <Text style={styles.emptyState}>Connect your Aptos account to see balances.</Text>
          )}
          {topAssets.map(asset => (
            <View key={asset.id} style={styles.assetItem}>
              <View style={styles.assetIcon}>
                <Text style={styles.assetInitials}>{asset.symbol.slice(0, 3)}</Text>
              </View>
              <Text style={styles.assetSymbol}>{asset.symbol}</Text>
              <Text style={styles.assetBalance}>{asset.balance.toFixed(2)} APT</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>History</Text>
          <TouchableOpacity onPress={() => navigation.getParent()?.navigate('History' as never)}>
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsContainer}>
          {recentTransactions.length === 0 ? (
            <Text style={styles.emptyState}>No transactions yet. Send money to a verified friend to get started.</Text>
          ) : (
            recentTransactions.map(transaction => (
              <ListItem
                key={transaction.id}
                title={resolveTransactionLabel(transaction)}
                subtitle={`${timeAgo(transaction.timestamp)} • ${resolveTransactionSubtitle(transaction)}`}
                rightIcon={transaction.type === 'request' ? 'arrow-up-circle' : undefined}
                onPress={() => navigation.navigate('PayRequest', { contact: undefined })}
              />
            ))
          )}
        </View>

        <Button
          title="Send money"
          icon="paper-plane"
          onPress={handleNavigateToSend}
          fullWidth
          loading={isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const shorten = (value: string, keep: number = 4) => {
  if (!value) return '';
  return `${value.slice(0, keep)}…${value.slice(-keep)}`;
};

const timeAgo = (timestamp: Date) => {
  const now = new Date();
  const diffMs = now.getTime() - timestamp.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    return `${diffDays}d ago`;
  }
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  const diffMinutes = Math.max(1, Math.floor(diffMs / (1000 * 60)));
  return `${diffMinutes}m ago`;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.screen.horizontal,
    paddingBottom: theme.spacing['3xl'],
    gap: theme.spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing['2xl'],
  },
  greeting: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.secondary,
  },
  title: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
  },
  searchBar: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.spacing.dimensions.input.borderRadius,
    paddingHorizontal: theme.spacing.component.input.paddingHorizontal,
    height: theme.spacing.dimensions.input.height,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  searchPlaceholder: {
    ...theme.typography.textStyles.input,
    color: theme.colors.text.placeholder,
  },
  bannerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  bannerCopy: {
    flex: 1,
    gap: theme.spacing.sm,
  },
  bannerTitle: {
    ...theme.typography.textStyles.h3,
    color: theme.colors.text.primary,
  },
  bannerSubtitle: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.secondary,
  },
  bannerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...theme.typography.textStyles.h4,
    color: theme.colors.text.primary,
  },
  assetsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.lg,
    flexWrap: 'wrap',
  },
  assetItem: {
    width: '47%',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.spacing.dimensions.card.borderRadius,
    padding: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  assetIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.primary.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetInitials: {
    ...theme.typography.textStyles.bodyMedium,
    color: theme.colors.text.white,
  },
  assetSymbol: {
    ...theme.typography.textStyles.captionMedium,
    color: theme.colors.text.secondary,
  },
  assetBalance: {
    ...theme.typography.textStyles.h4,
    color: theme.colors.text.primary,
  },
  transactionsContainer: {
    gap: theme.spacing.sm,
  },
  emptyState: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.tertiary,
  },
});
