import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function MOCHODashboardScreen() {
  const stats = [
    { label: 'Active Users', value: '1,247', icon: 'people', color: '#4CAF50' },
    { label: 'Health Articles Read', value: '3,892', icon: 'book', color: '#2196F3' },
    { label: 'Community Messages', value: '15,643', icon: 'chatbubbles', color: '#FF9800' },
    { label: 'Emergency Calls', value: '23', icon: 'call', color: '#F44336' },
  ];

  const recentActivity = [
    { type: 'user_join', message: 'New user registered from Mbita', time: '2 min ago' },
    { type: 'article_read', message: 'Prenatal Care article read 15 times', time: '5 min ago' },
    { type: 'emergency_call', message: 'Emergency call from Rusinga Island', time: '1 hour ago' },
    { type: 'community_post', message: 'New post in Pregnancy Support group', time: '2 hours ago' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="analytics" size={48} color={theme.primary} />
        <Text style={styles.headerTitle}>MOCHO Data Dashboard</Text>
        <Text style={styles.headerSubtitle}>Staff Analytics Portal</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Ionicons name={stat.icon} size={24} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityList}>
          {recentActivity.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons 
                  name={
                    activity.type === 'user_join' ? 'person-add' :
                    activity.type === 'article_read' ? 'book' :
                    activity.type === 'emergency_call' ? 'call' :
                    'chatbubble'
                  } 
                  size={16} 
                  color={theme.primary} 
                />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityMessage}>{activity.message}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="people" size={24} color="#fff" />
            <Text style={styles.actionText}>User Management</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="document-text" size={24} color="#fff" />
            <Text style={styles.actionText}>Content Review</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubbles" size={24} color="#fff" />
            <Text style={styles.actionText}>Moderate Chat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="bar-chart" size={24} color="#fff" />
            <Text style={styles.actionText}>View Reports</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Insights</Text>
        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>Most Popular Topics</Text>
          <View style={styles.topicList}>
            <View style={styles.topicItem}>
              <Text style={styles.topicName}>Family Planning</Text>
              <Text style={styles.topicCount}>342 views</Text>
            </View>
            <View style={styles.topicItem}>
              <Text style={styles.topicName}>Pregnancy Care</Text>
              <Text style={styles.topicCount}>298 views</Text>
            </View>
            <View style={styles.topicItem}>
              <Text style={styles.topicName}>Menstrual Health</Text>
              <Text style={styles.topicCount}>276 views</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.comingSoonCard}>
        <Ionicons name="construct" size={32} color={theme.primary} />
        <Text style={styles.comingSoonTitle}>Full Dashboard Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          • Detailed analytics and reporting{'\n'}
          • User engagement metrics{'\n'}
          • Health outcome tracking{'\n'}
          • Community moderation tools{'\n'}
          • Export capabilities{'\n'}
          • Real-time monitoring
        </Text>
        <Text style={styles.accessNote}>
          Note: This dashboard is intended for MOCHO staff and authorized personnel only.
        </Text>
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
    padding: 30,
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
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 5,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 5,
  },
  section: {
    margin: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
  },
  activityList: {
    backgroundColor: theme.surface,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.background,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: theme.text,
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: theme.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  insightCard: {
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
  },
  topicList: {
    paddingLeft: 10,
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  topicName: {
    fontSize: 14,
    color: theme.text,
  },
  topicCount: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '500',
  },
  comingSoonCard: {
    backgroundColor: theme.surface,
    margin: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.primary,
    borderStyle: 'dashed',
  },
  comingSoonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 15,
    marginBottom: 15,
  },
  comingSoonText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 15,
  },
  accessNote: {
    fontSize: 12,
    color: theme.primary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});