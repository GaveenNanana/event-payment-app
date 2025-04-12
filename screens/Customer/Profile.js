import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { firebase_auth } from '../../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Profile({ navigation }) {
  const [user, setUser] = useState();

  const signOutHandle = async () => {
    try {
      await signOut(firebase_auth);
      await AsyncStorage.removeItem('user');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userValue = await AsyncStorage.getItem('user');
        if (userValue !== null) {
          const user = JSON.parse(userValue);
          setUser(user);
        } else {
          Alert.alert('No User', 'User data not found, please log in again.');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
        Alert.alert('Error', 'Failed to load user data.');
      }
    };
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          {user && <Image source={{ uri: user.profileImage }} style={styles.mainImage} resizeMode="cover" />}
        </View>
        <View style={styles.userInfo}>
          {user && <Text style={styles.userName}>{user.displayName}</Text>}
          {user && <Text style={styles.userEmail}>{user.email}</Text>}
        </View>
      </View>

      <View style={styles.menuSection}>
        <View style={styles.menuRow}>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
            <View style={styles.menuIconContainer}>
              <Ionicons name="person" size={24} color="black" />
            </View>
            <Text style={styles.menuText}>Edit Profile</Text>
          </TouchableOpacity>

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

          <TouchableOpacity style={styles.menuItem} >

          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.signOutButton} onPress={signOutHandle}>
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
    paddingHorizontal: 0,
    paddingTop: 12,
    marginTop: 12
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    width: '33%',
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
  mainImage: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    overflow: 'hidden',
  },
});

export default Profile;