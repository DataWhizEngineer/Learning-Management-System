import { View, Text , Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Utilis/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CourseItem({course}) {
  const navigaton = useNavigation();
  return (
    <TouchableOpacity 
     onPress={() => navigaton.navigate('course-details',{
      course:course
     }) }
    style={{backgroundColor:Colors.WHITE,width:260 ,marginRight:15,padding:10,borderRadius:10}}>
      <Image source={{uri:course?.banner?.url}} style={{
                width:240,height:150,borderRadius:10 ,gap:4
               }}/>
               <View style={{display:'flex', gap:3}}>
                <Text style={{fontSize:16,fontFamily:'outfit-bold',}}>{course.name}</Text>
                <Text style={{fontSize:14,fontFamily:'outfit',color:Colors.GRAY}}>{course.author}</Text>
                <View style ={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              {course?.chapter?.length?
               <View style={{display:'flex' , flexDirection:'row',gap:4,alignItems:'center', marginTop:5}}>
                   <FontAwesome name="book" size={24} color={Colors.PRIMARY} />
                   <Text style={{color:Colors.GRAY,fontFamily:'outfit'}}>{course?.chapter?.length} Chapters</Text>
               </View> : 
               <View style={{display:'flex' , flexDirection:'row',gap:4,alignItems:'center'}}>
             <AntDesign name="youtube" size={20} color="red" />
               <Text style={{color:Colors.GRAY,fontFamily:'outfit'}}> Watch On Youtube </Text>
               </View>
               }
               <Text style={{fontFamily:'outfit-bold' ,color:Colors.PRIMARY}}>{course.free?'Free':"paid"}</Text>
            </View> 
            </View>
    </TouchableOpacity>
  )
}