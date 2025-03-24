import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

function Vendor_ScanToPay({ route, navigation }) {
  const { qrData } = route.params; // Retrieve QR data passed via navigation

  // Safely handle qrData
  const qrValue = qrData && !isNaN(parseFloat(qrData)) ? parseFloat(qrData).toFixed(2) : 'Invalid Data';

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Scan to Pay</Text>

      {/* QR Code Container */}
      <View style={styles.qrContainer}>
        {qrData ? (
          <QRCode value={qrData} size={200} />
        ) : (
          <Text style={styles.amount}>Invalid QR Data</Text>
        )}
      </View>

      {/* Amount */}
      <Text style={styles.amount}>${qrValue}</Text> {/* Display total */}

      {/* Discount Info */}
      <View style={styles.discountContainer}>
        <Ionicons name="information-circle-outline" size={16} color="#8F8F8F" />
        <Text style={styles.discountText}>Discount of $2 has been applied</Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001465',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 60,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  amount: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 40,
  },
  discountText: {
    color: '#8F8F8F',
    fontSize: 14,
    marginLeft: 6,
  },
  bottomButtons: {
    marginTop: 'auto',
    gap: 16,
  },
  doneButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#001465',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 8,
  },
});

export default Vendor_ScanToPay;
