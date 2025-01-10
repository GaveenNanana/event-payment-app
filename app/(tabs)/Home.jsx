import { View, Text } from 'react-native'
import React from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'

export default function Home() {
  return (
    <View>
      {/* {Header} */}
        <Header />
      {/* {Slider} */}
        <Slider />
      {/* {Category} */}
      <Category />
      {/* {Explore} */}

    </View>
  )
}