import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeStackParamList } from '../types';
import { HomeScreen } from '../screens/main/HomeScreen';
import { PayRequestScreen } from '../screens/main/PayRequestScreen';
import { SendMoneyScreen } from '../screens/main/SendMoneyScreen';
import { RequestMoneyScreen } from '../screens/main/RequestMoneyScreen';

const Stack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen 
        name="PayRequest" 
        component={PayRequestScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="SendMoney" 
        component={SendMoneyScreen}
        options={{
          headerShown: true,
          title: 'Send Money',
        }}
      />
      <Stack.Screen 
        name="RequestMoney" 
        component={RequestMoneyScreen}
        options={{
          headerShown: true,
          title: 'Request Money',
        }}
      />
    </Stack.Navigator>
  );
};
