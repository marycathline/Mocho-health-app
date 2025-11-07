import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons'; // ensure expo install react-native-vector-icons
import { theme } from '../theme/colors';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const uid = auth.currentUser?.uid;
        if (uid) {
          const docRef = doc(db, 'users', uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log('No user data found');
          }
        }
      } catch (e) {
        console.error('Error fetching user data:', e);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  async function handleLogout() {
    await signOut(auth);
    navigation.replace('Login');
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={90} color={theme.primary} />
        <Text style={styles.nameText}>{userData?.fullName || 'User'}</Text>
        <Text style={styles.emailText}>{userData?.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={20} color={theme.primary} />
          <Text style={styles.infoLabel}>Phone:</Text>
          <Text style={styles.infoValue}>{userData?.phone || 'Not provided'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={20} color={theme.primary} />
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.infoValue}>{userData?.email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color={theme.primary} />
          <Text style={styles.infoLabel}>Full Name:</Text>
          <Text style={styles.infoValue}>{userData?.fullName}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
  },
  nameText: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.primary,
    marginTop: 10,
  },
  emailText: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: '#555',
    marginLeft: 8,
    width: 80,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    flex: 1,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 40,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
