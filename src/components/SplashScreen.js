import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="heart" size={80} color="#fff" />
        <Text style={styles.appName}>Mocho Health</Text>
        <Text style={styles.tagline}>Empowering Young Women</Text>
      </View>
      
      <View style={styles.loadingContainer}>
        <Ionicons name="ellipsis-horizontal" size={24} color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.primary,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 80,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    opacity: 0.9,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    opacity: 0.8,
  },
});