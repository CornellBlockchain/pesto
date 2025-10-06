import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AssetsStackParamList } from '../types';
import { AssetsScreen } from '../screens/main/AssetsScreen';
import { AssetDetailScreen } from '../screens/main/AssetDetailScreen';
import { AddAssetScreen } from '../screens/main/AddAssetScreen';

const Stack = createStackNavigator<AssetsStackParamList>();

export const AssetsNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="AssetsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="AssetsScreen" component={AssetsScreen} />
      <Stack.Screen 
        name="AssetDetail" 
        component={AssetDetailScreen}
        options={{
          headerShown: true,
          title: 'Asset Details',
        }}
      />
      <Stack.Screen 
        name="AddAsset" 
        component={AddAssetScreen}
        options={{
          headerShown: true,
          title: 'Add Asset',
        }}
      />
    </Stack.Navigator>
  );
};

