import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>
      
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>AB</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Test User</Text>
          <Text style={styles.userEmail}>user@email.com</Text>
        </View>
      </View>
      
      <View style={styles.menuSection}>
        <View style={styles.menuRow}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Favourites')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="briefcase" size={24} color="black" />
            </View>
            <Text style={styles.menuText}>Favourites</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Receipts')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="receipt" size={24} color="black" />
            </View>
            <Text style={styles.menuText}>Receipts</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Wallet')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="wallet" size={24} color="black" />
            </View>
            <Text style={styles.menuText}>Wallet</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    paddingHorizontal: 10,
    paddingTop: 12,
    marginTop: 12
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '30%',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuText: {
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 100,
  },
  signOutButton: {
    padding: 12,
  },
  signOutText: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Profile;