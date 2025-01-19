import { CameraView } from "expo-camera";
import { useState, useRef } from "react";
import { View, Text, StyleSheet, Linking } from "react-native";

export default function CameraScreen() {
  const [scanned, setScanned] = useState(false);
  const qrLock = useRef(false);

  const handleBarCodeScanned = ({ data }) => {
    if (data && !qrLock.current) {
      qrLock.current = true;
      setScanned(true);
      alert(`QR Code: ${data}`);
      setTimeout(() => {
        qrLock.current = false;
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <Text style={styles.scanText}>Scan a QR code</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  scanText: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    fontSize: 20,
    color: "white",
  },
});