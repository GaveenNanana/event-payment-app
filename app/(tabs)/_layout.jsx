import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router';
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { getLocalStorage } from '../../service/Storage';

export default function TabLayout() {

  const router=useRouter();
  const [authenticated,setAuthenticated]=useState(null);
    
  useEffect(()=>{
      GetUserDetail();
  },[])

  const GetUserDetail=async()=>{
      const userInfo=await  getLocalStorage('userDetail');
      console.log(userInfo)

      if(!userInfo)
      {
          router.replace('/login')
      }
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Pay"
        options={{
          tabBarLabel: 'Pay',
          tabBarIcon: ({ color }) => <Ionicons name="scan" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="QRGenerator"
        options={{
          tabBarLabel: 'Generate QR',
          tabBarIcon: ({ color }) => <MaterialIcons name="qr-code" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}