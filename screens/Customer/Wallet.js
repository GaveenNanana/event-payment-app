import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Wallet({ navigation }) {
  // Sample payment methods data
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'visa', number: '****1234' },
    { id: '2', type: 'visa', number: '****1234' },
    { id: '3', type: 'visa', number: '****1234' },
    { id: '4', type: 'visa', number: '****1234' },
  ]);

  const renderPaymentMethod = ({ item }) => (
    <TouchableOpacity style={styles.paymentMethodItem}>
      <View style={styles.paymentMethodLeft}>
        <View style={styles.cardLogoContainer}>
          <Text style={styles.cardLogo}>{item.type.toUpperCase()}</Text>
        </View>
        <Text style={styles.paymentMethodText}>{item.type.charAt(0).toUpperCase() + item.type.slice(1)} {item.number}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#888" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.headerTitle}>Wallet</Text>

      
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Payment methods</Text>
        
        <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethod}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
        
        <TouchableOpacity style={styles.addPaymentButton} onPress={() => navigation.navigate('AddCard')}>
          <Ionicons name="heart" size={18} color="black" style={{marginLeft: 10}} />
          <Text style={styles.addPaymentText}>Add payment method</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 5,
    padding: 16,

  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLogoContainer: {
    width: 35,
    height: 24,
    backgroundColor: '#1a1f71',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardLogo: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  paymentMethodText: {
    fontSize: 16,
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 200,
    marginTop: 16,
    width: 200,
    height: 50,
  },
  addPaymentText: {
    fontSize: 16,
    marginLeft: 8,
  }
});

export default Wallet;