import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Vendor_Home({ navigation }) {
  // Sample data (you would replace with your actual data)
  const earningsToday = 5440;
  const earningsYTD = 35440;
  const weeklyEarnings = [1500, 2300, 1800, 3200];
  const transactions = [
    { id: 1, user: 'AB', orderNumber: 'Order 1', date: 'Dec 2, 2024', time: '2:00 PM', amount: 166.00 },
    { id: 2, user: 'AB', orderNumber: 'Order 1', date: 'Dec 1, 2024', time: '10:02 AM', amount: 87.00 },
    { id: 3, user: 'AB', orderNumber: 'Order 1', date: 'Nov 30, 2024', time: '11:45 AM', amount: 87.00 },
  ];

  // Get the max value for the chart scaling
  const maxEarning = Math.max(...weeklyEarnings);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <Text style={styles.headerText}>Business Name</Text>

        {/* Earnings Card - Updated to match the image */}
        <View style={styles.cardContainer}>
          <View style={styles.cardSection}>
            <Text style={styles.cardLabel}>Earnings today</Text>
            <Text style={styles.cardAmount}>${earningsToday.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.cardSection}>
            <Text style={styles.cardLabel}>Earnings YTD</Text>
            <Text style={styles.cardAmount}>${earningsYTD.toLocaleString()}</Text>
          </View>
        </View>

        {/* Earnings Overview */}
        <View style={styles.overviewContainer}>
          <View style={styles.overviewHeader}>
            <Text style={styles.overviewTitle}>Earnings Overview</Text>
            <Text style={styles.overviewSubtitle}>Nov 1, 2024 - Nov 30, 2024</Text>
          </View>
          <Text style={styles.weeklyText}>Weekly</Text>

          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            {weeklyEarnings.map((earning, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height: (earning / maxEarning) * 100 }]} />
                <Text style={styles.barLabel}>Week {index + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
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
      </ScrollView>

      {/* Bottom Tab Navigation */}
      {/* <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="document-text-outline" size={24} color="gray" />
          <Text style={styles.tabLabelInactive}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="gray" />
          <Text style={styles.tabLabelInactive}>Account</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '500',
    marginHorizontal: 16,
    marginTop: 25,
    marginBottom: 26,
  },
  // Updated card styles to match the image
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#001155',
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 16,
  },
  cardSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  cardAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  overviewContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  overviewSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  weeklyText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  chartContainer: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: 16,
    backgroundColor: '#2196F3',
    borderRadius: 4,
    marginBottom: 6,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
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
//   tabContainer: {
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 60,
//     borderTopWidth: 1,
//     borderTopColor: '#F0F0F0',
//   },
//   tabItem: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabLabel: {
//     fontSize: 12,
//     color: 'black',
//     marginTop: 4,
//   },
//   tabLabelInactive: {
//     fontSize: 12,
//     color: 'gray',
//     marginTop: 4,
//   },
});

export default Vendor_Home;