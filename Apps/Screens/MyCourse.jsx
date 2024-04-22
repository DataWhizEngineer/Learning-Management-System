import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { UserDetailsContext } from "../../App";
import GlobalApi from "../Utilis/GlobalApi";
import { useContext } from "react";
import { FlatList } from "react-native";
import CourseItem from "../Components/CourseItem";
import ProgressCourseItem from "../Components/ProgressCourseItem";


export default function MyCourse() {
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [enrolledCourseList, setEnrolledCourseList] = useState();
  const [isLoading , setIsLoading]= useState(false)

  useEffect(() => {
    userDetails && getAllUserEnrollCourses();
  }, [userDetails]);

  const getAllUserEnrollCourses = () => {
    setIsLoading(true)
    GlobalApi.getAllUserEnrollCourses(userDetails.email).then(resp => {
      setEnrolledCourseList(resp.userEnrollCourses);
      setIsLoading(false)
    });
  };

  return (
    <View style={{ padding: 20, marginTop: 25 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 26 }}>My Course</Text>
     <FlatList
        data={enrolledCourseList}
        refreshing={isLoading}
        onRefresh={()=>getAllUserEnrollCourses()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProgressCourseItem course={item?.courseList} completedChapter={item?.completedChapter?.length} />
  )}
      />
     
     
    </View>
  );
}
