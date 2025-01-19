import { CameraView } from "expo-camera";
import { useState, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

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
      >
        {/* Dark background overlay */}
        <View style={styles.overlayContainer}>
          {/* Transparent scanning box */}
          <View style={styles.overlayBox} />
        </View>
        <Text style={styles.scanText}>Scan a QR code</Text>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Darker transparent background
    justifyContent: "center",
    alignItems: "center",
  },
  overlayBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "rgba(0, 0, 0, 0)", // Fully transparent box
    borderRadius: 20,
  },
  scanText: {
    position: "absolute",
    top: 50,
    alignSelf: "center",
    fontSize: 20,
    color: "white",
    marginTop: 40,
  },
});