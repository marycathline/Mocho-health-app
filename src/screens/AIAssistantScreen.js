import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function AIAssistantScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="sparkles" size={48} color={theme.primary} />
        <Text style={styles.headerTitle}>AI Health Assistant</Text>
        <Text style={styles.headerSubtitle}>Coming Soon</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.featureCard}>
          <Ionicons name="medical" size={24} color="#4CAF50" />
          <Text style={styles.featureTitle}>Symptom Checker</Text>
          <Text style={styles.featureDescription}>
            Get preliminary health assessments and guidance on when to seek professional care.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Ionicons name="chatbubbles" size={24} color="#FF9800" />
          <Text style={styles.featureTitle}>24/7 Health Chat</Text>
          <Text style={styles.featureDescription}>
            Ask health questions anytime and get reliable, evidence-based answers.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Ionicons name="calendar" size={24} color="#E91E63" />
          <Text style={styles.featureTitle}>Personalized Reminders</Text>
          <Text style={styles.featureDescription}>
            Receive smart reminders for medications, appointments, and health checkups.
          </Text>
        </View>

        <View style={styles.featureCard}>
          <Ionicons name="analytics" size={24} color="#3F51B5" />
          <Text style={styles.featureTitle}>Health Insights</Text>
          <Text style={styles.featureDescription}>
            Get personalized health insights based on your cycle, symptoms, and wellness data.
          </Text>
        </View>

        <View style={styles.comingSoonCard}>
          <Ionicons name="construct" size={32} color={theme.primary} />
          <Text style={styles.comingSoonTitle}>Feature in Development</Text>
          <Text style={styles.comingSoonText}>
            Our AI Health Assistant is being developed to provide you with intelligent, 
            culturally-sensitive health support tailored specifically for young women in Kenya.
          </Text>
          <Text style={styles.launchText}>Expected Launch: Q2 2026</Text>
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
    padding: 40,
    backgroundColor: theme.surface,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 15,
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  featureCard: {
    backgroundColor: theme.surface,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 10,
    marginBottom: 10,
  },
  featureDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  comingSoonCard: {
    backgroundColor: theme.surface,
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 2,
    borderColor: theme.primary,
    borderStyle: 'dashed',
  },
  comingSoonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 15,
    marginBottom: 15,
  },
  comingSoonText: {
    fontSize: 16,
    color: theme.text,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  launchText: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: 'bold',
  },
});