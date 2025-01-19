import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function QRDisplay() {
  const { qrCodeValue, amount } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment QR Code</Text>
      
      {qrCodeValue ? (
        <View style={styles.qrContainer}>
          <QRCode value={qrCodeValue} size={200} />
        </View>
      ) : (
        <Text style={styles.errorText}>No QR Code found</Text>
      )}
      
      <Text style={styles.amountText}>Amount: ${amount}</Text>

      <TouchableOpacity style={styles.doneButton} onPress={() => router.push('/QRGenerator')}>
        <Text style={styles.doneButtonText}>Back</Text>
      </TouchableOpacity>
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
  qrContainer: {
    marginVertical: 20,
  },
  amountText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 30,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  doneButton: {
    backgroundColor: '#0E7AFE',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  doneButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});