import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';
import BusinessListCard from '../../components/BusinessList/BusinessListCard';
import { Colors } from '../../constants/Colors';

export default function BusinessListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const [vendorList, setVendorList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
      headerTintColor: Colors.WHITE,
      headerBackTitle: 'Back',
      headerBackTitleStyle: {
        fontFamily: 'outfit-bold',
        fontSize: 16,
        color: Colors.WHITE,
      },
      headerTitleStyle: {
        fontFamily: 'outfit-bold',
        fontSize: 18,
        color: Colors.WHITE,
      },
    });
    getVendorList();
  }, []);

  /**
   * Fetch business list by category.
   */
  const getVendorList = async () => {
    setLoading(true);

    // Reset vendorList before fetching new data
    setVendorList([]);

    try {
      const q = query(
        collection(db, 'VendorList'),
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);

      // Collect all documents into a new array
      const fetchedVendors = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update vendorList with the new data
      setVendorList(fetchedVendors);
    } catch (error) {
      console.error('Error fetching vendor list:', error);
    }

    setLoading(false);
  };

  return (
    <View>
      {vendorList?.length > 0 && !loading ? (
        <FlatList
          data={vendorList}
          onRefresh={getVendorList}
          refreshing={loading}
          keyExtractor={(item) => item.id} // Use unique ID as key
          renderItem={({ item }) => <BusinessListCard business={item} />}
        />
      ) : loading ? (
        <ActivityIndicator
          style={{
            marginTop: '60%',
          }}
          size={'large'}
          color={Colors.PRIMARY}
        />
      ) : (
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
            color: Colors.GRAY,
            textAlign: 'center',
            marginTop: '50%',
          }}
        >
          No Vendors Found
        </Text>
      )}
    </View>
  );
}