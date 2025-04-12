import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getCollectionByCategory } from '../../Services/FirebaseService';

function VendorList({ route, navigation }) {
  const { category_name } = route.params;
  const [vendors, setvendors] = useState([]);
  const [loading, setloading] = useState(false);

  const PlaceCard = ({ title, businessCategory, imageURL, description, rating }) => (
    <TouchableOpacity
      style={styles.placeCard}
      onPress={() => navigation.navigate('SingleBusinessView', { vendor_name: title })}
    >
      <Image source={{ uri: imageURL }} style={styles.placeImage} />
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

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setloading(true);
        const vendors = await getCollectionByCategory("users", category_name);
        setvendors(vendors);
        setloading(false);
      } catch (error) {
        console.error('Error retrieving vendors:', error);
      }
    };
    fetchVendors();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>{category_name} - Vendors</Text>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <View></View>
      )}

      <FlatList
        data={vendors}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <PlaceCard
            title={item.businessName}
            businessCategory={item.businessCategory}
            imageURL={item.imageURL}
            description={item.about}
            rating="4.90"
          />
        )}
      />
    </SafeAreaView>
  );
}

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2; // 2 cards with 16px padding on each side and between

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  placeCard: {
    width: cardWidth,
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
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  placeDescription: {
    fontSize: 13,
    color: '#666',
    paddingHorizontal: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  ratingValue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  loading: {
    padding: 10,
  }
});

export default VendorList;
