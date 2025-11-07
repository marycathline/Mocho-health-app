// src/screens/LoginScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { theme } from '../theme/colors';
import { Ionicons } from '@expo/vector-icons'; // <-- for back arrow icon

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Info', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('MainApp');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Missing Email', 'Please enter your email to reset your password.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Password Reset',
        'A password reset link has been sent to your email.'
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.inner}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backButton} onPress={() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace('SignUp'); // fallback if no screen to go back to
    }
  }}
>
  <Ionicons name="arrow-back" size={26} color={theme.primary} />
</TouchableOpacity>


        <Image source={require('../../assets/logo1.png')} style={styles.logo} />

        <Text style={styles.title}>Welcome Back 👋</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your Mocho Health journey
        </Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.6 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>
        </View>

<TouchableOpacity onPress={() => navigation.replace('SignUp')}>
  <Text style={styles.link}>
    Don’t have an account?{' '}
    <Text style={{ fontWeight: 'bold', color: theme.primary }}>Sign up</Text>
  </Text>
</TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  inner: { paddingHorizontal: 24, alignItems: 'center' },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  logo: { width: 120, height: 120, marginBottom: 10, marginTop: 40 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: { width: '100%' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  forgotText: {
    alignSelf: 'flex-end',
    color: theme.primary,
    marginBottom: 15,
    fontWeight: '500',
  },
  button: {
    backgroundColor: theme.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
  link: {
    color: '#555',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
  },
});
