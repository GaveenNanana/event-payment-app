import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { firebase_auth } from '../../firebaseConfig';
import { getUserByUserID } from '../../Services/FirebaseService';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

function Vendor_Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const loginFormSubmit = async () => {
    try {
      setloading(true);
      const response = await signInWithEmailAndPassword(firebase_auth, email, password)
      const user = response.user;
      const userObj = await getUserByUserID(user.uid);

      if (userObj != null) {
        const userValue = JSON.stringify(userObj);
        await AsyncStorage.setItem('user', userValue);
        setloading(false);
        navigation.navigate('BottomTabNav_Vendor');
      } else {
        throw error;
      }

    } catch (error) {
      Alert.alert("Invalid Credentials", "Please check your username and password and try again.", [
        { text: "OK" }
      ]);
      throw error;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Business Sign In</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="#777"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View></View>
      )}

      <View style={styles.bottomSection}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={loginFormSubmit}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have a business account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Vendor_Register')}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark navy blue
    padding: 16,
    justifyContent: 'space-between', // This helps position content at top and bottom
  },
  topSection: {
    // Contains the top elements (back button, title, and inputs)
  },
  bottomSection: {
    // Contains the bottom elements (login button and signup text)
    marginBottom: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  eyeIcon: {
    paddingRight: 16,
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#0a1752',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: 'white',
    fontSize: 14,
  },
  signupLink: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Vendor_Login;