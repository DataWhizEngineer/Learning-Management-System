import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import React, { useState , useContext} from "react";
import Colors from "../Utilis/Colors";
import { useNavigation } from "@react-navigation/native";
import { MembershipContex } from "../../App";

export default function SourceSection({ course, userEnrollment }) {
  const{isMember , setIsMember} = useContext(MembershipContex)
  const navigation = useNavigation();

  const onsourceClick = (url) => {
    if (isMember) {
      Linking.openURL(url);
    }

    else{
           navigation.navigate('membership')
    }
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 20,
        gap: 4,
      }}
    >
      <TouchableOpacity
        onPress={() => onsourceClick(course.sourceCode)}
        style={{
          padding: 10,
          backgroundColor: Colors.WHITE,
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 0.4,
          width: 110,
        }}
      >
        <Image
          source={require("./../../assets/images/21864184_6502423.jpg")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{ fontSize: 17, fontFamily: "outfit" }}> Source </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onsourceClick(course.demoUrl)}
        style={{
          padding: 10,
          backgroundColor: Colors.WHITE,
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 0.4,
          width: 110,
        }}
      >
        <Image
          source={require("./../../assets/images/book.jpg")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{ fontSize: 17, fontFamily: "outfit" }}>Free Stuff</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onsourceClick(course.youtubeUrl)}
        style={{
          padding: 10,
          backgroundColor: Colors.WHITE,
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 0.4,
          width: 110,
        }}
      >
        <Image
          source={require("./../../assets/images/youtube.png")}
          style={{ width: 40, height: 40 }}
        />
        <Text style={{ fontSize: 17, fontFamily: "outfit" }}>Alternative</Text>
      </TouchableOpacity>
    </View>
  );
}
