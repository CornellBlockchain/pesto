import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileStackParamList } from '../types';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';
import { FriendsScreen } from '../screens/profile/FriendsScreen';
import { AddFriendScreen } from '../screens/profile/AddFriendScreen';
import { FriendDetailScreen } from '../screens/profile/FriendDetailScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#FFFFFF' },
      }}
    >
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'Settings',
        }}
      />
      <Stack.Screen 
        name="Friends" 
        component={FriendsScreen}
        options={{
          headerShown: true,
          title: 'Friends',
        }}
      />
      <Stack.Screen 
        name="AddFriend" 
        component={AddFriendScreen}
        options={{
          headerShown: true,
          title: 'Add Friend',
        }}
      />
      <Stack.Screen 
        name="FriendDetail" 
        component={FriendDetailScreen}
        options={{
          headerShown: true,
          title: 'Friend Details',
        }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{
          headerShown: true,
          title: 'Edit Profile',
        }}
      />
    </Stack.Navigator>
  );
};

