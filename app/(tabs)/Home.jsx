import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'
import { signOut } from 'firebase/auth'
import { Button } from 'react-native'
import { auth } from '../../configs/FirebaseConfig'


export default function Home() {
  return (

    <ScrollView>
      {/* {Header} */}
        <Header />
      {/* {Slider} */}
        <Slider />
      {/* {Category} */}
      <Category />
      {/* {Vendor List} */}
      <PopularBusiness />
      <View style={{height:20}}></View>
    </ScrollView>

  )
}