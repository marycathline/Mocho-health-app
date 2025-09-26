import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

const economicResources = [
  {
    id: 1,
    title: 'Vocational Training Program',
    description: 'Learn practical skills like tailoring, hairdressing, and computer literacy',
    provider: 'Rusinga Skills Center',
    duration: '3-6 months',
    cost: 'Free for women under 25',
    contact: '+254700111222',
    icon: 'school',
    color: '#4CAF50'
  },
  {
    id: 2,
    title: 'Small Business Starter Kit',
    description: 'Get tools and training to start your own small business',
    provider: 'MOCHO Economic Empowerment',
    duration: '2 weeks training',
    cost: 'Ksh 5,000 loan (0% interest)',
    contact: '+254700333444',
    icon: 'storefront',
    color: '#FF9800'
  },
  {
    id: 3,
    title: 'Digital Marketing Course',
    description: 'Learn to promote your business online and reach more customers',
    provider: 'Tech4Women Kenya',
    duration: '4 weeks',
    cost: 'Free with certificate',
    contact: '+254700555666',
    icon: 'phone-portrait',
    color: '#3F51B5'
  },
  {
    id: 4,
    title: 'Financial Literacy Workshop',
    description: 'Learn budgeting, saving, and investment basics',
    provider: 'Equity Bank Foundation',
    duration: '1 week intensive',
    cost: 'Free',
    contact: '+254700777888',
    icon: 'calculator',
    color: '#E91E63'
  }
];

const scholarships = [
  {
    title: 'Girls Education Scholarship',
    amount: 'Full school fees + supplies',
    eligibility: 'Girls aged 14-18 from low-income families',
    deadline: 'March 15, 2026',
    provider: 'Kenya Girls Education Trust'
  },
  {
    title: 'Young Mother Support Fund',
    amount: 'Ksh 50,000 per year',
    eligibility: 'Mothers under 23 continuing education',
    deadline: 'June 30, 2026',
    provider: 'MOCHO Foundation'
  },
  {
    title: 'Technical Training Bursary',
    amount: 'Up to Ksh 100,000',
    eligibility: 'Women pursuing technical courses',
    deadline: 'September 1, 2026',
    provider: 'Women in Tech Kenya'
  }
];

const businessTips = [
  {
    title: 'Start Small, Think Big',
    tip: 'Begin with what you can afford and gradually expand your business.',
    icon: 'trending-up'
  },
  {
    title: 'Know Your Customers',
    tip: 'Understand what your community needs and provide solutions.',
    icon: 'people'
  },
  {
    title: 'Keep Good Records',
    tip: 'Track your income, expenses, and profits to make better decisions.',
    icon: 'document-text'
  },
  {
    title: 'Save for Growth',
    tip: 'Set aside money from profits to invest back into your business.',
    icon: 'wallet'
  },
  {
    title: 'Network with Others',
    tip: 'Connect with other business owners to share ideas and support.',
    icon: 'link'
  }
];

