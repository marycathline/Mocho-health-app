import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function GamificationScreen() {
  const badges = [
    { name: 'Health Tracker', icon: 'calendar', color: '#4CAF50', locked: false },
    { name: 'Knowledge Seeker', icon: 'book', color: '#FF9800', locked: false },
    { name: 'Community Helper', icon: 'people', color: '#E91E63', locked: true },
    { name: 'Wellness Warrior', icon: 'fitness', color: '#9C27B0', locked: true },
    { name: 'Health Educator', icon: 'school', color: '#2196F3', locked: true },
    { name: 'Champion', icon: 'trophy', color: '#FFD700', locked: true },
  ];

  const challenges = [
    { title: 'Track Your Cycle', progress: 70, total: 30, unit: 'days' },
    { title: 'Read Health Articles', progress: 40, total: 10, unit: 'articles' },
    { title: 'Help Community Members', progress: 20, total: 5, unit: 'conversations' },
    { title: 'Complete Health Checkup', progress: 0, total: 1, unit: 'checkup' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="trophy" size={48} color="#FFD700" />
        <Text style={styles.headerTitle}>Health Achievements</Text>
        <Text style={styles.headerSubtitle}>Track your progress and earn rewards</Text>
      </View>

      <View style={styles.levelCard}>
        <Text style={styles.levelTitle}>Your Health Level</Text>
        <View style={styles.levelInfo}>
          <Text style={styles.levelNumber}>Level 3</Text>
          <Text style={styles.levelName}>Health Explorer</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '60%' }]} />
        </View>
        <Text style={styles.progressText}>600 / 1000 XP to next level</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Badges</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge, index) => (
            <View key={index} style={styles.badgeCard}>
              <View style={[
                styles.badgeIcon,
                { backgroundColor: badge.locked ? '#E0E0E0' : badge.color }
              ]}>
                <Ionicons 
                  name={badge.locked ? 'lock-closed' : badge.icon} 
                  size={24} 
                  color={badge.locked ? '#999' : '#fff'} 
                />
              </View>
              <Text style={[
                styles.badgeName,
                { color: badge.locked ? theme.textSecondary : theme.text }
              ]}>
                {badge.name}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Challenges</Text>
        {challenges.map((challenge, index) => (
          <View key={index} style={styles.challengeCard}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <View style={styles.challengeProgress}>
              <View style={styles.challengeProgressBar}>
                <View style={[
                  styles.challengeProgressFill,
                  { width: `${challenge.progress}%` }
                ]} />
              </View>
              <Text style={styles.challengeProgressText}>
                {Math.round(challenge.total * challenge.progress / 100)} / {challenge.total} {challenge.unit}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <View style={styles.leaderboardCard}>
          <Text style={styles.leaderboardTitle}>Community Health Champions</Text>
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>1.</Text>
            <Text style={styles.username}>Grace M.</Text>
            <Text style={styles.points}>2,150 XP</Text>
          </View>
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>2.</Text>
            <Text style={styles.username}>Sarah K.</Text>
            <Text style={styles.points}>1,980 XP</Text>
          </View>
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>3.</Text>
            <Text style={styles.username}>You</Text>
            <Text style={styles.points}>1,750 XP</Text>
          </View>
          <View style={styles.leaderboardItem}>
            <Text style={styles.rank}>4.</Text>
            <Text style={styles.username}>Mary J.</Text>
            <Text style={styles.points}>1,620 XP</Text>
          </View>
        </View>
      </View>

      <View style={styles.comingSoonCard}>
        <Ionicons name="construct" size={32} color={theme.primary} />
        <Text style={styles.comingSoonTitle}>Enhanced Features Coming Soon</Text>
        <Text style={styles.comingSoonText}>
          • Weekly health challenges{'\n'}
          • Rewards and prizes{'\n'}
          • Social sharing{'\n'}
          • Achievement celebrations{'\n'}
          • Personal health goals
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
  levelCard: {
    backgroundColor: theme.surface,
    margin: 15,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelTitle: {
    fontSize: 16,
    color: theme.textSecondary,
    marginBottom: 10,
  },
  levelInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  levelNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.primary,
  },
  levelName: {
    fontSize: 18,
    fontWeight: '500',
    color: theme.text,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: theme.textSecondary,
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
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  badgeCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  badgeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  challengeCard: {
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 10,
  },
  challengeProgress: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  challengeProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginRight: 10,
  },
  challengeProgressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  challengeProgressText: {
    fontSize: 12,
    color: theme.textSecondary,
    minWidth: 80,
  },
  leaderboardCard: {
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
    textAlign: 'center',
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.textSecondary,
    width: 30,
  },
  username: {
    flex: 1,
    fontSize: 16,
    color: theme.text,
  },
  points: {
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
  },
});