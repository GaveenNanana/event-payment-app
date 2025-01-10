import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../configs/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'

export default function PopularBusiness() {
 
    const [vendorList,setVendorList]=useState([]);
    useEffect(()=>{
        GetVendorList();
    },[])
    const GetVendorList=async()=>{
        setVendorList([]);
        const q=query(collection(db,'VendorList'),limit(10));
        const querySnapshot=await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setVendorList(prev=>[...prev,{id:doc.id,...doc.data()}])
        })
    }
    return (
    <View>
       <View style={{paddingLeft:20,marginBottom:12, display:'flex',
        flexDirection:'row',justifyContent:'space-between',
        marginTop:20,}}>
        <Text 
        style={{
            
        fontSize:20,
        fontFamily:'outfit-bold'}}>
            Popular Vendors
            </Text>
            <Text style={{color:Colors.PRIMARY,fontFamily:'outfit-medium',marginRight:20,}}>View All</Text>
        </View>

        <FlatList
            data={vendorList}
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            renderItem={({item,index})=>(
                <PopularBusinessCard
                key={index}
                business={item}
                />
            )}
        />
    </View>
  )
}