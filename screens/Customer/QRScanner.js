import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { getDocument } from '../../Services/FirebaseService';

function QRScanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [loading, setloading] = useState(false);

  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.message}>Requesting camera permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const handleBarcodeScanned = async ({ type, data }) => {
    setloading(true);
    setScanned(true);
    setScannedData(data);
    const QRData = await getDocument('QRCodes', data);
    setloading(false);
    navigation.navigate('ProceedPay', { scannedData: QRData });
  };

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <View style={styles.scanArea}></View>
      </View>

      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      />

      {scanned && (
        <View style={styles.resultContainer}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View></View>
          )}
          <Button
            title={"Tap to Scan Again"}
            color="#FFFFFFFF"
            onPress={() => {
              setScanned(false);
              setScannedData('');
            }}
          />
        </View>
      )}

      <View style={styles.cancelContainer}>
        <Button
          title={"Cancel"}
          color="#FFFFFFFF"
          onPress={() => { navigation.goBack() }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgba(0, 0, 0, -0.9)',
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 120,
    zIndex: 2,
  },
  cancelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 10,
    position: 'absolute',
    bottom: 50,
    zIndex: 2,
  },
  scannedText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default QRScanner;
