import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { getCollectionByUserID } from '../../Services/FirebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Receipts({ navigation }) {
  const [receiptsData, setReceiptsData] = useState();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        setloading(true);
        const userValue = await AsyncStorage.getItem('user');
        const user = JSON.parse(userValue);

        const records = await getCollectionByUserID('Payments', user.uid);
        setReceiptsData(records);
        setloading(false);

      } catch (error) {
        console.error('Error retrieving Receipts data:', error);
        Alert.alert('Error', 'Failed to load Receipts data.');
      }
    };

    fetchReceipts();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Receipts</Text>

      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : (
        <View></View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {receiptsData && (receiptsData.map((item) => (
          <View key={item.id} style={styles.receiptItem}>
            <View style={styles.leftContainer}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>AB</Text>
              </View>
              <View style={styles.receiptDetails}>
                <Text style={styles.vendorName}>{item.vendor}</Text>
                <View style={styles.amountDateContainer}>
                  <Text style={styles.amount}>${item.amount}</Text>
                  <Text style={styles.date}>
                    {new Date(item.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                    })}
                  </Text>

                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        )))}
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    marginLeft: 5,
    fontSize: 30,
    fontWeight: 'bold',
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
  },
  receiptItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    marginBottom: 1,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  receiptDetails: {
    marginLeft: 12,
  },
  vendorName: {
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 2,
  },
  amountDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  viewButton: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  viewButtonText: {
    color: '#444',
    fontSize: 13,
  },
  loading: {
    padding: 10,
  }
});

export default Receipts;