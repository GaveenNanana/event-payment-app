import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Vendor_Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.headerText}>Create a new business account</Text>

      {/* Input fields */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={fullName}
          onChangeText={setFullName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={22} 
              color="#888" 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Continue button */}
      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Vendor_Business_Details')}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark navy blue background
    paddingHorizontal: 16,
  },
  backButton: {
    marginTop: 10,
    marginBottom: 12,
    width: 40,
  },
  headerText: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  formContainer: {
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 15,
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  continueButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  }
});

export default Vendor_Register;