import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/colors';

export default function HelpScreen() {
  const mochoHotline = '+254700123456'; // Mock MOCHO hotline number

  const makeEmergencyCall = () => {
    Alert.alert(
      'Emergency Call',
      `Are you sure you want to call the MOCHO hotline at ${mochoHotline}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Now',
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${mochoHotline}`).catch(err => {
              Alert.alert('Error', 'Unable to make phone call');
              console.error('Call error:', err);
            });
          }
        }
      ]
    );
  };

  const emergencyContacts = [
    {
      name: 'MOCHO Health Support',
      number: '+254710600451',
      description: 'Maternal and reproductive health support',
      available: '24/7'
    },
    {
      name: 'Rusinga Island Health Center',
      number: '+254710600451',
      description: 'Local health facility',
      available: 'Mon-Fri: 8AM-5PM'
    },
    {
      name: 'Emergency Services',
      number: '999',
      description: 'Police, Fire, Medical Emergency',
      available: '24/7'
    }
  ];

  const warningSigns = [
    {
      title: 'Severe Bleeding',
      description: 'Heavy menstrual bleeding that soaks a pad every hour',
      icon: 'warning',
      color: '#F44336'
    },
    {
      title: 'Severe Pain',
      description: 'Intense abdominal or pelvic pain that doesn\'t improve',
      icon: 'warning',
      color: '#F44336'
    },
    {
      title: 'High Fever',
      description: 'Temperature above 38.5°C (101.3°F)',
      icon: 'thermometer',
      color: '#FF9800'
    },
    {
      title: 'Pregnancy Complications',
      description: 'Severe headache, vision changes, or swelling',
      icon: 'medical',
      color: '#E91E63'
    }
  ];

  const healthFacilities = [
    {
      name: 'Rusinga Island Health Center',
      distance: '2.5 km',
      services: ['Maternal Care', 'Family Planning', 'Emergency Care'],
      contact: '+254700234567'
    },
    {
      name: 'Mbita Sub-County Hospital',
      distance: '15 km',
      services: ['Delivery Services', 'Surgery', 'Laboratory'],
      contact: '+254700345678'
    },
    {
      name: 'Homa Bay County Hospital',
      distance: '45 km',
      services: ['Specialized Care', 'ICU', 'Maternity Ward'],
      contact: '+254700456789'
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.emergencySection}>
        <Text style={styles.emergencyTitle}>Emergency Help</Text>
        <TouchableOpacity style={styles.emergencyButton} onPress={makeEmergencyCall}>
          <Ionicons name="call" size={24} color="#fff" />
          <Text style={styles.emergencyButtonText}>Call MOCHO Hotline</Text>
        </TouchableOpacity>
        <Text style={styles.emergencySubtext}>
          Available 24/7 for immediate health support
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        {emergencyContacts.map((contact, index) => (
          <View key={index} style={styles.contactCard}>
            <View style={styles.contactHeader}>
              <Text style={styles.contactName}>{contact.name}</Text>
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => Linking.openURL(`tel:${contact.number}`)}
              >
                <Ionicons name="call" size={16} color={theme.primary} />
              </TouchableOpacity>
            </View>
            <Text style={styles.contactNumber}>{contact.number}</Text>
            <Text style={styles.contactDescription}>{contact.description}</Text>
            <Text style={styles.contactAvailable}>Available: {contact.available}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Warning Signs - Seek Help Immediately</Text>
        {warningSigns.map((sign, index) => (
          <View key={index} style={styles.warningCard}>
            <Ionicons name={sign.icon} size={24} color={sign.color} />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>{sign.title}</Text>
              <Text style={styles.warningDescription}>{sign.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearest Health Facilities</Text>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={48} color={theme.primary} />
          <Text style={styles.mapText}>Interactive map coming soon</Text>
          <Text style={styles.mapSubtext}>Tap on facilities below for directions</Text>
        </View>
        
        {healthFacilities.map((facility, index) => (
          <View key={index} style={styles.facilityCard}>
            <View style={styles.facilityHeader}>
              <View style={styles.facilityInfo}>
                <Text style={styles.facilityName}>{facility.name}</Text>
                <View style={styles.facilityDistance}>
                  <Ionicons name="location" size={16} color={theme.primary} />
                  <Text style={styles.distanceText}>{facility.distance}</Text>
                </View>
              </View>
              <View style={styles.facilityActions}>
                <TouchableOpacity
                  style={styles.directionButton}
                  onPress={() => Alert.alert('Directions', 'Map integration coming soon')}
                >
                  <Ionicons name="navigate" size={16} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.callButton}
                  onPress={() => Linking.openURL(`tel:${facility.contact}`)}
                >
                  <Ionicons name="call" size={16} color={theme.primary} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.servicesLabel}>Services:</Text>
            <View style={styles.servicesList}>
              {facility.services.map((service, idx) => (
                <View key={idx} style={styles.serviceTag}>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Self-Care Tips</Text>
        <View style={styles.tipCard}>
          <Ionicons name="heart" size={20} color="#E91E63" />
          <Text style={styles.tipText}>
            Remember: It's okay to ask for help. Your health and well-being matter.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.tipText}>
            Keep track of your symptoms and share them with healthcare providers.
          </Text>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="time" size={20} color="#FF9800" />
          <Text style={styles.tipText}>
            Don't wait if you're experiencing severe symptoms - seek help immediately.
          </Text>
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
  emergencySection: {
    backgroundColor: '#F44336',
    padding: 30,
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  emergencyButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  emergencyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F44336',
    marginLeft: 10,
  },
  emergencySubtext: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
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
  contactCard: {
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
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    flex: 1,
  },
  contactNumber: {
    fontSize: 14,
    color: theme.primary,
    fontWeight: '500',
    marginBottom: 5,
  },
  contactDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    marginBottom: 3,
  },
  contactAvailable: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  callButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.background,
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: theme.surface,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  warningContent: {
    flex: 1,
    marginLeft: 15,
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 5,
  },
  warningDescription: {
    fontSize: 14,
    color: theme.textSecondary,
    lineHeight: 20,
  },
  mapPlaceholder: {
    backgroundColor: theme.surface,
    padding: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapText: {
    fontSize: 16,
    color: theme.text,
    marginTop: 10,
    fontWeight: '500',
  },
  mapSubtext: {
    fontSize: 14,
    color: theme.textSecondary,
    marginTop: 5,
  },
  facilityCard: {
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
  facilityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  facilityInfo: {
    flex: 1,
  },
  facilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 5,
  },
  facilityDistance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    color: theme.primary,
    marginLeft: 5,
    fontWeight: '500',
  },
  facilityActions: {
    flexDirection: 'row',
  },
  directionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: theme.background,
    marginRight: 10,
  },
  servicesLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.text,
    marginBottom: 8,
  },
  servicesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceTag: {
    backgroundColor: theme.background,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 12,
    color: theme.primary,
    fontWeight: '500',
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
  tipText: {
    fontSize: 14,
    color: theme.text,
    marginLeft: 10,
    flex: 1,
    lineHeight: 20,
  },
});