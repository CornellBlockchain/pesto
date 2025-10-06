import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants';
import { MainTabParamList } from '../types';
import { HomeNavigator } from './HomeNavigator';
import { AssetsNavigator } from './AssetsNavigator';
import { HistoryNavigator } from './HistoryNavigator';
import { ProfileNavigator } from './ProfileNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Assets':
              iconName = focused ? 'remove-circle' : 'remove-circle-outline';
              break;
            case 'History':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.text.primary,
        tabBarInactiveTintColor: theme.colors.text.tertiary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.light,
          borderTopWidth: 1,
          height: theme.spacing.component.navigation.tabBarHeight,
          paddingBottom: 16,
          paddingTop: 12,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeNavigator}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen 
        name="Assets" 
        component={AssetsNavigator}
        options={{ tabBarLabel: 'Assets' }}
      />
      <Tab.Screen 
        name="History" 
        component={HistoryNavigator}
        options={{ tabBarLabel: 'History' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};
