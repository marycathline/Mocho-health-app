import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme/colors';

export default function CycleTrackerScreen() {
  const [lastPeriod, setLastPeriod] = useState(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [isPregnant, setIsPregnant] = useState(false);
  const [pregnancyWeek, setPregnancyWeek] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('cycleData');
      if (data) {
        const parsed = JSON.parse(data);
        setLastPeriod(parsed.lastPeriod ? new Date(parsed.lastPeriod) : null);
        setCycleLength(parsed.cycleLength || 28);
        setPeriodLength(parsed.periodLength || 5);
        setIsPregnant(parsed.isPregnant || false);
        setPregnancyWeek(parsed.pregnancyWeek || 0);
      }
    } catch (error) {
      console.error('Error loading cycle data:', error);
    }
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('cycleData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving cycle data:', error);
    }
  };

  const logPeriod = () => {
    const today = new Date();
    const newData = {
      lastPeriod: today,
      cycleLength,
      periodLength,
      isPregnant: false,
      pregnancyWeek: 0
    };
    
    setLastPeriod(today);
    setIsPregnant(false);
    setPregnancyWeek(0);
    saveData(newData);
    
    Alert.alert('Period Logged', 'Your period has been logged for today.');
  };

  const logPregnancy = () => {
    const today = new Date();
    const newData = {
      lastPeriod,
      cycleLength,
      periodLength,
      isPregnant: true,
      pregnancyWeek: 1,
      pregnancyStartDate: today
    };
    
    setIsPregnant(true);
    setPregnancyWeek(1);
    saveData(newData);
    
    Alert.alert('Pregnancy Logged', 'Congratulations! Your pregnancy journey has begun.');
  };

  const calculateNextPeriod = () => {
    if (!lastPeriod || isPregnant) return null;
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + cycleLength);
    return nextPeriod;
  };

  const calculateSafeDays = () => {
    if (!lastPeriod || isPregnant) return null;
    
    const ovulationDay = cycleLength - 14;
    const fertileStart = ovulationDay - 5;
    const fertileEnd = ovulationDay + 1;
    
    return {
      safe1: `Days 1-${fertileStart - 1}`,
      fertile: `Days ${fertileStart}-${fertileEnd}`,
      safe2: `Days ${fertileEnd + 1}-${cycleLength}`
    };
  };

  const getDaysUntilNext = () => {
    const nextPeriod = calculateNextPeriod();
    if (!nextPeriod) return null;
    
    const today = new Date();
    const diffTime = nextPeriod - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPregnancyTip = () => {
    const tips = {
      1: "Your baby is the size of a poppy seed. Start taking folic acid if you haven't already.",
      4: "Your baby's heart is starting to beat! Schedule your first prenatal appointment.",
      8: "Your baby is now the size of a grape. Morning sickness may be starting.",
      12: "End of first trimester! Risk of miscarriage significantly decreases.",
      16: "You might start feeling baby's movements soon!",
      20: "Halfway point! Time for your anatomy scan.",
      24: "Your baby's hearing is developing. Play some music!",
      28: "Third trimester begins. Your baby's eyes can now open and close.",
      32: "Your baby is gaining weight rapidly now.",
      36: "Your baby is considered full-term soon. Start preparing for delivery.",
      40: "Your due date is here! Labor could start any day."
    };
    
    const weekKey = Math.floor(pregnancyWeek / 4) * 4;
    return tips[weekKey] || "Continue taking care of yourself and your growing baby!";
  };

  const nextPeriod = calculateNextPeriod();
  const safeDays = calculateSafeDays();
  const daysUntilNext = getDaysUntilNext();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {isPregnant ? 'Pregnancy Tracker' : 'Cycle Tracker'}
        </Text>
      </View>

      {!isPregnant ? (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Current Status</Text>
            {lastPeriod ? (
              <View>
                <Text style={styles.dateText}>
                  Last Period: {lastPeriod.toLocaleDateString()}
                </Text>
                {nextPeriod && (
                  <Text style={styles.dateText}>
                    Next Period: {nextPeriod.toLocaleDateString()}
                    {daysUntilNext && (
                      <Text style={styles.daysText}> ({daysUntilNext} days)</Text>
                    )}
                  </Text>
                )}
              </View>
            ) : (
              <Text style={styles.noDataText}>No period data logged yet</Text>
            )}
          </View>

          {safeDays && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Cycle Information</Text>
              <View style={styles.safeDayItem}>
                <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
                <Text style={styles.safeDayText}>Safe Days: {safeDays.safe1}</Text>
              </View>
              <View style={styles.safeDayItem}>
                <Ionicons name="warning" size={20} color="#FF9800" />
                <Text style={styles.fertileDayText}>Fertile Window: {safeDays.fertile}</Text>
              </View>
              <View style={styles.safeDayItem}>
                <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
                <Text style={styles.safeDayText}>Safe Days: {safeDays.safe2}</Text>
              </View>
            </View>
          )}

          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={logPeriod}>
              <Ionicons name="calendar" size={20} color="#fff" />
              <Text style={styles.buttonText}>Log Period Today</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton} onPress={logPregnancy}>
              <Ionicons name="heart" size={20} color={theme.primary} />
              <Text style={styles.secondaryButtonText}>I'm Pregnant</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pregnancy Week {pregnancyWeek}</Text>
            <Text style={styles.pregnancyText}>
              Congratulations on your pregnancy journey!
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>This Week's Tip</Text>
            <Text style={styles.tipText}>{getPregnancyTip()}</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Danger Signs to Watch For</Text>
            <View style={styles.dangerSign}>
              <Ionicons name="warning" size={16} color="#F44336" />
              <Text style={styles.dangerText}>Severe abdominal pain</Text>
            </View>
            <View style={styles.dangerSign}>
              <Ionicons name="warning" size={16} color="#F44336" />
              <Text style={styles.dangerText}>Heavy bleeding</Text>
            </View>
            <View style={styles.dangerSign}>
              <Ionicons name="warning" size={16} color="#F44336" />
              <Text style={styles.dangerText}>Severe headaches</Text>
            </View>
            <View style={styles.dangerSign}>
              <Ionicons name="warning" size={16} color="#F44336" />
              <Text style={styles.dangerText}>Vision changes</Text>
            </View>
            <Text style={styles.emergencyText}>
              If you experience any of these symptoms, seek medical attention immediately.
            </Text>
          </View>
        </>
      )}
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
  card: {
    backgroundColor: theme.surface,
    margin: 15,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    marginBottom: 15,
  },
  dateText: {
    fontSize: 16,
    color: theme.text,
    marginBottom: 10,
  },
  daysText: {
    color: theme.primary,
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    color: theme.textSecondary,
    fontStyle: 'italic',
  },
  safeDayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  safeDayText: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 10,
  },
  fertileDayText: {
    fontSize: 16,
    color: '#FF9800',
    marginLeft: 10,
  },
  actionButtons: {
    padding: 15,
  },
  primaryButton: {
    backgroundColor: theme.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: theme.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.primary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  secondaryButtonText: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  pregnancyText: {
    fontSize: 16,
    color: theme.text,
    textAlign: 'center',
  },
  tipText: {
    fontSize: 16,
    color: theme.text,
    lineHeight: 22,
  },
  dangerSign: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dangerText: {
    fontSize: 14,
    color: theme.text,
    marginLeft: 8,
  },
  emergencyText: {
    fontSize: 14,
    color: '#F44336',
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});