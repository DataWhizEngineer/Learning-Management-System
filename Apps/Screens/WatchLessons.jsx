import { View, Text, ScrollView, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../Utilis/Colors";
import LessionSection from "../Components/LessionSection";
import GlobalApi from "../Utilis/GlobalApi";
import { ReloadMethodsContext } from "../../App";

export default function WatchLessons() {
  const { params } = useRoute();
  const [userEnrollment, setUserEnrollment] = useState(params?.userEnrollment);
  const [course, setCourse] = useState(params?.course);
  const [selectedChapter, setSelectedChapter] = useState();
  const navigation = useNavigation();
  const {reload , setReload} = useContext(ReloadMethodsContext)

  useEffect(() => {
    params && setSelectedChapter(params?.course?.chapter[0]);
    params&&setUserEnrollment(params?.userEnrollment)
  }, [params]);

  const onChapterCompleted=()=>{
       GlobalApi.markChapterCompleted(userEnrollment[0]?.id,selectedChapter.id).then(resp => {
        setReload('Updated')
          ToastAndroid.show('Chapter Mark Completed !', ToastAndroid.LONG)
       })
  }
  
  return  selectedChapter&& (
    <ScrollView style={{ padding: 20 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 93,
          marginTop: 20,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={35} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>Lessons</Text>
      </View>
      {selectedChapter && (
        <Video
          source={{ uri: selectedChapter.video?.url }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          shouldPlay={true}
          style={styles.video}
        />
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop:15
        }}
      >
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20 }}>
          {selectedChapter?.name}
        </Text>

        <TouchableOpacity 
        onPress={()=> onChapterCompleted()}
        style={{backgroundColor:Colors.PRIMARY,padding:4,borderRadius:4,paddingHorizontal:8,width:130,marginTop:10,height:30}}>
          <Text style={{color:Colors.WHITE,textAlign:'center', fontFamily:'outfit'}}>Mark Completed</Text>
        </TouchableOpacity>
      </View>
      <LessionSection course={course} userEnrollment={userEnrollment} onChapterSelect={(chapter)=> setSelectedChapter(chapter)} selectedChapter={selectedChapter} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 250,
  },
});
