import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../../configs/FirebaseConfig';
import BusinessListCard from '../../components/Explore/BusinessListCard';
import { useNavigation } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function AllBusinesses() {
    const [businessList, setBusinessList] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    // Fetch all businesses from Firestore
    const fetchAllBusinesses = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'VendorList'));
            const businesses = [];
            querySnapshot.forEach((doc) => {
                businesses.push({ id: doc.id, ...doc.data() });
            });
            setBusinessList(businesses);
            console.log('All businesses fetched:', businesses);
        } catch (error) {
            console.error('Error fetching businesses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            headerShown: false, // Custom header
        });

        fetchAllBusinesses();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {/* Header with Back Button */}
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    paddingTop: 60,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 20,
                        color: '#fff',
                        marginLeft: 10,
                    }}
                >
                    All Businesses
                </Text>
            </View>

            {/* Main Content */}
            <View style={{ padding: 20, flex: 1, backgroundColor: '#fff' }}>
                <Text style={{ fontFamily: 'outfit-bold', fontSize: 30, marginBottom: 20 }}>
                    All Businesses
                </Text>

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.PRIMARY} />
                ) : businessList.length === 0 ? (
                    <Text
                        style={{
                            fontFamily: 'outfit',
                            fontSize: 16,
                            textAlign: 'center',
                            color: Colors.GRAY,
                        }}
                    >
                        No businesses found.
                    </Text>
                ) : (
                    <FlatList
                        data={businessList}
                        keyExtractor={(item) => item.id}
                        onRefresh={fetchAllBusinesses}
                        refreshing={loading}
                        renderItem={({ item }) => <BusinessListCard business={item} />}
                    />
                )}
            </View>
        </View>
    );
}