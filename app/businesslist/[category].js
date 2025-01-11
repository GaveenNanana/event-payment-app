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
      headerTintColor: Colors.WHITE, // Change the back button and title color
      headerBackTitle: 'Back', // Text for the back button
      headerBackTitleStyle: {
        fontFamily: 'outfit-bold', // Customize font
        fontSize: 16,
        color: Colors.WHITE,
      },
      headerTitleStyle: {
        fontFamily: 'outfit-bold', // Customize title font
        fontSize: 18,
        color: Colors.WHITE,
      },
    });
    getVendorList();
  }, []);

  /**
   * Used to get business list by category
   */
  const getVendorList = async () => {
    setLoading(true);
    const q = query(
      collection(db, 'VendorList'),
      where('category', '==', category)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setVendorList((prev) => [...prev, { id: doc?.id, ...doc.data() }]);
    });
    setLoading(false);
  };

  return (
    <View>
      {vendorList?.length > 0 && loading == false ? (
        <FlatList
          data={vendorList}
          onRefresh={getVendorList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <BusinessListCard business={item} key={index} />
          )}
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