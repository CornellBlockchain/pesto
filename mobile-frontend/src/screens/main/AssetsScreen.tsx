<<<<<<< HEAD
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
=======
import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
>>>>>>> 7250a99f00865d414730225e01c89ad1ec5dc9e0
import { theme } from '../../constants';
import { useAuth } from '../../hooks/useAuth';
import { useDemoData } from '../../hooks/useDemoData';
import { useAptos } from '../../hooks/useAptos';

const TABS = ['Assets', 'Graphs', 'History'] as const;

export const AssetsScreen: React.FC = () => {
  const { user } = useAuth();
  const { assets, assetSummary, promoCards, spotlightAssets } = useDemoData();
  const {
    networkInfo,
    aptUsdPrice,
    refreshNetwork,
    refreshMarketData,
  } = useAptos();

  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Assets');

  useEffect(() => {
    refreshNetwork();
    refreshMarketData();
  }, [refreshMarketData, refreshNetwork]);

  const primaryCard = promoCards[0];

  const summaryMetrics = useMemo(() => {
    if (!assetSummary) return null;
    return [
      {
        id: 'total-assets',
        label: 'Total Assets',
        value: `$${assetSummary.totalAssetsUsd.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        helper: `+${Math.round(assetSummary.monthOverMonthChange * 100)}% month over month`,
      },
      {
        id: 'aptos-points',
        label: 'Aptos',
        value: assetSummary.aptBalance.toLocaleString(),
        helper: `+${Math.round(assetSummary.aptosPointsChange * 100)}% month over month`,
      },
    ];
  }, [assetSummary]);

  const accentColorMap: Record<string, string> = {
    APT: '#000000',
    USDC: '#2775CA',
    USDT: '#26A17B',
    wBTC: '#F7931A',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>Pesto</Text>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.headerAvatar} />
          ) : null}
        </View>

        <View style={styles.tabRow}>
          {TABS.map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabChip, activeTab === tab && styles.activeTabChip]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.tabLabel, activeTab === tab && styles.activeTabLabel]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {primaryCard && (
          <View style={styles.heroCard}>
            <View style={styles.heroTextBlock}>
              <Text style={styles.heroTitle}>{primaryCard.title}</Text>
              <Text style={styles.heroSubtitle}>{primaryCard.subtitle}</Text>
              <View style={styles.paginationDots}>
                {promoCards.map(card => (
                  <View
                    key={card.id}
                    style={[styles.dot, card.id === primaryCard.id ? styles.activeDot : null]}
                  />
                ))}
              </View>
            </View>
            <Image source={{ uri: primaryCard.image }} style={styles.heroImage} />
          </View>
        )}

        <View style={styles.metricWrapper}>
          {summaryMetrics?.map((metric, idx) => (
            <View
              key={metric.id}
              style={[styles.metricCard, idx === summaryMetrics.length - 1 && styles.lastMetricCard]}
            >
              <Text style={styles.metricLabel}>{metric.label}</Text>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricHelper}>{metric.helper}</Text>
            </View>
          ))}
        </View>

        {networkInfo && (
          <View style={styles.networkCard}>
            <Text style={styles.assetCardTitle}>Aptos Mainnet</Text>
            <View style={styles.networkRow}>
              <View style={styles.networkMetric}>
                <Text style={styles.networkLabel}>Epoch</Text>
                <Text style={styles.networkValue}>{networkInfo.epoch}</Text>
              </View>
              <View style={styles.networkMetric}>
                <Text style={styles.networkLabel}>Ledger Version</Text>
                <Text style={styles.networkValue}>{Number(networkInfo.ledger_version).toLocaleString()}</Text>
              </View>
              <View style={styles.networkMetric}>
                <Text style={styles.networkLabel}>APT Price</Text>
                <Text style={styles.networkValue}>
                  {aptUsdPrice ? `$${aptUsdPrice.toFixed(2)}` : '…'}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.assetCard}>
          <Text style={styles.assetCardTitle}>Asset Information</Text>
          {spotlightAssets.map((asset, index) => (
            <View
              key={asset.id}
              style={[styles.assetRow, index !== spotlightAssets.length - 1 && styles.assetDivider]}
            >
              <View style={[styles.assetBadge, { backgroundColor: asset.color }]} />
              <View style={styles.assetBody}>
                <Text style={styles.assetName}>{asset.name}</Text>
                <Text style={styles.assetAmount}>{asset.amountUsd}</Text>
              </View>
              <Text style={[styles.assetChange, asset.positive ? styles.positive : styles.negative]}>
                {asset.change}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.holdingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your assets</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <View style={styles.chevronButton}>
                <Text style={styles.chevronButtonText}>›</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.holdingsRow}>
            {assets.slice(0, 4).map(asset => (
              <View key={asset.id} style={styles.holdingItem}>
                <View
                  style={[
                    styles.holdingIcon,
                    styles.holdingShadow,
                    { backgroundColor: accentColorMap[asset.symbol] || theme.colors.text.primary },
                  ]}
                >
                  <Text style={styles.holdingSymbol}>{asset.symbol}</Text>
                </View>
                <Text style={styles.holdingLabel}>{asset.symbol}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    paddingTop: theme.spacing['3xl'],
    paddingBottom: theme.spacing['6xl'],
    paddingHorizontal: theme.spacing.screen.horizontal,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing['2xl'],
  },
  title: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing['3xl'],
  },
  tabChip: {
    paddingHorizontal: theme.spacing.dimensions.tab.paddingHorizontal,
    height: theme.spacing.dimensions.tab.height,
    borderRadius: theme.spacing.dimensions.tab.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.secondary,
    marginRight: theme.spacing.md,
  },
  activeTabChip: {
    backgroundColor: theme.colors.text.primary,
  },
  tabLabel: {
    ...theme.typography.textStyles.captionMedium,
    color: theme.colors.text.secondary,
  },
  activeTabLabel: {
    color: theme.colors.text.white,
  },
  heroCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.dimensions.card.borderRadius,
    padding: theme.spacing['2xl'],
    marginBottom: theme.spacing['3xl'],
    shadowColor: theme.colors.shadow.medium,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 5,
  },
  heroTextBlock: {
    flex: 1,
    paddingRight: theme.spacing.lg,
  },
  heroTitle: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.primary,
  },
  heroSubtitle: {
    ...theme.typography.textStyles.body,
    color: theme.colors.text.tertiary,
    marginTop: theme.spacing.sm,
  },
  heroImage: {
    width: 140,
    height: 120,
    borderRadius: theme.spacing.borderRadius.lg,
  },
  paginationDots: {
    flexDirection: 'row',
    marginTop: theme.spacing['2xl'],
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.border.light,
    marginRight: 6,
  },
  activeDot: {
    backgroundColor: theme.colors.text.primary,
    width: 16,
  },
  metricWrapper: {
    flexDirection: 'row',
    marginBottom: theme.spacing['3xl'],
  },
  metricCard: {
    flex: 1,
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.borderRadius.xl,
    padding: theme.spacing['2xl'],
    marginRight: theme.spacing.md,
    shadowColor: theme.colors.shadow.medium,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 4,
  },
  lastMetricCard: {
    marginRight: 0,
  },
  metricLabel: {
    ...theme.typography.textStyles.captionMedium,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing.sm,
  },
  metricValue: {
    ...theme.typography.textStyles.assetValue,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  metricHelper: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.tertiary,
  },
  networkCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.borderRadius.xl,
    padding: theme.spacing['2xl'],
    marginBottom: theme.spacing['3xl'],
    shadowColor: theme.colors.shadow.medium,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 14,
    elevation: 4,
  },
  networkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.lg,
  },
  networkMetric: {
    flex: 1,
  },
  networkLabel: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.tertiary,
  },
  networkValue: {
    ...theme.typography.textStyles.bodyMedium,
    color: theme.colors.text.primary,
    marginTop: 4,
  },
  assetCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.spacing.borderRadius.xl,
    padding: theme.spacing['2xl'],
    shadowColor: theme.colors.shadow.medium,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 4,
  },
  assetCardTitle: {
    ...theme.typography.textStyles.h4,
    color: theme.colors.text.primary,
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.lg,
  },
  assetDivider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  assetBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: theme.spacing.lg,
  },
  assetBody: {
    flex: 1,
  },
  assetName: {
    ...theme.typography.textStyles.transactionName,
    color: theme.colors.text.primary,
  },
  assetAmount: {
    ...theme.typography.textStyles.body,
    color: theme.colors.text.tertiary,
    marginTop: 2,
  },
  assetChange: {
    ...theme.typography.textStyles.captionMedium,
  },
  positive: {
    color: theme.colors.accent.green,
  },
  negative: {
    color: theme.colors.accent.red,
  },
  holdingsSection: {
    marginTop: theme.spacing['3xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    ...theme.typography.textStyles.h3,
    color: theme.colors.text.primary,
  },
  chevronButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronButtonText: {
    ...theme.typography.textStyles.h4,
    color: theme.colors.text.secondary,
  },
  holdingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  holdingItem: {
    alignItems: 'center',
    flex: 1,
  },
  holdingIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  holdingShadow: {
    shadowColor: theme.colors.shadow.medium,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  holdingSymbol: {
    color: theme.colors.text.white,
    fontWeight: '700',
    fontSize: 16,
  },
  holdingLabel: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.secondary,
  },
});
