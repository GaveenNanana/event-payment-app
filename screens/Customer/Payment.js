import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Payment({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.laterButton} onPress={() => navigation.navigate('BottomTabNavigation')}>
          <Text style={styles.laterText}>DO THIS LATER</Text>
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <Text style={styles.title}>Add a payment method</Text>
      
      {/* Payment method option with image */}
      <TouchableOpacity style={styles.paymentOption} onPress={() => navigation.navigate('AddCard')}>
        <Image 
          source={require('../../assets/home_img/9.png')} 
          style={styles.cardImage} 
          resizeMode="contain"
        />
        <Text style={styles.paymentOptionText}>Credit or Debit Card</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D',  // Deep navy blue
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  backButton: {
    padding: 8,
  },
  laterButton: {
    padding: 8,
  },
  laterText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    paddingHorizontal: 14,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 14,

  },
  cardImage: {
    width: 34,
    height: 34,
    marginRight: 12,
  },
  paymentOptionText: {
    color: 'white',
    fontSize: 16,
  }
});

export default Payment;