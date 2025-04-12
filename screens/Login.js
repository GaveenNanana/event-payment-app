import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { firebase_auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { geCustomerByUserID } from '../Services/FirebaseService';

function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const loginFormSubmit = async () => {
    try {
      setloading(true);
      const response = await signInWithEmailAndPassword(firebase_auth, email, password)
      const userData = response.user;
      const userObj = await geCustomerByUserID(userData.uid);

      const userValue = JSON.stringify({
        ...userData,
        id: userObj.id,
        profileImage: userObj.profileImage,
        fullname: userObj.fullname
      });

      await AsyncStorage.setItem('user', userValue);
      setloading(false);
      navigation.navigate('BottomTabNavigation');

    } catch (error) {
      Alert.alert("Invalid Credentials", "Please check your username and password and try again.", [
        { text: "OK" }
      ]);
      throw error;
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Welcome')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Log In</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="#000"
            />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          <View></View>
        )}

        {/* onPress={() => navigation.navigate('BottomTabNav_Vendor')} */}
        <TouchableOpacity style={styles.loginButton} onPress={loginFormSubmit}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Do you haven't any account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark blue background
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 120,
  },
  loginButtonText: {
    color: '#000080',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  dividerText: {
    color: 'white',
    paddingHorizontal: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: 'white',
  },
  registerLink: {
    color: 'white',
    fontWeight: '600',
  },
  loading: {
    padding: 20,
  }
});

export default Login;