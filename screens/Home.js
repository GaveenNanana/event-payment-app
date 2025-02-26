import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const CategoryItem = ({ icon, title }) => (
  <TouchableOpacity style={styles.categoryItem}>
    <View style={styles.categoryIcon}>
      <Image source={icon} style={styles.iconImage} />
    </View>
    <Text style={styles.categoryText}>{title}</Text>
  </TouchableOpacity>
);

const PlaceCard = ({ title, description, rating }) => (
  <TouchableOpacity style={styles.placeCard}>
    <Image 
      source={require('../assets/home_img/banner/home_b1.jpg')} 
      style={styles.placeImage}
    />
    <Text style={styles.placeTitle}>{title}</Text>
    <Text style={styles.placeDescription}>{description}</Text>
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>Category</Text>
      <View style={styles.ratingValue}>
        <Text>{rating}</Text>
        <Ionicons name="star" size={16} color="#FFD700" />
      </View>
    </View>
  </TouchableOpacity>
);

const Home = () => {
  const categories = [
    { icon: require('../assets/home_img/1.png'), title: 'Italian' },
    { icon: require('../assets/home_img/2.png'), title: 'Italian' },
    { icon: require('../assets/home_img/3.png'), title: 'Italian' },
    { icon: require('../assets/home_img/4.png'), title: 'Italian' },
    { icon: require('../assets/home_img/5.png'), title: 'Italian' },
    { icon: require('../assets/home_img/6.png'), title: 'Italian' },
    { icon: require('../assets/home_img/7.png'), title: 'Italian' },
    { icon: require('../assets/home_img/8.png'), title: 'Italian' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome,</Text>
          <Text style={styles.userName}>Gaveen Nanayakkara</Text>
        </View>

        {/* Payment Card */}
        {/* <TouchableOpacity style={styles.paymentCard}>
          <View style={styles.paymentContent}>
            <Text style={styles.paymentText}>Payments easier than ever</Text>
            <Text style={styles.payNowText}>Pay now →</Text>
          </View>
          <View style={styles.qrContainer}>
            <Ionicons name="qr-code-outline" size={24} color="white" />
          </View>
        </TouchableOpacity> */}
         {/* Payment Card with Background Image */}
         <TouchableOpacity style={styles.paymentCardContainer}>
          <ImageBackground
            source={require('../assets/home_img/banner/home_b2.jpg')} 
            style={styles.paymentCard}
            imageStyle={styles.paymentCardImage}
          >
            {/* <View style={styles.paymentOverlay}>
              <View style={styles.paymentContent}>
                <Text style={styles.paymentText}>Payments easier than ever</Text>
                <Text style={styles.payNowText}>Pay now →</Text>
              </View>
              <View style={styles.qrContainer}>
                <Ionicons name="qr-code-outline" size={24} color="white" />
              </View>
            </View> */}
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
            <PlaceCard
              title="Heading"
              description="Consilio difficultates superare potest esse, immo"
              rating="5.00"
            />
            <PlaceCard
              title="Heading"
              description="Consilio difficultates superare potest esse, immo"
              rating="5.00"
            />
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