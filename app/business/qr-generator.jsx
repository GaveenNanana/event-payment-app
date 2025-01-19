import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";  // Adjust the import based on your setup

export default function QRGenerator() {
  const [amount, setAmount] = useState("");
  const [qrValue, setQrValue] = useState(null);

  const handleGenerateQR = async () => {
    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    try {
      // Store transaction in Firestore
      const docRef = await addDoc(collection(db, "VendorList/YOUR_VENDOR_ID/Transactions"), {
        amount: parseFloat(amount),
        status: "pending",
        timestamp: serverTimestamp(),
        qrCodeUrl: "", // Placeholder for the generated QR
      });

      // Use document ID in QR code
      setQrValue(`payment:${docRef.id}`);

      alert("QR Code generated successfully!");
    } catch (error) {
      console.error("Error adding transaction: ", error);
      alert("Failed to generate QR code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Payment QR</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.button} onPress={handleGenerateQR}>
        <Text style={styles.buttonText}>Generate QR Code</Text>
      </TouchableOpacity>

      {qrValue && (
        <View style={styles.qrContainer}>
          <QRCode value={qrValue} size={200} />
          <Text>Scan this QR code to make a payment</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0E7AFE",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  qrContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});