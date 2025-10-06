import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { BottomSheet, Button, Overlay, TextInput, Avatar } from '../../components';
import { useAptos } from '../../hooks/useAptos';
import { useContacts } from '../../hooks/useContacts';
import { theme } from '../../constants';
import type { HomeStackParamList, AptosFriend } from '../../types';

const OCTA_DECIMALS = 100000000;

export const SendMoneyScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'SendMoney'>>();
  const navigation = useNavigation();
  const { friends } = useContacts();
  const { sendMoney, isLoading, canSendToAddress } = useAptos();

  const preselectedFriend = route.params?.contact;

  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successSheetVisible, setSuccessSheetVisible] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [lastSentAmount, setLastSentAmount] = useState<number | null>(null);

  const selectedFriend: AptosFriend | undefined = useMemo(() => {
    if (preselectedFriend) {
      return preselectedFriend;
    }
    return friends.length > 0 ? friends[0] : undefined;
  }, [friends, preselectedFriend]);

  const handleAmountChange = (value: string) => {
    const sanitized = value.replace(/[^0-9.]/g, '');
    const parts = sanitized.split('.');
    if (parts.length > 2) {
      setAmount(`${parts[0]}.${parts.slice(1).join('')}`);
      return;
    }
    if (parts[1]?.length > 8) {
      parts[1] = parts[1].slice(0, 8);
    }
    setAmount(parts.join('.'));
  };

  const parsedAmount = parseFloat(amount) || 0;
  const isAmountValid = parsedAmount > 0;
  const canSend = selectedFriend && canSendToAddress(selectedFriend.aptosAddress);
  const isSubmitDisabled = !canSend || !isAmountValid || isLoading;

  const handleSend = async () => {
    if (!selectedFriend) {
      setErrorMessage('Select a friend before sending funds.');
      return;
    }

    if (!isAmountValid) {
      setErrorMessage('Enter a valid amount to continue.');
      return;
    }

    try {
      const hash = await sendMoney(selectedFriend, parsedAmount, note);
      setTransactionHash(hash);
      setLastSentAmount(parsedAmount);
      setSuccessSheetVisible(true);
      setAmount('');
      setNote('');
    } catch (error: any) {
      const message = error?.message ?? 'Something went wrong while sending funds.';
      setErrorMessage(message);
    }
  };

  const handleOpenExplorer = () => {
    if (!transactionHash) return;
    const explorerUrl = `https://explorer.aptos.dev/txn/${transactionHash}?network=testnet`;
    Linking.openURL(explorerUrl).catch(() => {
      Alert.alert('Unable to open explorer');
    });
  };

  const handleDismissError = () => setErrorMessage(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pay</Text>
        <Text style={styles.subtitle}>Send money to verified friends</Text>
      </View>

      <View style={styles.card}>
        {selectedFriend ? (
          <View style={styles.friendHeader}>
            <Avatar name={selectedFriend.name} size="medium" uri={selectedFriend.avatar}
              backgroundColor={theme.colors.primary.green}
            />
            <View style={styles.friendMeta}>
              <Text style={styles.friendName}>{selectedFriend.name}</Text>
              <Text style={styles.friendHandle}>@{selectedFriend.username}</Text>
              <Text style={styles.friendAddress} numberOfLines={1}>
                {selectedFriend.aptosAddress}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={styles.emptyState}>
            Add an Aptos friend from your contacts to start sending money.
          </Text>
        )}

        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={handleAmountChange}
            placeholder="0.00"
            keyboardType="decimal-pad"
            leftIcon="wallet"
          />
          <Text style={styles.hint}>Funds are sent in APT (1 APT = {OCTA_DECIMALS.toLocaleString()} Octas)</Text>
        </View>

        <View style={styles.noteSection}>
          <Text style={styles.amountLabel}>Add a note</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Add a message"
            multiline
            numberOfLines={3}
            leftIcon="chatbubble-ellipses"
          />
        </View>

        <Button
          title="Send"
          onPress={handleSend}
          fullWidth
          disabled={isSubmitDisabled}
          loading={isLoading}
        />
      </View>

      <Overlay
        visible={isLoading}
        type="loading"
        message="Submitting transaction"
      />

      <BottomSheet
        visible={successSheetVisible}
        onClose={() => setSuccessSheetVisible(false)}
        title="Transfer complete"
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetText}>
            You successfully sent {(lastSentAmount ?? 0).toFixed(2)} APT.
          </Text>
          {transactionHash && (
            <Text style={styles.sheetHash} numberOfLines={1}>
              Hash: {transactionHash}
            </Text>
          )}
          <View style={styles.sheetActions}>
            <Button
              title="View on Explorer"
              variant="secondary"
              onPress={handleOpenExplorer}
              fullWidth
            />
            <Button
              title="Done"
              onPress={() => {
                setSuccessSheetVisible(false);
                navigation.goBack();
              }}
              fullWidth
            />
          </View>
        </View>
      </BottomSheet>

      <BottomSheet
        visible={Boolean(errorMessage)}
        onClose={handleDismissError}
        title="Unable to send"
      >
        <View style={styles.sheetContent}>
          <Text style={styles.errorText}>{errorMessage}</Text>
          <Button title="Dismiss" onPress={handleDismissError} fullWidth />
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    paddingHorizontal: theme.spacing.screen.horizontal,
  },
  header: {
    paddingVertical: theme.spacing['2xl'],
    gap: theme.spacing.sm,
  },
  title: {
    ...theme.typography.textStyles.h2,
    color: theme.colors.text.primary,
  },
  subtitle: {
    ...theme.typography.textStyles.body,
    color: theme.colors.text.tertiary,
  },
  card: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.spacing.dimensions.card.borderRadius,
    padding: theme.spacing.component.card.padding,
    shadowColor: theme.colors.shadow.dark,
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
    gap: theme.spacing['2xl'],
  },
  friendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  friendMeta: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  friendName: {
    ...theme.typography.textStyles.h3,
    color: theme.colors.text.primary,
  },
  friendHandle: {
    ...theme.typography.textStyles.caption,
    color: theme.colors.text.secondary,
  },
  friendAddress: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.tertiary,
  },
  emptyState: {
    ...theme.typography.textStyles.body,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
  },
  amountSection: {
    gap: theme.spacing.md,
  },
  noteSection: {
    gap: theme.spacing.md,
  },
  amountLabel: {
    ...theme.typography.textStyles.captionMedium,
    color: theme.colors.text.secondary,
  },
  hint: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.tertiary,
  },
  sheetContent: {
    gap: theme.spacing.lg,
  },
  sheetText: {
    ...theme.typography.textStyles.body,
    color: theme.colors.text.primary,
  },
  sheetHash: {
    ...theme.typography.textStyles.small,
    color: theme.colors.text.secondary,
  },
  sheetActions: {
    gap: theme.spacing.md,
  },
  errorText: {
    ...theme.typography.textStyles.body,
    color: theme.colors.status.error,
  },
});
