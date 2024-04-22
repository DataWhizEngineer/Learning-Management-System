import { View, Text  } from 'react-native'
import React from 'react';
import Colors from '../Utilis/Colors';

export default function SectionHeading({heading}) {
  return (
    <View>
       <Text style={{fontFamily:'outfit-medium', fontSize:20,marginBottom:8,marginTop:-8, color:Colors.PRIMARY, marginTop:10}}>{heading}</Text>
    </View>
  )
}