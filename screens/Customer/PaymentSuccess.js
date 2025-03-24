import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function PaymentSuccess({ route, navigation }) {
  const { scannedData } = route.params; // Get scannedData from route params

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Payment Success</Text>

        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="checkmark" size={32} color="white" />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.message}>
          Your payment for Starbucks Coffee has been successfully done
        </Text>

        {/* Payment Amount */}
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentLabel}>Total Payment</Text>
          <Text style={styles.paymentAmount}>${scannedData}.00</Text>
        </View>
      </View>

      {/* Buttons at bottom of page */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => navigation.navigate('BottomTabNavigation')}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Payment')}
        >
          <Text style={styles.payAgainText}>Pay again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark blue background matching the image
  },
  backButton: {
    marginLeft: 26,
    marginTop: 36,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 80,
    marginTop: -180,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconBackground: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#008000', // Green background for checkmark
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00FF00', // Light green border
  },
  message: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 24,
  },
  paymentInfo: {
    marginBottom: 32,
  },
  paymentLabel: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  paymentAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  doneButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  doneButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#00205B',
  },
  payAgainText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },
});

export default PaymentSuccess;
