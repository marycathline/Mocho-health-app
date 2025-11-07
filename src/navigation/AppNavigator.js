import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CycleTrackerScreen from '../screens/CycleTrackerScreen';
import LibraryScreen from '../screens/LibraryScreen';
import HelpScreen from '../screens/HelpScreen';
import CommunityScreen from '../screens/CommunityScreen';
import SignupScreen from '../screens/SignupScreen';
import PersonalDetailsScreen from '../screens/PersonalDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginScreen from '../screens/LoginScreen';

// Theme
import { theme } from '../theme/colors';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ navigation }) {
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(300)).current;

  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Overlay when menu is open */}
      {menuVisible && (
        <TouchableOpacity style={styles.overlay} onPress={toggleMenu} activeOpacity={1} />
      )}

      {/* Slide-in Drawer */}
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }],
            display: menuVisible ? 'flex' : 'none',
          },
        ]}
      >
        <Text style={styles.drawerTitle}>Menu</Text>

        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            navigation.navigate('Profile');
          }}
        >
          <Text style={styles.drawerItem}>👤 Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            navigation.navigate('Settings');
          }}
        >
          <Text style={styles.drawerItem}>⚙️ Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={[styles.drawerItem, { color: '#d9534f' }]}>🚪 Logout</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Bottom Tabs */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerRight: () => (
            <TouchableOpacity onPress={toggleMenu} style={{ marginRight: 20 }}>
              <Ionicons name="menu" size={26} color="#fff" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Cycle Tracker':
                iconName = focused ? 'calendar' : 'calendar-outline';
                break;
              case 'Library':
                iconName = focused ? 'book' : 'book-outline';
                break;
              case 'Help':
                iconName = focused ? 'medical' : 'medical-outline';
                break;
              case 'Community':
                iconName = focused ? 'people' : 'people-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.surface,
            borderTopColor: theme.primary,
            borderTopWidth: 1,
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
          headerStyle: { backgroundColor: theme.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold', fontSize: 18 },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Mocho Health' }} />
        <Tab.Screen name="Cycle Tracker" component={CycleTrackerScreen} options={{ title: 'My Cycle' }} />
        <Tab.Screen name="Library" component={LibraryScreen} options={{ title: 'Health Library' }} />
        <Tab.Screen name="Help" component={HelpScreen} options={{ title: 'Emergency Help' }} />
        <Tab.Screen name="Community" component={CommunityScreen} options={{ title: 'Community' }} />
      </Tab.Navigator>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignupScreen} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />

        {/* Main App */}
        <Stack.Screen name="MainApp" component={MainTabs} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 5,
  },
  drawer: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 230,
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    elevation: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 10,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 15,
  },
  drawerItem: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '500',
    color: '#333',
  },
});
