import React, { useState } from 'react';
import { Alert } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { firebase_auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const registerFormSubmit = async () => {
    try {
      const response = await createUserWithEmailAndPassword(firebase_auth, formData.email, formData.password)
      const user = response.user;
      await updateProfile(user, {
        displayName: formData.fullName,
      });
      const userValue = JSON.stringify(user);
      await AsyncStorage.setItem('user', userValue);
      navigation.navigate('BottomTabNavigation');

    } catch (error) {
      console.log(error)
      console.log(error.code)
      if (error.code == 'auth/weak-password') {
        Alert.alert("Invalid Credentials", "Password is too weak. Please choose a stronger password with more than 6 characters.", [
          { text: "OK" }
        ]);
      } else if (error.code == 'auth/email-already-in-use') {
        Alert.alert("Invalid Credentials", "Current email is already in use. Please use a different email address.", [
          { text: "OK" }
        ]);
      } else {
        Alert.alert("Error", "Something went wrong. Please try again later.", [
          { text: "OK" }
        ]);
      }
      throw error;
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="chevron-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Create a new account</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#666"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#666"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={registerFormSubmit}>
        <Text style={styles.continueButtonText}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D',
    padding: 20,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    gap: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  continueButtonText: {
    color: '#000033',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Register;