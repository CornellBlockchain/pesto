import React, { useState, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '../../components';
import { theme } from '../../constants';
import { useDemoData } from '../../hooks/useDemoData';
import { HomeStackParamList } from '../../types';
import { RouteProp } from '@react-navigation/native';

export const PayRequestScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<HomeStackParamList, 'PayRequest'>>();
  const { friends } = useDemoData();
  const [message, setMessage] = useState('');

  const friend = useMemo(() => {
    if (route.params?.contact) {
      return route.params.contact;
    }
    return friends[0];
  }, [friends, route.params]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="call" size={20} color={theme.colors.text.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, styles.trailingAction]}>
            <Ionicons name="ellipsis-horizontal" size={20} color={theme.colors.text.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {friend?.avatar ? (
          <Image source={{ uri: friend.avatar }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarInitials}>{friend?.name?.[0] ?? 'P'}</Text>
          </View>
        )}
        <Text style={styles.name}>{friend?.name ?? 'Friend'}</Text>
        <Text style={styles.handle}>{friend?.username ?? '@friend'}</Text>
        <Text style={styles.amount}>$0</Text>

        <View style={styles.messageWrapper}>
          <View style={styles.messageActions}>
            <Ionicons name="mic" size={20} color={theme.colors.text.secondary} />
            <Ionicons name="happy-outline" size={20} color={theme.colors.text.secondary} />
            <Ionicons name="image-outline" size={20} color={theme.colors.text.secondary} />
          </View>
          <TextInput
            placeholder="Attach a Message"
            placeholderTextColor={theme.colors.text.placeholder}
            value={message}
            onChangeText={setMessage}
            multiline
            style={styles.messageInput}
          />
        </View>

        <View style={styles.buttonsRow}>
          <View style={[styles.buttonItem, styles.buttonSpacing]}>
            <Button title="Pay" onPress={() => {}} fullWidth />
          </View>
          <View style={styles.buttonItem}>
            <Button title="Request" onPress={() => {}} fullWidth variant="secondary" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    paddingHorizontal: theme.spacing.screen.horizontal,
    paddingTop: theme.spacing['2xl'],
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing['3xl'],
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background.secondary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trailingAction: {
    marginLeft: theme.spacing.md,
  },
  content: {
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: theme.colors.primary.green,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing['2xl'],
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: theme.spacing['2xl'],
  },
  avatarInitials: {
    ...theme.typography.textStyles.h1,
    color: theme.colors.text.white,
  },
  name: {
    ...theme.typography.textStyles.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  handle: {
    ...theme.typography.textStyles.transactionDescription,
    color: theme.colors.text.tertiary,
    marginBottom: theme.spacing['2xl'],
  },
  amount: {
    ...theme.typography.textStyles.assetValueLarge,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing['2xl'],
  },
  messageWrapper: {
    width: '100%',
    borderRadius: theme.spacing.borderRadius.xl,
    backgroundColor: theme.colors.background.secondary,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing['3xl'],
  },
  messageActions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  messageInput: {
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.spacing.dimensions.input.borderRadius,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    minHeight: 52,
    ...theme.typography.textStyles.body,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonItem: {
    flex: 1,
  },
  buttonSpacing: {
    marginRight: theme.spacing.md,
  },
});

