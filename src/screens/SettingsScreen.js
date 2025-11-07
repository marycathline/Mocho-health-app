import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { theme } from '../theme/colors';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.option}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} thumbColor={theme.primary} />
      </View>

      <View style={styles.option}>
        <Text style={styles.label}>Notifications</Text>
        <Switch value={notifications} onValueChange={setNotifications} thumbColor={theme.primary} />
      </View>

      <Text style={styles.note}>More settings coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 20
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  label: {
    fontSize: 16,
    color: '#333'
  },
  note: {
    marginTop: 40,
    color: '#777',
    textAlign: 'center'
  }
});
