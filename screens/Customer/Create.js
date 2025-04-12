import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useCameraPermissions } from "expo-camera";

function Create({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <Text style={styles.headerTitle}>Scan to Pay</Text>

      {/* QR Code Scanner Area */}
      <View style={styles.scannerContainer}>
        <Image
          source={require('../../assets/home_img/10.png')}
          style={styles.qrCode}
        />
      </View>

      {/* Bottom Instructions */}
      <View style={styles.bottomSection}>
        <View style={styles.instructionBox}>
          <Text style={styles.instructionTitle}>Payment with QR Code</Text>
          <Text style={styles.instructionText}>Hold the code inside the frame. It will be scanned automatically</Text>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('QRScanner')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={styles.bottomSection}></View>
      <View style={styles.bottomSection}></View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050C4D', // Exact dark navy blue from image
    paddingTop: 10, // Account for status bar
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 45,
    marginBottom: 10,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 20,
  },
  scannerOuterFrame: {
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 16,
    height: '55%',
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannerFrame: {
    height: '95%',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneFrame: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 25,
    width: '85%',
    height: '90%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneNotch: {
    width: '35%',
    height: 20,
    backgroundColor: '#051C60',
    position: 'absolute',
    top: -1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  qrContainer: {
    width: '75%',
    height: '65%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  qrCode: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  bottomSection: {
    padding: 16,
    paddingBottom: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    marginBottom: 68,
  },
  instructionBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  instructionTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginBottom: 5,
  },
  instructionText: {
    color: '#666',
    fontSize: 13,
  },
  continueButton: {
    backgroundColor: '#051C60',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default Create;