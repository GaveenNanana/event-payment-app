import { View, Text, TextInput } from 'react-native'
import React from 'react'
// import { useUser } from '@clerk.clerk-expo'
import {Colors} from '../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {

    // const {user}=useUser()

  return (
    <View style={{
        padding:16,
        paddingTop:80,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20
    }}>
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            gap:10
        }}>
            {/* Clerk code below */}
            {/* <Image src={{uri:user?.imageUrl}}
            style={{
                width:45,
                height:45,
                borderRadius:99
            }}
            /> */}
            <View>
                <Text style={{
                    color:'#fff',
                }}>Welcome,</Text>
                {/* Clerk code below */}
                {/* <Text>{UserActivation?.fullName}</Text> */}
                <Text style={{
                    fontSize:19,
                    fontFamily:'outfit-medium',
                    color:'#fff'
                }}>Gaveen Nanayakkara</Text>
            </View>
        </View>
        {/* Search Bar */}
        <View style={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#fff',
            gap:8,
            padding:8,
            borderRadius:8,
            marginTop:16,
            marginVertical:8
        }}>
            <Ionicons name="search" size={24} color={Colors.PRIMARY} />
            <TextInput placeholder="Search..."
            placeholderTextColor={'#888'}
            style={{
                fontFamily:'outfit',
                fontSize:16,
            }} />
        </View>
    </View>
  )
}