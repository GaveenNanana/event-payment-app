import { View, Text, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function Explore() {
    const [businessList, setBusinessList] = useState([]);
    const [filteredBusinessList, setFilteredBusinessList] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All"); // Track selected category

    // Fetch all businesses on initial load
    useEffect(() => {
        const fetchAllBusinesses = async () => {
            const q = query(collection(db, "VendorList"));
            const querySnapshot = await getDocs(q);

            const allBusinesses = [];
            querySnapshot.forEach((doc) => {
                allBusinesses.push({ id: doc.id, ...doc.data() });
            });

            setBusinessList(allBusinesses);
            setFilteredBusinessList(allBusinesses);
        };

        fetchAllBusinesses();
    }, []);

    // Handle search input and bypass category selection
    const handleSearch = (input) => {
        setSearchInput(input);

        if (input.trim() === "") {
            // If the search input is empty, show businesses based on the selected category
            if (selectedCategory === "All") {
                setFilteredBusinessList(businessList);
            } else {
                const filteredByCategory = businessList.filter(
                    (business) => business.category === selectedCategory
                );
                setFilteredBusinessList(filteredByCategory);
            }
        } else {
            // Filter businesses across all categories based on search input
            const filtered = businessList.filter((business) =>
                business.name.toLowerCase().includes(input.toLowerCase())
            );
            setFilteredBusinessList(filtered);
        }
    };

    // Fetch businesses by category
    const getBusinessByCategory = async (category) => {
        setSelectedCategory(category); // Update selected category
        setSearchInput(""); // Clear search input when selecting a category

        if (category === "All") {
            // Show all businesses if "All" is selected
            setFilteredBusinessList(businessList);
        } else {
            // Fetch businesses by category
            const filteredByCategory = businessList.filter(
                (business) => business.category === category
            );
            setFilteredBusinessList(filteredByCategory);
        }
    };

    return (
        <View
            style={{
                padding: 16,
                marginTop: 60,
            }}
        >
            <Text
                style={{
                    fontFamily: "outfit-bold",
                    fontSize: 30,
                }}
            >
                Explore More
            </Text>

            {/* Search Bar */}
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    backgroundColor: "#fff",
                    padding: 10,
                    marginVertical: 10,
                    marginTop: 15,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: Colors.PRIMARY,
                }}
            >
                <Ionicons name="search" size={24} color={Colors.PRIMARY} />
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor={'#888'}
                    value={searchInput}
                    onChangeText={(input) => handleSearch(input)} // Update search input
                    style={{
                        fontFamily: "outfit",
                        fontSize: 16,
                        flex: 1,
                    }}
                />
            </View>

            {/* Category */}
            <Category
                explore={true}
                onCategorySelect={(category) => getBusinessByCategory(category)}
                selectedCategory={selectedCategory} // Pass selected category for UI updates
            />

            {/* Business List */}
            <ExploreBusinessList businessList={filteredBusinessList} />
        </View>
    );
}