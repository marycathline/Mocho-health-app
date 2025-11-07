import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons'; // back arrow icon
import { SafeAreaView } from 'react-native-safe-area-context'; // to avoid overlap on phones
import { theme } from '../theme/colors';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string().min(2, 'Too short').required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9+ ]+$/, 'Only numbers, + and spaces').required('Phone required'),
  age: Yup.number().min(10, 'Too young').max(120, 'Invalid age').required('Age required'),
  gender: Yup.string().required('Gender required'),
  disability: Yup.string().required('Disability info required'),
  password: Yup.string().min(6, 'Minimum 6 characters').required('Password required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password'),
  terms: Yup.boolean().oneOf([true], 'You must accept terms'),
});

export default function SignupScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup(values, actions) {
    actions.setSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        age: values.age,
        gender: values.gender,
        disability: values.disability,
        createdAt: new Date().toISOString(),
      });

      await AsyncStorage.setItem('userId', user.uid);
      Alert.alert('Signup successful', 'Please log in to continue.');
      navigation.replace('Login'); // ✅ consistent screen name
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        Alert.alert('Email already registered', 'Please log in instead.');
        navigation.replace('Login');
      } else {
        Alert.alert('Signup error', err.message);
      }
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* 🔙 Back Arrow */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.replace('Login');
              }
            }}
          >
            <Ionicons name="arrow-back" size={26} color={theme.primary} />
          </TouchableOpacity>

          <Text style={styles.title}>Create Your Account</Text>

          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phone: '',
              age: '',
              gender: '',
              disability: '',
              password: '',
              confirmPassword: '',
              terms: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}
          >
            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting, setFieldValue }) => (
              <View style={styles.form}>
                {[
                  { label: 'Full Name', name: 'fullName', keyboard: 'default' },
                  { label: 'Email', name: 'email', keyboard: 'email-address' },
                  { label: 'Phone Number', name: 'phone', keyboard: 'phone-pad' },
                  { label: 'Age', name: 'age', keyboard: 'numeric' },
                  { label: 'Gender (Male/Female/Other)', name: 'gender', keyboard: 'default' },
                  { label: 'Disability (Yes/No/Prefer not to say)', name: 'disability', keyboard: 'default' },
                ].map((field) => (
                  <View key={field.name} style={{ marginBottom: 16 }}>
                    <Text style={styles.label}>{field.label}</Text>
                    <TextInput
                      style={styles.input}
                      placeholder={field.label}
                      placeholderTextColor="#999"
                      keyboardType={field.keyboard}
                      onChangeText={handleChange(field.name)}
                      value={values[field.name]}
                    />
                    {touched[field.name] && errors[field.name] && (
                      <Text style={styles.error}>{errors[field.name]}</Text>
                    )}
                  </View>
                ))}

                {/* Password */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    placeholder="Enter Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    onChangeText={handleChange('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                </View>

                {/* Confirm Password */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    secureTextEntry={!showPassword}
                    style={styles.input}
                    onChangeText={handleChange('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}
                </View>

                {/* Terms */}
                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => setFieldValue('terms', !values.terms)}
                    style={[styles.checkbox, values.terms && { backgroundColor: theme.primary }]}
                  >
                    <Text style={{ color: values.terms ? '#fff' : theme.primary }}>
                      {values.terms ? '✓' : ''}
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.termsText}>I agree to the Terms & Privacy Policy</Text>
                </View>
                {touched.terms && errors.terms && <Text style={styles.error}>{errors.terms}</Text>}

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={[styles.button, isSubmitting && { opacity: 0.7 }]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Sign Up</Text>
                  )}
                </TouchableOpacity>

                {/* Already Have Account */}
                <View style={{ marginTop: 40, marginBottom: 20 }}>
                  <TouchableOpacity onPress={() => navigation.replace('Login')}>
                    <Text style={styles.link}>
                      Already have an account?{' '}
                      <Text style={{ fontWeight: '700', color: theme.primary }}>Sign In</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.primary,
    marginBottom: 25,
    textAlign: 'center',
  },
  label: { color: theme.primary, fontWeight: '600', marginBottom: 6, fontSize: 15 },
  input: {
    backgroundColor: '#f0f4f8',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    color: theme.primary,
  },
  button: {
    backgroundColor: theme.primary,
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  link: { color: '#555', textAlign: 'center', fontSize: 15 },
  error: { color: '#d9534f', fontSize: 12, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  termsText: { color: theme.primary, fontSize: 14 },
});
