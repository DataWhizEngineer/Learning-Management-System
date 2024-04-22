import { View, Text , Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../Utilis/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ProgresBar from './ProgresBar';

export default function ProgressCourseItem({course,completedChapter}) {
    const navigaton = useNavigation();

    useEffect(()=> {
        
    },[])
 
         const calculatePercentage = () => {
            const perc = (completedChapter/course?.chapter?.length);
           
            return perc.toFixed(1);
            
         }

    return (
      <TouchableOpacity 
       onPress={() => navigaton.navigate('course-details',{
        course:course
       }) }
      style={{backgroundColor:Colors.WHITE ,marginRight:15,padding:10,borderRadius:10,width:350 , marginBottom:10 , marginTop:5}}>
        <Image source={{uri:course?.banner?.url}} style={{
                  height:200,borderRadius:10 ,gap:4
                 }}/>
                 <View style={{display:'flex', gap:3}}>
                  <Text style={{fontSize:16,fontFamily:'outfit-bold',}}>{course.name}</Text>
                  <Text style={{fontSize:14,fontFamily:'outfit',color:Colors.GRAY}}>{course.author}</Text>
                  <View style ={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                {course?.chapter?.length?
                 <View style={{display:'flex' , flexDirection:'row',gap:4,alignItems:'center', marginTop:5}}>
                     
                     <Text style={{color:'black',fontFamily:'outfit'}}>{calculatePercentage()*100}%</Text>
                 </View> : 
                 <View style={{display:'flex' , flexDirection:'row',gap:4,alignItems:'center'}}>
               <AntDesign name="youtube" size={20} color="red" />
                 <Text style={{color:Colors.GRAY,fontFamily:'outfit'}}> Watch On Youtube </Text>
                 </View>
                 }
                 <Text style={{fontFamily:'outfit-bold' ,color:'black'}}>{completedChapter}/{course?.chapter?.length}</Text>
              </View> 
                <ProgresBar perc={calculatePercentage()}/>
              </View>
      </TouchableOpacity>
    )
  }