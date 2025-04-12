import React, { useState, useEffect } from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Keyboard, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByUserID, getCollectionByVendor } from '../../Services/FirebaseService';

function Vendor_Transactions({ navigation }) {

  const [user, setUser] = useState();
  const [transactions, setTransactions] = useState([]);
  const [loading, setloading] = useState(false);

  function formatTransactions(data) {
    return data.map((item, index) => {
      const dateObj = new Date(item.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      const formattedTime = dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      });

      return {
        id: index + 1,
        user: item.user ? item.user.charAt(0).toUpperCase() + item.user.charAt(1).toUpperCase() : '',
        orderNumber: `Order ${index + 1}`,
        date: formattedDate,
        time: formattedTime,
        timestamp: item.date,
        amount: parseFloat(item.amount)
      };
    });
  }

  useEffect(() => {
    const fetchUser = async () => {
      setloading(true);
      const user = await AsyncStorage.getItem("user");
      const userObject = JSON.parse(user);
      setUser(userObject);
      const transactionData = await getCollectionByVendor("Payments", userObject.businessName)
      const formattedData = formatTransactions(transactionData);
      setTransactions(formattedData);
      setloading(false);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#050C4D" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>My Transactions</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View></View>
      )}

      <View style={styles.transactionsContainer}>

        {transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{transaction.user}</Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.orderNumber}>{transaction.orderNumber}</Text>
                <Text style={styles.transactionDate}>
                  {transaction.date} • {transaction.time}
                </Text>
              </View>
            </View>
            <Text style={styles.transactionAmount}>${transaction.amount.toFixed(2)}</Text>
          </View>
        ))}
      </View>

    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 60,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginStart: 15,
    marginBottom: 28,
  },
  vendorProfile: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  vendorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  vendorInitials: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  vendorLabel: {
    color: 'black',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputLabel: {
    color: 'black',
    marginBottom: 8,
    fontSize: 14,
  },

  input: {
    backgroundColor: 'white',
    borderColor: "#B8B8B8FF",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  inputReadOnly: {
    backgroundColor: '#C2C1C1FF',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  summaryContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  summaryTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    color: 'white',
    fontSize: 14,
  },
  summaryValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 8,
  },
  generateButton: {
    backgroundColor: '#050C4D',
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginTop: 40,
  },
  generateButtonText: {
    color: '#FFFFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: '#050C4D',
    borderRadius: 4,
    padding: 15,
    paddingHorizontal: 48,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageButtonBefore: {
    backgroundColor: '#050C4D',
    borderRadius: 4,
    padding: 15,
    paddingHorizontal: 105,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageButtonText: {
    color: '#FFFFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  filenameText: {
    color: '#FFFFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },

  loading: {
    marginTop: 20,
  },

  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  uploadIcon: {
    marginRight: 10,
  },

  transactionsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 80,
    padding: 16,
  },
  transactionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontWeight: 'bold',
  },
  transactionDetails: {
    justifyContent: 'center',
  },
  orderNumber: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: '#666',
  },
  transactionAmount: {
    fontWeight: 'bold',
  },

});

export default Vendor_Transactions;
