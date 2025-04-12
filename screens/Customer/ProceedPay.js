import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { CardField, CardForm, useStripe, StripeProvider } from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addDocument } from '../../Services/FirebaseService';

function ProceedPay({ route, navigation }) {
  const { scannedData } = route.params;
  const { presentPaymentSheet, initPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const { confirmPayment } = useStripe();
  const [cardDetails, setCardDetails] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleString('default', { weekday: 'short' })}, ${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getFullYear()}`;

  const handlePayment = async () => {
    setLoading(true);
    try {
      const hasBiometric = await LocalAuthentication.hasHardwareAsync();

      if (!hasBiometric) {
        Alert.alert("Error", "Biometric authentication is not supported on this device.");
        return;
      }

      const supported = await LocalAuthentication.isEnrolledAsync();

      if (!supported) {
        Alert.alert("Error", "No biometrics enrolled. Please set up your biometric authentication.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to Proceed to Pay',
        cancelLabel: 'Cancel',
      });

      if (result.success) {
        const response = await fetch('https://api.stripe.com/v1/payment_intents', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer sk_test_51R44a02YjkLIszipdReooW1UdanT6aropSrG6rt9Eqi42KXC7nSW6fzqY9zGdTvdbhQ57OwfXlDqNJaCO9gqcM0B006gaotS4f',
          },
          body: new URLSearchParams({
            amount: parseInt(scannedData.amount) * 100,
            currency: 'usd',
          }).toString(),
        });
        const { client_secret } = await response.json();

        const { error, paymentIntent } = await confirmPayment(client_secret, {
          paymentMethodType: 'Card',
          billingDetails: { email: 'test@example.com' },
        });

        if (error) {
          console.error(error);
          Alert.alert('Payment failed', error.message);
        } else if (paymentIntent) {
          const amount = scannedData.amount;
          const user = await AsyncStorage.getItem("user");
          const userObject = JSON.parse(user);
          const currentDate = new Date();
          const timestamp = currentDate.getTime();

          const paymentInfo = {
            user_id: userObject.uid,
            vendor: scannedData.vendor,
            amount: amount,
            discount_amount: scannedData.discount_amount,
            date: timestamp
          };

          const QRRef = await addDocument("Payments", paymentInfo);
          setLoading(false);
          navigation.navigate('PaymentSuccess', { paymentInfo });
        }
      } else {
        setLoading(false);
        Alert.alert("Payment", "Authentication failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Error", "An error occurred during authentication: " + error.message);
    }
  };

  const toggleCardForm = () => {
    setShowCardForm(!showCardForm);
  };

  return (
    <StripeProvider publishableKey="pk_test_51R44a02YjkLIszipa6adE8eHgF4ewVi83rg2nGzzPytb00LCGXmj5dxlOsxsixhlv5cWQa2Ogr9Re5oBu2P1mhYT00c22SmSz7">
      <View style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>Transaction Summary</Text>

        {/* Main content */}
        <View style={styles.mainContent}>
          {/* Starbucks logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: scannedData.vendor_image }}
              style={styles.logo}
            />
          </View>

          {/* Vendor section */}
          <Text style={styles.vendorLabel}>{scannedData.vendor}</Text>

          {/* Show dynamic payment date */}
          <Text style={styles.paymentDate}>Payment on {formattedDate}</Text>

          {/* Amount */}
          <Text style={styles.amountText}>${scannedData.amount}.00</Text>

          {/* Discount badge */}
          {scannedData.discount_amount !== "0" && (
            <View style={styles.discountBadge}>
              <View style={styles.discountDot} />
              <Text style={styles.discountText}>
                Discount of ${scannedData.discount_amount} has been applied
              </Text>
            </View>
          )}

          {/* Payment method section */}
          <View style={[styles.paymentMethodContainer, showCardForm && styles.expandedContainer]}>
            <Text style={styles.paymentMethodTitle}>Choose payment method</Text>

            {/* Visa card option */}
            <TouchableOpacity style={styles.paymentCard} onPress={toggleCardForm}>
              <View style={styles.cardLeft}>
                {/* <View style={styles.visaBadge}> */}
                <Ionicons name="card"
                  size={26}
                  color={'#1A1A4D'}
                />
                {/* </View> */}
                <Text style={styles.cardNumber}>
                  {cardDetails?.complete ? "  Card details complete" : "  Enter card details"}
                </Text>
              </View>
              <Ionicons name={showCardForm ? "chevron-down" : "chevron-forward"} size={24} color="#333" />
            </TouchableOpacity>

            {/* Card Form */}
            {showCardForm && (
              <CardForm
                style={styles.cardForm}
                onFormComplete={(details) => {
                  setCardDetails(details);
                }}
              />
            )}

            {loading ? (
              <ActivityIndicator size="large" style={styles.loading} />
            ) : (
              <View></View>
            )}

            {/* Pay button */}
            <TouchableOpacity
              style={[
                styles.payButton
              ]}
              onPress={handlePayment}
              disabled={loading}
            >
              <Text style={styles.payButtonText}>Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark navy blue background
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
  },
  backButton: {
    marginRight: 32,
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 19,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
  },
  vendorLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  paymentDate: {
    color: '#FF9933', // Orange color
    fontSize: 14,
    marginBottom: 24,
  },
  amountText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 15,
  },
  discountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 40,
  },
  discountDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6666FF', // Purple dot
    marginRight: 8,
  },
  discountText: {
    color: 'white',
    fontSize: 12,
  },
  paymentMethodContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 24,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '35%',
  },
  expandedContainer: {
    height: '120%',
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 16,
    color: '#000',
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  visaBadge: {
    width: 40,
    height: 24,
    backgroundColor: '#1A1A4D', // Dark blue for VISA
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  visaText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 14,
    color: '#333',
  },
  cardForm: {
    width: '100%',
    height: 280,
    marginTop: 10,
  },
  payButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#000033',
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: '#666666',
    opacity: 0.7,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  qrDataText: {
    color: 'white',
    fontSize: 16,
    marginTop: 20,
    fontWeight: 'bold',
  },
  loading: {
    padding: 10,
  }
});

export default ProceedPay;