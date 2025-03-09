import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Vendor_Withdraw_Earnings({ navigation }) {
  const [availableBalance, setAvailableBalance] = useState(1200.00);
  const [withdrawalMethod, setWithdrawalMethod] = useState({
    title: 'My bank account',
    number: '0321'
  });

  // Check if button should be disabled (when balance is 0)
  const isWithdrawDisabled = availableBalance <= 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Withdraw Earnings</Text>
        </View>

        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Available balance</Text>
          <Text style={styles.balanceAmount}>${availableBalance.toFixed(2)}</Text>
        </View>

        <View style={styles.methodContainer}>
          <Text style={styles.methodLabel}>Withdrawal Method</Text>
          
          <View style={styles.methodItemContainer}>
            <Text style={styles.methodItemText}>
              {withdrawalMethod.title} - {withdrawalMethod.number}
            </Text>
          </View>

          <TouchableOpacity style={styles.addMethodButton} onPress={() => navigation.navigate('Vendor_Bank_Details')}>
            <Text style={styles.addMethodText}>Add Method</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.withdrawButton,
              isWithdrawDisabled && styles.withdrawButtonDisabled
            ]}
            disabled={isWithdrawDisabled}
            onPress={() => {
              // Withdrawal logic would go here
              if (!isWithdrawDisabled) {
                console.log('Processing withdrawal...');
              }
            }}
          >
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  headerContainer: {
    marginTop: 8,
    marginBottom: 24,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  balanceContainer: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: '600',
    color: 'green',
  },
  methodContainer: {
    marginBottom: 24,
  },
  methodLabel: {
    fontSize: 16,
    color: 'black',
    marginBottom: 12,
  },
  methodItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    paddingBottom: 8,
    marginBottom: 8,
  },
  methodItemText: {
    fontSize: 16,
    color: 'black',
  },
  addMethodButton: {
    marginTop: 4,
  },
  addMethodText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
    textDecorationLine: 'underline', // Added underline here
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingVertical: 24,
  },
  withdrawButton: {
    backgroundColor: '#0A1551',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  withdrawButtonDisabled: {
    backgroundColor: '#CCCCCC', // Gray color when disabled
  },
  withdrawButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Vendor_Withdraw_Earnings;