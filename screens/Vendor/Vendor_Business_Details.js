import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Vendor_Business_Details({ navigation }) {
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    phoneNumber: '',
    website: '',
    about: '',
    businessCategory: ''
  });
  const [showEventDropdown, setShowEventDropdown] = useState(false);

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleContinue = async () => {
    let JsonString = await AsyncStorage.getItem('userObject');
    let user = JSON.parse(JsonString);
    user["businessName"] = formData.businessName;
    user["address"] = formData.address;
    user["phoneNumber"] = formData.phoneNumber;
    user["website"] = formData.website;
    user["about"] = formData.about;
    user["businessCategory"] = formData.businessCategory;
    JsonString = JSON.stringify(user);
    console.log(JsonString);
    await AsyncStorage.setItem('userObject', JsonString);

    navigation.navigate('Vendor_Bank_Details');
  };

  const vendorCategory = [
    'Light Food',
    'Asian Cuisine',
    'Burgers',
    'Hot Dogs',
    'Ramen',
    'Desserts',
    'Japanese Cuisine',
    'Fast Food'
  ];

  const selectCato = (selectedCato) => {
    handleChange("businessCategory", selectedCato);
    setShowEventDropdown(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Business Details</Text>

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
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowEventDropdown(true)}
            >
              <Text style={formData ? styles.dropdownText : styles.dropdownPlaceholder}>
                {formData.businessCategory || "Business Category"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Bank Selection Modal */}
          <Modal
            visible={showEventDropdown}
            transparent={true}
            animationType="slide"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Select Business Category</Text>
                  <TouchableOpacity onPress={() => setShowEventDropdown(false)}>
                    <Ionicons name="close" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={vendorCategory}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.bankItem}
                      onPress={() => selectCato(item)}
                    >
                      <Text style={styles.bankItemText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  style={styles.bankList}
                />
              </View>
            </View>
          </Modal>

        </View>

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
    backgroundColor: '#050C4D',
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
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHeigh: 15,
    marginBottom: 15,
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
});

export default Vendor_Business_Details;