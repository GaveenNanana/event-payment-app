import { View, FlatList } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businessList }) {
  return (
    <FlatList
      data={businessList}
      renderItem={({ item, index }) => (
        <BusinessListCard key={index} business={item} />
      )}
      keyExtractor={(item, index) => index.toString()} // Add a keyExtractor for better performance
      ListFooterComponent={() => (
        <View
          style={{
            height: 200, // Spacer at the bottom
          }}
        />
      )}
    />
  );
}