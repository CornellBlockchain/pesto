import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HistoryStackParamList } from '../types';
import { HistoryScreen } from '../screens/main/HistoryScreen';
import { TransactionDetailScreen } from '../screens/main/TransactionDetailScreen';
import { theme } from '../constants';

const Stack = createStackNavigator<HistoryStackParamList>();

export const HistoryNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="HistoryScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.background.primary },
        headerStyle: {
          backgroundColor: theme.colors.background.primary,
          shadowColor: 'transparent',
        },
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          ...theme.typography.textStyles.h4,
          color: theme.colors.text.primary,
        },
      }}
    >
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      <Stack.Screen 
        name="TransactionDetail" 
        component={TransactionDetailScreen}
        options={{
          headerShown: true,
          title: 'Transaction Details',
        }}
      />
    </Stack.Navigator>
  );
};
