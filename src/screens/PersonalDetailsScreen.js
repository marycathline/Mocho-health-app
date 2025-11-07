import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image,
  ScrollView, Platform, Alert, ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { theme } from '../theme/colors';

const API_URL = 'https://your-api.com'; // replace with your API

export default function PersonalDetailsScreen({ route, navigation }) {
  const userId = route?.params?.userId;
  const [image, setImage] = useState(null);
  const [dob, setDob] = useState(null);
  const [showDate, setShowDate] = useState(false);
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ask permissions for gallery
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please grant photo gallery permissions from settings.');
      }
    })();
  }, []);

  // Pick image
  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!result.canceled) {
        setImage(result.assets[0]); // ✅ correct API usage
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Could not pick image.');
    }
  }

  // DOB handler
  function onChangeDate(event, selectedDate) {
    setShowDate(Platform.OS === 'ios');
    if (selectedDate) setDob(selectedDate);
  }

  // Submit profile
  async function submitProfile() {
    setIsSubmitting(true);
    try {
      const token = await AsyncStorage.getItem('token');

      const form = new FormData();
      form.append('gender', gender);
      form.append('dob', dob ? dob.toISOString().split('T')[0] : '');
      form.append('address', address);
      form.append('occupation', occupation);

      if (image) {
        const uriParts = image.uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        form.append('profileImage', {
          uri: image.uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const res = await fetch(`${API_URL}/users/${userId || 'me'}/profile`, {
        method: 'POST',
        headers: {
          // Don't manually set multipart header, let fetch handle it
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: form,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || 'Profile update failed');
      }

      Alert.alert('Success', 'Profile saved');
      navigation.replace('MainApp'); // ✅ navigate to MainApp
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Complete your profile</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={{ color: '#fff' }}>Add photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setShowDate(true)} style={styles.input}>
        <Text style={{ color: dob ? '#111' : '#999' }}>
          {dob ? dob.toDateString() : 'Date of birth'}
        </Text>
      </TouchableOpacity>

      {showDate && (
        <DateTimePicker
          value={dob || new Date(2000, 0, 1)}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={onChangeDate}
        />
      )}

      <TextInput
        placeholder="Gender (Male, Female, Prefer not to say)"
        placeholderTextColor="#999"
        style={styles.input}
        value={gender}
        onChangeText={setGender}
      />

      <TextInput
        placeholder="Address"
        placeholderTextColor="#999"
        style={styles.input}
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        placeholder="Occupation / School"
        placeholderTextColor="#999"
        style={styles.input}
        value={occupation}
        onChangeText={setOccupation}
      />

      <TouchableOpacity
        onPress={submitProfile}
        style={[styles.button, isSubmitting && { opacity: 0.7 }]}
        disabled={isSubmitting}
      >
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Save & Continue</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 18,
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 18,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#f6f6f6',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    color: '#111',
  },
  button: {
    backgroundColor: theme.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
