import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CycleTrackerScreen from '../screens/CycleTrackerScreen';
import LibraryScreen from '../screens/LibraryScreen';
import HelpScreen from '../screens/HelpScreen';
import CommunityScreen from '../screens/CommunityScreen';

import { theme } from '../theme/colors';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Cycle Tracker') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'Library') {
              iconName = focused ? 'library' : 'library-outline';
            } else if (route.name === 'Help') {
              iconName = focused ? 'medical' : 'medical-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'people' : 'people-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: theme.primary,
            borderTopWidth: 1,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: theme.primary,
          },
          headerTintColor: theme.surface,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Mocho Health' }}
        />
        <Tab.Screen 
          name="Cycle Tracker" 
          component={CycleTrackerScreen}
          options={{ title: 'My Cycle' }}
        />
        <Tab.Screen 
          name="Library" 
          component={LibraryScreen}
          options={{ title: 'Health Library' }}
        />
        <Tab.Screen 
          name="Help" 
          component={HelpScreen}
          options={{ title: 'Emergency Help' }}
        />
        <Tab.Screen 
          name="Community" 
          component={CommunityScreen}
          options={{ title: 'Community' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

