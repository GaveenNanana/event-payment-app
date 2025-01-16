import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";

export default function Reviews({ business }) {
    // Dummy user
    const user = {
        role: "user",
        email: "user@example.com",
        name: "Test User",
        image: "https://cdn-icons-png.flaticon.com/128/2202/2202112.png", // Placeholder image
    };

    const [rating, setRating] = useState(4);
    const [userInput, setUserInput] = useState("");
    const [reviews, setReviews] = useState(business?.reviews || []);

    const onSubmit = async () => {
        if (!userInput) {
            console.error("Comment is empty!");
            return;
        }

        if (!business?.id) {
            console.error("Invalid business ID!");
            return;
        }

        const newReview = {
            rating: rating,
            comment: userInput,
            userName: user.name,
            userImage: user.image, // Correct field
            userEmail: user.email,
        };

        try {
            const docRef = doc(db, "VendorList", business?.id);

            await updateDoc(docRef, {
                reviews: arrayUnion(newReview),
            });

            // Update local state
            setReviews((prev) => [...prev, newReview]);
            setUserInput("");
            setRating(4);

            console.log("Comment added successfully!");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const onDeleteReview = async (review) => {
        if (!business?.id) {
            console.error("Invalid business ID!");
            return;
        }

        Alert.alert(
            "Delete Review",
            "Are you sure you want to delete your review?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const docRef = doc(db, "VendorList", business?.id);

                            console.log("Deleting Review:", review); // Debug: Log the review to be deleted

                            await updateDoc(docRef, {
                                reviews: arrayRemove(review), // Exact match required
                            });

                            // Update local state
                            setReviews((prev) =>
                                prev.filter(
                                    (item) =>
                                        item.comment !== review.comment ||
                                        item.userEmail !== review.userEmail // Compare key fields
                                )
                            );

                            console.log("Review deleted successfully!");
                        } catch (error) {
                            console.error("Error deleting review:", error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={{ padding: 20, backgroundColor: "#fff" }}>
            <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>Reviews</Text>

            {/* Submit Review Section */}
            <View>
                <Rating
                    showRating={false}
                    imageSize={20}
                    onFinishRating={(rating) => setRating(rating)}
                    style={{ paddingVertical: 10 }}
                />

                <TextInput
                    placeholder="Write your comment"
                    multiline={true}
                    value={userInput}
                    onChangeText={(value) => setUserInput(value)}
                    style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.GRAY,
                        textAlignVertical: "top",
                        height: 100,
                    }}
                />

                <TouchableOpacity
                    disabled={!userInput}
                    onPress={onSubmit}
                    style={{
                        padding: 10,
                        backgroundColor: Colors.PRIMARY,
                        borderRadius: 6,
                        marginTop: 10,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "outfit",
                            color: "#fff",
                            textAlign: "center",
                        }}
                    >
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Display Previous Reviews */}
            <View>
                {reviews.map((item, index) => (
                    <View
                        key={index}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                            padding: 10,
                            borderWidth: 1,
                            borderColor: Colors.GRAY,
                            borderRadius: 15,
                            marginTop: 10,
                        }}
                    >
                        <Image
                            source={{ uri: item.userImage }}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 99,
                            }}
                        />
                        <View style={{ flex: 1, display: "flex", gap: 5 }}>
                            <Text
                                style={{
                                    fontFamily: "outfit-medium",
                                }}
                            >
                                {item.userName}
                            </Text>
                            <Rating
                                imageSize={20}
                                readonly
                                startingValue={item.rating}
                                style={{ alignItems: "flex-start" }}
                            />
                            <Text>{item.comment}</Text>
                        </View>
                        {/* Show Delete Button Only for the Logged-in User's Reviews */}
                        {item.userEmail === user.email && (
                            <TouchableOpacity onPress={() => onDeleteReview(item)}>
                                <Text
                                    style={{
                                        color: "red",
                                        fontSize: 14,
                                        fontFamily: "outfit-medium",
                                    }}
                                >
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}