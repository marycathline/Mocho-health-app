import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function HomeScreen({ navigation }) {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const quickActions = [
    {
      title: 'Log Period',
      icon: 'calendar',
      color: '#E91E63',
      screen: 'Cycle Tracker',
    },
    {
      title: 'Emergency Help',
      icon: 'medical',
      color: '#F44336',
      screen: 'Help',
    },
    {
      title: 'Health Tips',
      icon: 'library',
      color: theme.primary,
      screen: 'Library',
    },
    {
      title: 'Chat Support',
      icon: 'people',
      color: '#4CAF50',
      screen: 'Community',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to Mocho Health</Text>
        <Text style={styles.dateText}>{currentDate}</Text>
      </View>

      <View style={styles.motivationCard}>
        <Ionicons name="heart" size={24} color="#E91E63" />
        <Text style={styles.motivationText}>
          "Taking care of your health is an investment in your future."
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickActionCard, { borderLeftColor: action.color }]}
              onPress={() => navigation.navigate(action.screen)}
            >
              <Ionicons name={action.icon} size={24} color={action.color} />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Health Tip</Text>
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={20} color={theme.primary} />
          <Text style={styles.tipText}>
            Drink at least 8 glasses of water daily to stay hydrated and support your overall health.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Health Journey</Text>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Days tracked</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Articles read</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Conversations</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    padding: 20,
    backgroundColor: theme.surface,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: theme.textSecondary,
  },
  motivationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  motivationText: {
    fontSize: 16,
    color: theme.text,
    fontStyle: 'italic',
    marginLeft: 10,
    flex: 1,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 10,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.text,
    marginLeft: 10,
    flex: 1,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipText: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 10,
    flex: 1,
    lineHeight: 22,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    marginTop: 2,
  },
});