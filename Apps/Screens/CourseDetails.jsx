import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import CourseIntro from "../Components/CourseIntro";
import SourceSection from "../Components/SourceSection";
import EnrollmentSection from "../Components/EnrollmentSection";
import LessionSection from "../Components/LessionSection";
import { ScrollView } from "react-native-gesture-handler";
import {
  MembershipContex,
  ReloadMethodsContext,
  UserDetailsContext,
} from "../../App";
import GlobalApi from "../Utilis/GlobalApi";

export default function CourseDetails() {
  const { params } = useRoute();
  const [course, setCourse] = useState();
  const [userEnrollment, setUserEnrollment] = useState();
  const navigation = useNavigation();
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const { isMember, setIsMember } = useContext(MembershipContex);
  const { reload, setReload } = useContext(ReloadMethodsContext);

  useEffect(() => {
    setCourse(params.course);
    params && userDetails && checkUserEnrollToCourse(params.course);
  }, [params && userDetails]);

  useEffect(() => {
    reload && checkUserEnrollToCourse();
  }, [reload]);

  const checkUserEnrollToCourse = (course) => {
    course &&
      GlobalApi.checkUserCourseEnrollment(course?.slug, userDetails.email).then(
        resp => {
          setUserEnrollment(resp.userEnrollCourses);
        }
      );
  };
  const onEnrollmentPress = () => {
    if (course?.free) {
      saveUserEnrollment();
    } else {
      if (!isMember) {
        navigation.navigate("membership");
        return;
      }

      saveUserEnrollment();
    }
  };

  const saveUserEnrollment = () => {
    GlobalApi.saveUserCourseEnrollment(course?.slug, userDetails.email).then(
      resp => {
        console.log(resp);
        if (resp) {
          Alert.alert("Great!!!", "You just enrolled to new course", [
            {
              text: "ok",
              onPress: () => console.log("Ok press"),
              style: "cancel",
            },
          ]);
          checkUserEnrollToCourse(course);
        }
      }
    );
  };

  return (
    <ScrollView style={{ padding: 20, marginTop: 25 }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 57,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left-circle" size={35} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, fontFamily: "outfit-bold" }}>
          Course Details
        </Text>
      </View>
      <CourseIntro course={course} />

      <SourceSection course={course} userEnrollment={userEnrollment} />

      <EnrollmentSection
        userEnrollment={userEnrollment}
        onEnrollmentPress={() => onEnrollmentPress()}
        onContinuePress={() =>
          navigation.navigate("watch-lesson", {
            course: course,
            userEnrollment: userEnrollment,
          })
        }
      />

        <View style={{ height: 50 }}></View>
              
    </ScrollView>
  );
}
