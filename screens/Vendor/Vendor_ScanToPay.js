import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot";
import { addDocument } from '../../Services/FirebaseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from "expo-media-library";

function Vendor_ScanToPay({ route, navigation }) {
  const { qrData, discount } = route.params;
  const [QRref, setQRref] = useState(null);
  const viewShotRef = useRef(null);
  const [qrImageUri, setQrImageUri] = useState(null);

  const qrValue = qrData && !isNaN(parseFloat(qrData)) ? parseFloat(qrData).toFixed(2) : 'Invalid Data';

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Please allow access to save images.");
      return false;
    }
    return true;
  };

  const captureAndSaveQRCode = async () => {
    try {
      const hasPermission = await requestPermission();
      if (!hasPermission) return;

      if (viewShotRef.current) {
        const uri = await viewShotRef.current.capture();
        setQrImageUri(uri);

        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync("QR Codes", asset, false);

        Alert.alert("Success", "QR Code saved to your gallery!");
      }
    } catch (error) {
      console.error("Error saving QR Code:", error);
      Alert.alert("Error", "Failed to save QR Code.");
    }
  };

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsedUser = JSON.parse(user);

          const qrInfo = {
            vendor_image: parsedUser.imageURL,
            vendor: parsedUser.businessName,
            amount: qrData,
            discount_amount: discount,
          };

          const QRRef = await addDocument("QRCodes", qrInfo);
          setQRref(QRRef);
        }
      } catch (error) {
        console.error("Error generating QR Code:", error);
      }
    };

    generateQRCode(); // Call function when component mounts
  }, []);


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
        {QRref ? (
          <ViewShot ref={viewShotRef} options={{ format: "jpg", quality: 0.9 }}>
            <QRCode value={QRref} size={200} />
          </ViewShot>
        ) : (
          <Text style={styles.amount}>Generating QR .. </Text>
        )}
      </View>

      <Text style={styles.amount}>${qrValue}</Text>

      <View style={styles.discountContainer}>
        <Ionicons name="information-circle-outline" size={16} color="#8F8F8F" />
        <Text style={styles.discountText}>Discount of ${discount} has been applied</Text>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.doneButton} onPress={captureAndSaveQRCode}>
          <Text style={styles.doneButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.cancelText} onPress={() => { navigation.navigate('BottomTabNav_Vendor'); }}>Cancel</Text>
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