export default function EconomicResourcesScreen() {
  const makeCall = (number) => {
    Alert.alert(
      'Call Provider',
      `Would you like to call ${number}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call',
          onPress: () => {
            Linking.openURL(`tel:${number}`).catch(err => {
              Alert.alert('Error', 'Unable to make phone call');
            });
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Economic Empowerment</Text>
        <Text style={styles.headerSubtitle}>
          Build your future with skills, business opportunities, and education
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Training & Business Opportunities</Text>
        {economicResources.map((resource) => (
          <View key={resource.id} style={styles.resourceCard}>
            <View style={styles.resourceHeader}>
              <Ionicons name={resource.icon} size={24} color={resource.color} />
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceProvider}>{resource.provider}</Text>
              </View>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => makeCall(resource.contact)}
              >
                <Ionicons name="call" size={16} color={theme.primary} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.resourceDescription}>{resource.description}</Text>
            
            <View style={styles.resourceDetails}>
              <View style={styles.detailItem}>
                <Ionicons name="time" size={16} color={theme.textSecondary} />
                <Text style={styles.detailText}>Duration: {resource.duration}</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="pricetag" size={16} color={theme.textSecondary} />
                <Text style={styles.detailText}>Cost: {resource.cost}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Scholarships</Text>
        {scholarships.map((scholarship, index) => (
          <View key={index} style={styles.scholarshipCard}>
            <View style={styles.scholarshipHeader}>
              <Ionicons name="school" size={20} color="#4CAF50" />
              <Text style={styles.scholarshipTitle}>{scholarship.title}</Text>
            </View>
            <View style={styles.scholarshipDetails}>
              <Text style={styles.scholarshipAmount}>Amount: {scholarship.amount}</Text>
              <Text style={styles.scholarshipEligibility}>
                Eligibility: {scholarship.eligibility}
              </Text>
              <Text style={styles.scholarshipDeadline}>
                Deadline: {scholarship.deadline}
              </Text>
              <Text style={styles.scholarshipProvider}>
                Provider: {scholarship.provider}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Success Tips</Text>
        {businessTips.map((tip, index) => (
          <View key={index} style={styles.tipCard}>
            <Ionicons name={tip.icon} size={20} color={theme.primary} />
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>{tip.title}</Text>
              <Text style={styles.tipText}>{tip.tip}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Success Stories</Text>
        <View style={styles.successStory}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <View style={styles.storyContent}>
            <Text style={styles.storyText}>
              "After completing the tailoring course, I was able to start my own business. 
              Now I support my family and employ two other women in my community."
            </Text>
            <Text style={styles.storyAuthor}>- Mary, Rusinga Island</Text>
          </View>
        </View>
        
        <View style={styles.successStory}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <View style={styles.storyContent}>
            <Text style={styles.storyText}>
              "The digital marketing course helped me reach customers beyond our island. 
              My sales have tripled since learning to use social media for business."
            </Text>
            <Text style={styles.storyAuthor}>- Grace, Mbita</Text>
          </View>
        </View>
      </View>

      <View style={styles.callToAction}>
        <Ionicons name="rocket" size={24} color={theme.primary} />
        <Text style={styles.ctaTitle}>Ready to Start Your Journey?</Text>
        <Text style={styles.ctaText}>
          Contact any of the providers above to learn more about their programs. 
          Your economic independence starts with taking the first step!
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
    padding: 20,
    backgroundColor: theme.surface,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
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
  resourceCard: {
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  resourceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 2,
  },
  resourceProvider: {
    fontSize: 14,
    color: theme.textSecondary,
  },
  callButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.background,
  },
  resourceDescription: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  resourceDetails: {
    borderTopWidth: 1,
    borderTopColor: theme.background,
    paddingTop: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 13,
    color: theme.textSecondary,
    marginLeft: 8,
  },
  scholarshipCard: {
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scholarshipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  scholarshipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginLeft: 10,
  },
  scholarshipDetails: {
    paddingLeft: 30,
  },
  scholarshipAmount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginBottom: 5,
  },
  scholarshipEligibility: {
    fontSize: 13,
    color: theme.text,
    marginBottom: 3,
  },
  scholarshipDeadline: {
    fontSize: 13,
    color: '#F44336',
    fontWeight: '500',
    marginBottom: 3,
  },
  scholarshipProvider: {
    fontSize: 13,
    color: theme.textSecondary,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 5,
  },
  tipText: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 18,
  },
  successStory: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyContent: {
    flex: 1,
    marginLeft: 12,
  },
  storyText: {
    fontSize: 14,
    color: theme.text,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  storyAuthor: {
    fontSize: 13,
    color: theme.primary,
    fontWeight: '500',
  },
  callToAction: {
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
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginTop: 10,
    marginBottom: 10,
  },
  ctaText: {
    fontSize: 14,
    color: theme.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});