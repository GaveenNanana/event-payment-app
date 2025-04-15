import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Make sure to import useNavigation hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCollection } from '../../Services/FirebaseService';

const CategoryItem = ({ icon, title, navigation }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={() => navigation.navigate('VendorList', { category_name: title })}>
    <View style={styles.categoryIcon}>
      <Image source={icon} style={styles.iconImage} />
    </View>
    <Text style={styles.categoryText}>{title}</Text>
  </TouchableOpacity>
);

const PlaceCard = ({ title, businessCategory, imageURL, description, rating, navigation }) => (
  <TouchableOpacity style={styles.placeCard} onPress={() => navigation.navigate('SingleBusinessView', { vendor_name: title })}>
    <Image
      source={{ uri: imageURL }}
      style={styles.placeImage}
    />
    <Text style={styles.placeTitle}>{title}</Text>
    <Text style={styles.placeDescription}>{description}</Text>
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{businessCategory}</Text>
      <View style={styles.ratingValue}>
        <Text>{rating}</Text>
        <Ionicons name="star" size={16} color="#FFD700" />
      </View>
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const [user, setUser] = useState();
  const [vendors, setvendors] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const userObject = JSON.parse(user);
      setUser(userObject);
      const vendors = await getCollection("users");
      const selectedData = vendors.slice(0, 3);
      setvendors(selectedData);
    };
    fetchUser();
  }, []);


  const navigation = useNavigation(); // Access navigation

  const categories = [
    { icon: require('../../assets/home_img/1.png'), title: 'Light Food' },
    { icon: require('../../assets/home_img/2.png'), title: 'Asian Cuisine' },
    { icon: require('../../assets/home_img/3.png'), title: 'Burgers' },
    { icon: require('../../assets/home_img/4.png'), title: 'Hot Dogs' },
    { icon: require('../../assets/home_img/5.png'), title: 'Ramen' },
    { icon: require('../../assets/home_img/6.png'), title: 'Desserts' },
    { icon: require('../../assets/home_img/7.png'), title: 'Japanese Cuisine' },
    { icon: require('../../assets/home_img/8.png'), title: 'Fast Food' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          {user && <Text style={styles.userName}>{user.displayName}</Text>}
        </View>

        <TouchableOpacity style={styles.paymentCardContainer} onPress={() => navigation.navigate('Create')}>
          <ImageBackground
            source={require('../../assets/home_img/banner/home_b2.jpg')}
            style={styles.paymentCard}
            imageStyle={styles.paymentCardImage}
          >
          </ImageBackground>
        </TouchableOpacity>

        {/* Categories Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <CategoryItem
                key={index}
                icon={category.icon}
                title={category.title}
                navigation={navigation}
              />
            ))}
          </View>
        </View>

        {/* Places Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Places you might like</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.placesContainer}
          >

            {vendors && vendors.map((vendor, index) => (
              <TouchableOpacity
                key={index}>
                <PlaceCard
                  key={index}
                  title={vendor.businessName}
                  category={vendor.businessCategory}
                  imageURL={vendor.imageURL}
                  description={vendor.about}
                  rating="4.90"
                  navigation={navigation}
                />
              </TouchableOpacity>
            ))}

          </ScrollView>
        </View>

        <View style={styles.section}></View>
        <View style={styles.section}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 16,
  },
  welcomeText: {
    marginTop: 16,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: -13,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  categoryText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: '20',
  },
  placesContainer: {
    flexDirection: 'row',
  },
  placeCard: {
    width: 250,
    height: 250,
    marginRight: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeImage: {
    width: '100%',
    height: 130,
    backgroundColor: '#e0e0e0',
  },
  placeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
  },
  placeDescription: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  ratingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  paymentCardContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  paymentCard: {
    height: 110,
    justifyContent: 'center',
  },
  paymentCardImage: {
    borderRadius: 12,
    width: '100%',
  },
  paymentOverlay: {
    backgroundColor: 'rgba(26, 35, 126, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    height: '100%',
  },
  paymentContent: {
    flex: 1,
  },
  paymentText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  payNowText: {
    color: 'white',
    marginTop: 8,
  },
  qrContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 8,
  },
});

export default Home;