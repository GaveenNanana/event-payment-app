import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Welcome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.titleHighlight}>Pay<Text style={styles.purple}>Easy</Text></Text>
        </View>
        
        <Text style={styles.subtitle}>Payments made easy.</Text>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.businessLink}>
            <Text style={styles.businessLinkText}>Business accounts click here</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 100,
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontSize: 58,
    fontWeight: '400',
    textAlign: 'center',
  },
  titleHighlight: {
    fontSize: 42,
    fontWeight: '600',
    textAlign: 'center',
  },
  purple: {
    color: '#8B5CF6',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  footer: {
    width: '100%',
    marginTop: 'auto',
  },
  continueButton: {
    backgroundColor: '#000d4c',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  businessLink: {
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 16,
  },
  businessLinkText: {
    fontSize: 14,
    color: '#000d4c',
    textDecorationLine: 'underline',
  },
  indicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  activeDot: {
    width: 20,
    height: 4,
    backgroundColor: '#000d4c',
    borderRadius: 2,
  },
});

export default Welcome;