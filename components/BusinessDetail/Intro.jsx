import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../configs/FirebaseConfig';

export default function Intro({ business }) {
    const router = useRouter();

    const user = {
        email: "testuser@example.com", // Dummy user for testing
    };

    const OnDelete = () => {
        Alert.alert(
            'Delete Business',
            'Are you sure you want to delete this business?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: deleteBusiness },
            ]
        );
    };

    const deleteBusiness = async () => {
        try {
            console.log("Deleting Business...");
            await deleteDoc(doc(db, 'VendorList', business?.id));
            Alert.alert('Success', 'Business deleted successfully!');
            router.back();
        } catch (error) {
            console.error('Error deleting business:', error);
            Alert.alert('Error', 'Failed to delete the business. Please try again.');
        }
    };

    console.log("business.userEmail:", business?.userEmail, "user.email:", user.email);

    return (
        <View>
            <View
                style={{
                    position: 'absolute',
                    zIndex: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: 20,
                    marginTop: 36,
                }}
            >
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back-circle" size={40} color="white" />
                </TouchableOpacity>
                <Ionicons name="heart-outline" size={40} color="white" />
            </View>
            <Image
                source={{ uri: business?.imageUrl }}
                style={{
                    width: '100%',
                    height: 340,
                }}
            />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 20,
                    marginTop: -20,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                }}
            >
                <View>
                    <Text style={{ fontSize: 26, fontFamily: 'outfit-bold' }}>
                        {business?.name}
                    </Text>
                    <Text style={{ fontFamily: 'outfit', fontSize: 18 }}>
                        {business?.address}
                    </Text>
                </View>
                {business?.userEmail === user.email && (
                    <TouchableOpacity
                        onPress={OnDelete}
                        style={{
                            backgroundColor: '#fff',
                            padding: 8,
                        }}
                    >
                        <Ionicons name="trash" size={24} color="red" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}