import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false,
      tabBarActiveTintColor:Colors.PRIMARY,
     }}>
      <Tabs.Screen name="Home" 
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({color}) =><Foundation name="home" 
        size={24} color={color} /> }}
      />
      <Tabs.Screen name="Pay" 
      options={{
        tabBarLabel: 'Pay',
        tabBarIcon: ({color}) =><Ionicons name="scan" size={24} color={color} /> }}
        />
      <Tabs.Screen name="Profile" 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) =><Feather name="user" size={24} color={color} /> }}
      />
    </Tabs>
  )
}