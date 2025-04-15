import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { firebase_auth } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Vendor_Account({ navigation }) {
  const [user, setUser] = useState();

  const signOutHandle = async () => {
    try {
      await signOut(firebase_auth);
      await AsyncStorage.removeItem('user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Vendor_Login' }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await AsyncStorage.getItem("user");
      const userObject = JSON.parse(user);
      setUser(userObject);
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Business Account</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          {user && <Image source={{ uri: user.imageURL }} style={styles.mainImage} resizeMode="cover" />}</View>
        {user && <Text style={styles.businessName}>{user.businessName}</Text>}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Vendor_UpdateBusiness')}>
          <Text style={styles.menuItemText}><Ionicons name="bag-sharp" size={20} color="#000" />  Update Business Details</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Vendor_My_Business')}>
          <Text style={styles.menuItemText}><Ionicons name="bag-sharp" size={20} color="#000" />  My Business </Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Vendor_Transactions')}>
          <Text style={styles.menuItemText}><Ionicons name="bag-sharp" size={20} color="#000" />  My Transactions </Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Vendor_Withdraw_Earnings')}>
          <Text style={styles.menuItemText}><Ionicons name="bag-sharp" size={20} color="#000" />  Withdraw Earnings</Text>
          <Ionicons name="chevron-forward" size={24} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <View style={styles.signOutContainer}>
        <TouchableOpacity onPress={signOutHandle}>
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
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 18,
  },
  profileSection: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  businessName: {
    marginLeft: 12,
    fontSize: 16,
  },
  menuContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuItemText: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 16,
  },
  signOutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 80,
    alignItems: 'center',
  },
  signOutText: {
    color: 'red',
    fontSize: 16,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  activeTabText: {
    color: '#000',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    overflow: 'hidden',
  },
});

export default Vendor_Account;