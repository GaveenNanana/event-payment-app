import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'

export default function profile() {

 
  return (
    <View style={{
      padding:20,
      marginTop:60
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:35
      }}>Profile</Text>

      {/* User Info  */}
      <UserIntro/>

      {/* Menu List  */}
      <MenuList/>
    </View>
  )
}