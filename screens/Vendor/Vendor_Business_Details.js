import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Vendor_Business_Details({ navigation }) {
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    phoneNumber: '',
    website: '',
    about: '',
    businessCategory: ''
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleContinue = () => {
    // Handle form submission or navigation to next screen
    console.log('Form data:', formData);
    navigation.navigate('Vendor_Bank_Details');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Business Details</Text>


        {/* Form fields */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Business Name"
            value={formData.businessName}
            onChangeText={(text) => handleChange('businessName', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => handleChange('address', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={formData.phoneNumber}
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange('phoneNumber', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Website"
            value={formData.website}
            keyboardType="url"
            onChangeText={(text) => handleChange('website', text)}
          />
          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="About"
            value={formData.about}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => handleChange('about', text)}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Select a business category or enter"
            value={formData.businessCategory}
            onChangeText={(text) => handleChange('businessCategory', text)}
          />
        </View>

        {/* Continue button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark blue background as shown in the image
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 18,
  },
  formContainer: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  continueButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 'auto',
    marginBottom: 20,
  },
  continueButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Vendor_Business_Details;