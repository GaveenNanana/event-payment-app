import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Favourites({ navigation }) {
  // Sample data for the favorites list
  const favourites = [
    { id: '1', name: 'Vendor name', details: 'Cornello.difficultatesdwedwed...', price: '5.00' },
    { id: '2', name: 'Vendor name', details: 'Cornello.difficultatesdwedwed...', price: '5.00' },
    { id: '3', name: 'Vendor name', details: 'Cornello.difficultatesdwedwed...', price: '5.00' },
    { id: '4', name: 'Vendor name', details: 'Cornello.difficultatesdwedwed...', price: '5.00' },
    { id: '5', name: 'Vendor name', details: 'Cornello.difficultatesdwedwed...', price: '5.00' },
    { id: '6', name: 'Vendor name', details: 'Cornello.difficultatesdwedwed...', price: '5.00' },
    { id: '7', name: 'Vendor name', details: 'Cornello.difficultatesdwedwed...', price: '5.00' },
    { id: '8', name: 'Vendor name', details: 'Cornello.difficultatesdwedwed...', price: '5.00' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>AB</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.vendorName}>{item.name}</Text>
        <Text style={styles.vendorDetails}>{item.details}</Text>
      </View>
      {item.price && (
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{item.price}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Favourites</Text>

      <FlatList
        data={favourites}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 16,

  },
  itemContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    flex: 1,
  },
  vendorName: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 2,
  },
  vendorDetails: {
    color: '#888',
    fontSize: 13,
  },
  priceContainer: {
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    color: '#333',
  },
});

export default Favourites;