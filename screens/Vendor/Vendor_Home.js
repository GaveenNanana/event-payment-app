import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserByUserID, getCollectionByVendor } from '../../Services/FirebaseService';

function Vendor_Home({ navigation }) {
  const [user, setUser] = useState();
  const [currentTotal, setCurrentTotal] = useState(0);
  const [ytdTotal, setYtdTotal] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setchartData] = useState([]);
  const [loading, setloading] = useState(false);
  const [selectedTransactions, setselectedTransactions] = useState([]);

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

  function getTodayTotal(transactions) {
    const today = new Date();
    return transactions.reduce((total, tx) => {
      const txDate = new Date(tx.timestamp);
      if (
        txDate.getDate() === today.getDate() &&
        txDate.getMonth() === today.getMonth() &&
        txDate.getFullYear() === today.getFullYear()
      ) {
        return total + tx.amount;
      }
      return total;
    }, 0);
  }

  function getYearToDateTotal(transactions) {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    return transactions.reduce((total, tx) => {
      const txDate = new Date(tx.timestamp);
      if (txDate >= startOfYear && txDate <= today) {
        return total + tx.amount;
      }
      return total;
    }, 0);
  }

  function getMonthlyTotals(transactions) {
    const result = [];
    const currentYear = new Date().getFullYear();

    // Initialize all 12 months with 0 totals
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthTotals = new Array(12).fill(0); // index 0 = Jan

    transactions.forEach(tx => {
      const txDate = new Date(tx.timestamp);
      if (txDate.getFullYear() === currentYear) {
        const monthIndex = txDate.getMonth(); // 0 for Jan, 11 for Dec
        monthTotals[monthIndex] += tx.amount;
      }
    });

    for (let i = 0; i < 12; i++) {
      result.push({
        month: months[i],
        amount: parseFloat(monthTotals[i].toFixed(2)) // optional rounding
      });
    }

    return result;
  }

  function getMaxAmount(transactions) {
    if (transactions.length === 0) return 0;
    return transactions.reduce((max, tx) => {
      return tx.amount > max ? tx.amount : max;
    }, 0);
  }

  useEffect(() => {
    const loadInitDate = async () => {
      setloading(true);
      const user = await AsyncStorage.getItem("user");
      const userObject = JSON.parse(user);
      setUser(userObject);
      const transactionData = await getCollectionByVendor("Payments", userObject.businessName)
      const formattedData = formatTransactions(transactionData);
      setTransactions(formattedData);
      const selectedData = formattedData
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 5);
      setselectedTransactions(selectedData);
      const todayTotal = getTodayTotal(formattedData);
      const ytdTotal = getYearToDateTotal(formattedData);
      setCurrentTotal(todayTotal);
      setYtdTotal(ytdTotal);
      const monthData = getMonthlyTotals(formattedData);
      setchartData(monthData);
      setloading(false);

    };
    loadInitDate();
  }, []);

  const maxEarning = getMaxAmount(chartData);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        {user && <Text style={styles.headerText}>{user.businessName}</Text>}

        <View style={styles.cardContainer}>
          <View style={styles.cardSection}>
            <Text style={styles.cardLabel}>Earnings today</Text>
            <Text style={styles.cardAmount}>${currentTotal.toLocaleString()}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.cardSection}>
            <Text style={styles.cardLabel}>Earnings YTD</Text>
            <Text style={styles.cardAmount}>${ytdTotal.toLocaleString()}</Text>
          </View>
        </View>

        {/* Earnings Overview */}
        <View style={styles.overviewContainer}>
          <View style={styles.overviewHeader}>
            <Text style={styles.overviewTitle}>Earnings Overview</Text>
            <Text style={styles.overviewSubtitle}>2024 - 2025</Text>
          </View>
          <Text style={styles.weeklyText}>Yearly</Text>

          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View></View>
          )}

          {/* Bar Chart */}
          <View style={styles.chartContainer}>

            {chartData.map((monthObject, index) => (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height: (monthObject.amount / maxEarning) * 100 }]} />
                <Text style={styles.barLabel}>{monthObject.month}</Text>
              </View>
            ))}

          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsContainer}>
          <Text style={styles.transactionsTitle}>Recent Transactions</Text>
          {selectedTransactions.map((transaction) => (
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