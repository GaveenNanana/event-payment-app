import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useRouter } from 'expo-router';

export default function QRGenerator() {
  const [amount, setAmount] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const router = useRouter();

  const generateQRCode = () => {
    if (!amount) {
      alert('Please enter an amount');
      return;
    }

    const qrData = JSON.stringify({ amount });
    setQrCodeValue(qrData);

    router.push({
      pathname: '/business/qr-display',
      params: { qrCodeValue: qrData, amount },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate QR Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Generate QR Code" onPress={generateQRCode} />
      {qrCodeValue && (
        <View style={styles.qrContainer}>
          <QRCode value={qrCodeValue} size={200} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  qrContainer: {
    marginTop: 20,
  },
});