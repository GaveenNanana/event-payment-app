import { View, Text, Image } from 'react-native';
import React from 'react';

export default function UserIntro() {
    // Dummy user object for testing
    const user = {
        imageUrl: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png", // Placeholder image
        fullName: "John Doe", // Dummy name
        primaryEmailAddress: {
            emailAddress: "johndoe@example.com", // Dummy email
        },
    };

    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 32,
            }}
        >
            <Image
                source={{ uri: user?.imageUrl }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 99,
                }}
            />
            <Text
                style={{
                    fontFamily: "outfit-bold",
                    fontSize: 20,
                }}
            >
                {user?.fullName}
            </Text>
            <Text
                style={{
                    fontFamily: "outfit",
                    fontSize: 16,
                }}
            >
                {user?.primaryEmailAddress?.emailAddress}
            </Text>
        </View>
    );
}