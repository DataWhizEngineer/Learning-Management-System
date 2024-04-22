import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SectionHeading from "./SectionHeading";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Utilis/Colors";
import { StyleSheet } from "react-native";
import { concatAST } from "graphql";

export default function LessionSection({
  course,
  userEnrollment,
  onChapterSelect,
  selectedChapter = {},
}) {
  const limitText = (text, maxWords = 5, ellipsis = "...") => {
    const words = text.split(" ");
    if (words.length <= maxWords) {
      return text; // Text already fits within the limit
    }

    // Ensure at least the minimum number of words (2 in this case) are displayed
    const truncatedWords = words.slice(0, Math.max(2, maxWords - 1));
    truncatedWords.push(ellipsis);
    return truncatedWords.join(" ");
  };

  const MyText = ({ text }) => {
    const limitedText = limitText(text);
  };

  const checkIsChapterCompleted = (chapterId) => {
    // Check if userEnrollment exists and has completedChapter data
    if (
      userEnrollment &&
      userEnrollment.length > 0 &&
      userEnrollment[0].completedChapter
    ) {
      return userEnrollment[0].completedChapter.some(
        (item) => item.chapterId === chapterId
      );
    }

    // If userEnrollment or completedChapter data is not available, consider it not completed
    return false;
  };

  return (
    <View>
      <SectionHeading heading={"Lessons"} />
      <FlatList
        data={course?.chapter}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onChapterSelect(item)}
            style={[
              styles.container,
              selectedChapter == item && {
                backgroundColor: Colors.PRIMARY_LIGHT,
              },
              checkIsChapterCompleted(item.id) && {
                backgroundColor: "lightgreen",
              },
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  {
                    fontSize: 17,
                    fontFamily: "outfit",
                    padding: 10,
                    backgroundColor: Colors.PRIMARY_LIGHT,
                    borderRadius: 99,
                    width: 40,
                    height: 40,
                    textAlign: "center",
                    color: Colors.PRIMARY,
                  },
                  checkIsChapterCompleted(item.id) && {
                    color: "green",
                    backgroundColor: "lightgreen",
                  },
                ]}
              >
                {index + 1}
              </Text>
              <Text style={{ fontFamily: "outfit-medium", fontSize: 15 }}>
                {" "}
                {limitText(item.name)}
              </Text>
            </View>

            {
               checkIsChapterCompleted(item.id) ? <Ionicons name="checkmark-circle-sharp" size={24} color="green" /> :
            userEnrollment != [] || index == 0 ? (
              <Ionicons name="play-circle" size={28} color={Colors.PRIMARY} />
            ) : (
              <Ionicons name="lock-closed" size={28} color={Colors.GRAY} />
            )}
          </TouchableOpacity>
        )}
      />
      <View style={{ height: 50 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 0.5,
    marginBottom: 10,
    borderRadius: 9,
    backgroundColor: Colors.WHITE,
  },
});
