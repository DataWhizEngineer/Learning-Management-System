import { View, Text, FlatList, ViewComponent, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import Colors from '../Utilis/Colors';
import SectionHeading from './SectionHeading';
import CourseItem from './CourseItem';

import Verticaldisplay from './Verticaldisplay';


export default function CourseItemVertical({courseList}) {
    const [activeindex , setActiveIndex] = useState();
  return (

    <View>
      
     <FlatList
          data={courseList}
          horizontal={false}
          
          showsHorizontalScrollIndicator={false}
          renderItem={({item , index}) => (

            <Verticaldisplay course={item}/>
            
            

          )}
     />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
          backgroundColor:Colors.WHITE,
          padding:15,
          marginRight:10,
          alignItems:'center',
          alignContent:'center',
          borderRadius:20,
          width:100,
          height:100
    }
  })