import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, StatusBar, Modal, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";
import { firebase_auth, firebase_store } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDocument } from '../../Services/FirebaseService';

function Vendor_Bank_Details({ navigation }) {
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('');
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [loading, setloading] = useState(false);

  const sriLankaBanks = [
    'Bank of Ceylon',
    'People\'s Bank',
    'Commercial Bank of Ceylon',
    'Hatton National Bank',
    'Sampath Bank',
    'Nations Trust Bank',
    'National Savings Bank',
    'Seylan Bank',
    'DFCC Bank',
    'National Development Bank',
    'Pan Asia Banking Corporation',
    'Union Bank of Colombo',
    'Cargills Bank',
    'Amana Bank'
  ];

  const selectBank = (selectedBank) => {
    setBank(selectedBank);
    setShowBankDropdown(false);
  };

  const registerBusiness = async () => {
    setloading(true);
    let JsonString = await AsyncStorage.getItem('userObject');
    let user = JSON.parse(JsonString);
    try {
      const response = await createUserWithEmailAndPassword(firebase_auth, user.email, user.password)
      const userResponse = response.user;

      await updateProfile(userResponse, {
        displayName: user.fullName,
      });

      const userObj = {
        userID: userResponse.uid,
        fullname: `${user.fullname}`,
        email: `${user.email}`,
        businessName: `${user.businessName}`,
        address: `${user.address}`,
        phoneNumber: user.phoneNumber,
        website: `${user.website}`,
        about: `${user.about}`,
        businessCategory: `${user.businessCategory}`,
        bank: `${bank}`,
        accountNumber: accountNumber,
        imageURL: ""
      };
      const docRef = await addDocument('users', userObj);
      userObj.uid = docRef;
      userObj.id = docRef;
      const userValue = JSON.stringify(userObj);

      await AsyncStorage.setItem('user', userValue);
      setloading(false);
      navigation.navigate('BottomTabNav_Vendor');

    } catch (error) {
      console.log(error);
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

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Add bank details</Text>


      {/* Bank dropdown field */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowBankDropdown(true)}
        >
          <Text style={bank ? styles.dropdownText : styles.dropdownPlaceholder}>
            {bank || "Bank"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Bank Selection Modal */}
      <Modal
        visible={showBankDropdown}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Bank</Text>
              <TouchableOpacity onPress={() => setShowBankDropdown(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={sriLankaBanks}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.bankItem}
                  onPress={() => selectBank(item)}
                >
                  <Text style={styles.bankItemText}>{item}</Text>
                </TouchableOpacity>
              )}
              style={styles.bankList}
            />
          </View>
        </View>
      </Modal>

      {/* Account Number input field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Account Number"
          placeholderTextColor="#666"
          value={accountNumber}
          onChangeText={setAccountNumber}
          keyboardType="default"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <View></View>
      )}

      {/* Submit button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={registerBusiness}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark blue background matching the image
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 20,
  },
  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  input: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
    fontSize: 16,
  },
  dropdownButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginTop: 'auto', // Push to bottom of screen
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bankList: {
    paddingHorizontal: 16,
  },
  bankItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bankItemText: {
    fontSize: 16,
  },
  loading: {
    padding: 10,
  }
});

export default Vendor_Bank_Details;