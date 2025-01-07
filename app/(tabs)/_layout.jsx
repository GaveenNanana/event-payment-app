import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Foundation from '@expo/vector-icons/Foundation';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from './../../constants/Colors';

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
      <Tabs.Screen name="Activity" 
      options={{
        tabBarLabel: 'Activity',
        tabBarIcon: ({color}) =><Feather name="activity" size={24} color={color} /> }}
        />
      <Tabs.Screen name="Profile" 
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({color}) =><Feather name="user" size={24} color={color} /> }}
      />
    </Tabs>
  )
}