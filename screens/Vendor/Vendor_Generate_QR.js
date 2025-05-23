import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Vendor_Generate_QR({ navigation }) {
  const [amount, setAmount] = useState('');
  const [discount, setDiscount] = useState('0');
  const [isActive, setIsActive] = useState(false);
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const userObject = JSON.parse(user);
      setUser(userObject);
    };
    fetchUser();
  }, []);

  const handleAmountChange = (text) => {
    const sanitizedText = text.replace(/[^0-9.]/g, "");
    const validText = sanitizedText.split(".").length > 2
      ? sanitizedText.slice(0, sanitizedText.lastIndexOf("."))
      : sanitizedText;
    const amountValue = validText ? parseFloat(validText) : 0;
    setAmount(validText);
    setIsActive(amountValue > 0);
    setTotal(amountValue);
  };

  const handleDiscount = (text) => {
    const sanitizedText = text.replace(/[^0-9.]/g, "");
    const validText = sanitizedText.split(".").length > 2
      ? sanitizedText.slice(0, sanitizedText.lastIndexOf("."))
      : sanitizedText;
    const discountValue = validText ? parseFloat(validText) : 0;
    if (discountValue < amount) {
      setDiscount(validText);
      setTotal(amount - discountValue);
    } else {
      Alert.alert("Invalid Discount", "Discount cannot be greater than or equal to the amount.", [
        { text: "OK", style: "cancel" }
      ]);
    }
  };

  // Calculate totals
  const amountValue = parseFloat(amount) || 0;
  const discountValue = parseFloat(discount) || 0;

  // Handle the navigation and pass the QR code data to the next screen
  const handleGenerateQRCode = () => {
    if (isActive) {
      navigation.navigate('Vendor_ScanToPay', { qrData: total.toString(), discount: discount.toString() });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerTitle}>Generate QR</Text>

      {/* Vendor Profile */}
      <View style={styles.vendorProfile}>
        <View style={styles.vendorAvatar}>
          {user && <Image source={{ uri: user.imageURL }} style={styles.mainImage} resizeMode="cover" />}
        </View>
        {user && <Text style={styles.vendorLabel}>{user.businessName}</Text>}
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>Enter amount*</Text>
        <TextInput
          style={styles.input}
          placeholder="$0.00"
          keyboardType="numeric"
          returnKeyType="done"
          value={amount}
          onChangeText={handleAmountChange}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />

        <Text style={styles.inputLabel}>Enter discount (If Applicable)</Text>
        <TextInput
          style={styles.input}
          placeholder="$0.00"
          keyboardType="numeric"
          returnKeyType="done"
          value={discount}
          onChangeText={handleDiscount}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />

        {/* Transaction Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Transaction Summary</Text>

          <View style={{ marginTop: 10, backgroundColor: '#FFFFFF1A', padding: 10, borderRadius: 10 }}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Amount</Text>
              <Text style={styles.summaryValue}>$ {amountValue.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>$ {discountValue.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>$ {total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Generate QR Button */}
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateQRCode}>
          <Text style={styles.generateButtonText}>Generate QR Code</Text>
        </TouchableOpacity>

        {/* Generate QR Code */}
        {/* {isActive && (
          <QRCode
            value={total.toString()}
            size={200}
          />
        )} */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Dark blue background
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
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
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
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  vendorLabel: {
    color: 'white',
    marginTop: 15,
    fontWeight: 'bold',
    fontSize: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputLabel: {
    color: 'white',
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  generateButtonText: {
    color: '#00205B',
    fontWeight: 'bold',
    fontSize: 16,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
});

export default Vendor_Generate_QR;
