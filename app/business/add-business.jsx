import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { db, storage } from './../../configs/FirebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function AddBusiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [contact, setContact] = useState();
    const [website, setWebsite] = useState();
    const [about, setAbout] = useState();
    const [category, setCategory] = useState();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false); // Dropdown state
  
    // Dummy user object for testing
    const user = {
      fullName: "Test User",
      email: "testuser@example.com",
      imageUrl:
        "https://cdn-icons-png.flaticon.com/128/2202/2202112.png", // Placeholder profile image
    };
  
    useEffect(() => {
      navigation.setOptions({
        headerTitle: "Add New Business",
        headerShown: true,
      });
      GetCategoryList();
    }, []);
  
    const onImagePick = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result?.assets[0]?.uri);
        console.log(result);
      }
    };
  
    const GetCategoryList = async () => {
      setCategoryList([]);
      const q = query(collection(db, "Category"));
      const snapShot = await getDocs(q);
  
      const fetchedCategories = [];
      snapShot.forEach((doc) => {
        fetchedCategories.push({
          label: doc.data().name,
          value: doc.data().name,
        });
      });
  
      setCategoryList(fetchedCategories);
      console.log("Categories fetched:", fetchedCategories);
    };
  
    const onAddNewBusiness = async () => {
      if (!name || !address || !contact || !website || !about || !category || !image) {
        alert("Please fill in all fields!");
        return;
      }
  
      setLoading(true);
      try {
        const fileName = `${Date.now()}.jpg`;
        const response = await fetch(image);
        const blob = await response.blob();
  
        const imageRef = ref(storage, `Businesses/${fileName}`);
        await uploadBytes(imageRef, blob);
  
        const downloadUrl = await getDownloadURL(imageRef);
        console.log("Image URL:", downloadUrl);
  
        await saveBusinessDetail(downloadUrl);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload file. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    const saveBusinessDetail = async (imageUrl) => {
      try {
        const newDoc = {
          name,
          address,
          contact,
          about,
          website,
          category,
          username: user.fullName,
          userEmail: user.email,
          userImage: user.imageUrl,
          imageUrl,
        };
        await setDoc(doc(db, "VendorList", Date.now().toString()), newDoc);
        console.log("Business added:", newDoc);
  
        alert("New business added!");
        navigation.goBack();
      } catch (error) {
        console.error("Error saving business:", error);
        alert("Failed to save business. Please try again.");
      }
    };
  
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
          Add New Business
        </Text>
        <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
          Fill all details in order to add new business
        </Text>
  
        {/* Image Picker */}
        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => onImagePick()}>
          {!image ? (
            <Image
              source={require("./../../assets/images/placeholder.png")}
              style={{ width: 100, height: 100 }}
            />
          ) : (
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, borderRadius: 15 }}
            />
          )}
        </TouchableOpacity>
  
        {/* Input Fields */}
        <View>
          <TextInput
            placeholder="Name"
            onChangeText={(v) => setName(v)}
            style={styles.input}
          />
          <TextInput
            placeholder="Address"
            onChangeText={(v) => setAddress(v)}
            style={styles.input}
          />
          <TextInput
            placeholder="Contact"
            onChangeText={(v) => setContact(v)}
            style={styles.input}
          />
          <TextInput
            placeholder="Website"
            onChangeText={(v) => setWebsite(v)}
            style={styles.input}
          />
          <TextInput
            placeholder="About"
            onChangeText={(v) => setAbout(v)}
            multiline
            numberOfLines={5}
            style={[styles.input, { height: 100 }]}
          />
          {/* Dropdown Picker */}
          <DropDownPicker
            open={open}
            value={category}
            items={categoryList}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setCategoryList}
            placeholder="Select a category"
            style={styles.picker}
            dropDownContainerStyle={{
              borderColor: Colors.PRIMARY,
            }}
          />
        </View>
  
        {/* Submit Button */}
        <TouchableOpacity
          disabled={loading}
          style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 5,
            marginTop: 20,
          }}
          onPress={() => onAddNewBusiness()}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-medium",
                color: "#fff",
              }}
            >
              Add New Business
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = {
    input: {
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      fontSize: 17,
      backgroundColor: "#fff",
      marginTop: 10,
      borderColor: Colors.PRIMARY,
      fontFamily: "outfit",
    },
    picker: {
      borderWidth: 1,
      borderRadius: 5,
      marginTop: 10,
      borderColor: Colors.PRIMARY,
    },
  };