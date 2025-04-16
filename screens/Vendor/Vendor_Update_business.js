import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Keyboard, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { addImage, updateDocument } from '../../Services/FirebaseService';

function Vendor_Update_business({ navigation }) {
  const [user, setUser] = useState();
  const [loading, setloading] = useState(false);
  const [imageForUpload, setImageForUpload] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    phoneNumber: '',
    website: '',
    about: '',
    businessCategory: '',
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const userObject = JSON.parse(user);
      setUser(userObject);

      const formObject = {
        email: userObject.email,
        bank: userObject.bank,
        accountNumber: userObject.accountNumber,
        fullname: userObject.fullname,
        userID: userObject.userID,
        businessName: userObject.businessName,
        address: userObject.address,
        phoneNumber: userObject.phoneNumber,
        website: userObject.website,
        about: userObject.about,
        businessCategory: userObject.businessCategory,
        imageURL: userObject.imageURL,
      }
      setFormData(formObject);

    };
    fetchUser();
  }, []);

  const updateFormSubmit = async () => {
    try {
      setloading(true);
      if (imageForUpload != null) {
        const imageMeta = await addImage(imageForUpload, "vendor");
        if (imageMeta.success) {
          console.log("Image uploaded to Firebase:", imageMeta.url);
          formData.imageURL = imageMeta.url;
          await updateDocument("users", user.id, formData);
          formData.id = user.id;
          const userValue = JSON.stringify(formData);
          await AsyncStorage.setItem('user', userValue);
          navigation.navigate('BottomTabNav_Vendor');
        } else {
          alert("Image upload failed: " + imageMeta.error);
        }
      } else {
        await updateDocument("users", user.id, formData);
        formData.id = user.id;

        const userValue = JSON.stringify(formData);

        await AsyncStorage.setItem('user', userValue);
        navigation.navigate('BottomTabNav_Vendor');
      }


    } catch (error) {
      Alert.alert("Invalid Credentials", "Please check your username and password and try again.", [
        { text: "OK" }
      ]);
      throw error;
    }
    setloading(false);
  };

  const pickFile = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Permission to access gallery is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setImageForUpload(selectedImage);
      }
    } catch (err) {
      console.error("Image picking error:", err);
    }
  };



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#050C4D" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Update Business Details</Text>

        <View style={styles.formContainer}>

          <TextInput
            style={styles.inputReadOnly}
            placeholder="Business Name"
            value={formData.businessName}
            readOnly="true"
            onChangeText={(text) => handleChange('businessName', text)}
          />

          <TextInput
            style={styles.inputReadOnly}
            placeholder="Select a business category or enter"
            value={formData.businessCategory}
            readOnly="true"
            onChangeText={(text) => handleChange('businessCategory', text)}
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

          {imageForUpload ? (
            <View style={styles.rowContainer}>
              <Image
                source={{ uri: imageForUpload.uri }}
                style={styles.thumbnail}
                resizeMode="cover"
              />
              <TouchableOpacity style={styles.imageButton} onPress={pickFile}>
                <Ionicons style={styles.uploadIcon} name="cloud-upload-outline" size={24} color="#FFFFFFFF" />
                <Text style={styles.imageButtonText}>Update Store Image</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.imageButtonBefore} onPress={pickFile}>
              <Ionicons style={styles.uploadIcon} name="cloud-upload-outline" size={24} color="#FFFFFFFF" />
              <Text style={styles.imageButtonText}>Select Store Image</Text>
            </TouchableOpacity>
          )}

          {loading ? (
            <ActivityIndicator style={styles.loading} size="large" />
          ) : (
            <TouchableOpacity style={styles.generateButton} onPress={updateFormSubmit}>
              <Text style={styles.generateButtonText}>Update Business Info</Text>
            </TouchableOpacity>
          )}

        </View>
      </SafeAreaView >
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginStart: 15,
    marginBottom: 28,
  },
  vendorProfile: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  vendorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorInitials: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  vendorLabel: {
    color: 'black',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputLabel: {
    color: 'black',
    marginBottom: 8,
    fontSize: 14,
  },

  input: {
    backgroundColor: 'white',
    borderColor: "#B8B8B8FF",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  inputReadOnly: {
    backgroundColor: '#C2C1C1FF',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  summaryContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  summaryTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: 'white',
    fontSize: 14,
  },
  summaryValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 8,
  },
  generateButton: {
    backgroundColor: '#050C4D',
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginTop: 40,
  },
  generateButtonText: {
    color: '#FFFFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: '#050C4D',
    borderRadius: 4,
    padding: 15,
    paddingHorizontal: 48,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageButtonBefore: {
    backgroundColor: '#050C4D',
    borderRadius: 4,
    padding: 15,
    paddingHorizontal: 105,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageButtonText: {
    color: '#FFFFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  filenameText: {
    color: '#FFFFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },

  loading: {
    marginTop: 20,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  uploadIcon: {
    marginRight: 10,
  }

});

export default Vendor_Update_business;
