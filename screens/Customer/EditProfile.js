import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { COLORS, FONTS } from "../../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { imagesDataURL } from "../../constants/data";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addImage, updateDocument } from '../../Services/FirebaseService';

const EditProfile = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageMeta, setSelectedImageMeta] = useState();
  const [name, setName] = useState("Melissa Peters");
  const [email, setEmail] = useState("metperters@gmail.com");
  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const [user, setUser] = useState();
  const [loading, setloading] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userValue = await AsyncStorage.getItem('user');
        if (userValue !== null) {
          const user = JSON.parse(userValue);
          setUser(user);
          setSelectedImage(user.profileImage);
          setName(user.displayName);
          setEmail(user.email);
        } else {
          Alert.alert('No User', 'User data not found, please log in again.');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
        Alert.alert('Error', 'Failed to load user data.');
      }
    };
    fetchUser();
  }, []);

  const updateProfile = async () => {
    setloading(true);
    try {
      const imageMeta = await addImage(selectedImageMeta, "customer");
      if (imageMeta.success) {
        console.log("Image uploaded to Firebase:", imageMeta.url);
        const userObj = {
          profileImage: `${imageMeta.url}`,
        };
        const docRef = await updateDocument("Customers", user.id, userObj);

        const userValue = JSON.stringify({
          ...user,
          profileImage: userObj.profileImage,
        });
        await AsyncStorage.setItem('user', userValue);
        setloading(false);
        navigation.navigate('BottomTabNavigation');
      } else {
        setloading(false);
        alert("Image upload failed: " + imageMeta.error);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }

  }

  const handleImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setSelectedImageMeta(result.assets[0]);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.primary,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name="photo-camera"
                size={32}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Name</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
                backgroundColor: '#C2C1C1FF'
              }}
            >
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable={false}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Email</Text>
            <View
              style={{
                height: 44,
                width: "100%",
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: "center",
                paddingLeft: 8,
                backgroundColor: '#C2C1C1FF'
              }}
            >
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable={false}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={updateProfile}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>

        {loading ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : (
          <View></View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loading: {
    padding: 10,
  }
});
export default EditProfile;
