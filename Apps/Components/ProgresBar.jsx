import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../Utilis/Colors'
import { StyleSheet } from 'react-native';

export default function ProgresBar({perc}) {

    const screenWidth = Dimensions.get('screen').width*1.06;
    const progressWidth = screenWidth*perc
  return (
    <View style={{backgroundColor:'lightgrey',borderRadius:99 }}> 
    <View style={{height:7,backgroundColor:Colors.PRIMARY,borderRadius:99 ,width:progressWidth}}>
    </View>
    </View>
  )
}