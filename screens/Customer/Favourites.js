import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getCollectionByUserID } from '../../Services/FirebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Favourites({ navigation }) {
  const [favourites, setfavourites] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        setloading(true);
        const userValue = await AsyncStorage.getItem('user');
        const user = JSON.parse(userValue);
        const records = await getCollectionByUserID('Favourites', user.uid);
        setfavourites(records);
        setloading(false);

      } catch (error) {
        console.error('Error retrieving Receipts data:', error);
        Alert.alert('Error', 'Failed to load Receipts data.');
      }
    };

    fetchFavourites();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => { navigation.navigate('SingleBusinessView', { vendor_name: item.name }) }}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: item.img }}
          style={styles.mainImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.vendorName}>{item.name}</Text>
        <Text style={styles.vendorDetails}>{item.details}</Text>
      </View>
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

      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <View></View>
      )}

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
  mainImage: {
    width: '100%',
    height: '100%',
  },
  loading: {
    padding: 10,
  }
});

export default Favourites;