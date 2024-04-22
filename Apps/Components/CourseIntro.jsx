import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import Colors from "../Utilis/Colors";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SectionHeading from "./SectionHeading";

export default function CourseIntro({ course }) {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [error, setError] = useState(null);

 

  useEffect(() => {
    setIsVideoLoading(true);

    // Wrap video source in a try...catch block to handle errors
    try {
      // Consider adding a local fallback video or placeholder while loading
    } catch (err) {
      setError(err.message);
    } finally {
      setIsVideoLoading(false);
    }
  }, []);

  return (
    course && (
      <View style={{ marginTop:5}}>
        {isVideoLoading && <Text>Loading video...</Text>}
        {error && <Text>Error loading video: {error}</Text>}
        <Video
          source={{ uri: course?.chapter[0]?.video?.url }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay={false}
          style={styles.video}
        />
         <View style={{display:'flex',gap:8 ,backgroundColor:Colors.WHITE , padding:15 ,  borderRadius:10,}}>
          <Text style={{fontSize:20,fontFamily:"outfit-bold"}}> {course?.name}</Text>
          <Text style={{fontSize:14,fontFamily:'outfit',color:Colors.GRAY}}>{course.author}</Text>
                <View style ={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
              {course?.chapter?.length?
               <View style={{display:'flex' , flexDirection:'row',gap:4,alignItems:'center'}}>
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
            <SectionHeading heading={'Description'}/>
            <Text  style={{marginTop:-10 , fontFamily:'outfit'}}>{course?.description}</Text>
        </View>
            
           
        
       
      </View>
       
    )
  );
}

const styles = StyleSheet.create({
  
  video: {
    width: "100%",
    height: 250,
  },
});
