import { View, Text , Image,StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../Utilis/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function Verticaldisplay({course}) {
  return (
    <View style={styles.courseItem}>
      <View style={styles.courseRow}>
        <Image source={{ uri: course?.banner?.url }} style={styles.courseImage} />
        <View style={styles.courseDetails}>
          <Text style={styles.courseName}>{course.name}</Text>
          <Text style={styles.courseAuthor}>{course.author}</Text>
          <View style={styles.courseInfoRow}>
            {course?.chapter?.length ? (
              <View style={styles.courseInfo}>
                <FontAwesome name="book" size={24} color={Colors.PRIMARY} />
                <Text style={styles.courseInfoText}>
                  {course?.chapter?.length} Chapters
                </Text>
              </View>
            ) : (
              <View style={styles.courseInfo}>
                <AntDesign name="youtube" size={20} color="red" />
                <Text style={styles.courseInfoText}>Watch On Youtube</Text>
              </View>
            )}
            <Text style={styles.coursePrice}>{course.free ? 'Free' : 'Paid'}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    courseList: {
      flex: 1, // Makes the list take up the entire available space
      backgroundColor: Colors.WHITE, // Optional background color for the list container
    },
    courseItem: {
      backgroundColor: Colors.WHITE,
      width: '100%',
      marginRight: 15,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10, // Add spacing between list items
      shadowColor: '#ccc', // Optional shadow for a more elevated look
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2, // Adjust shadow properties as needed
    },
    courseRow: {
      flexDirection: 'row', // Arrange image and details side-by-side
    },
    courseImage: {
      width: 180, // Adjust image width as needed
      height: 110,
      borderRadius: 10,
    },
    courseDetails: {
      flex: 1, // Allow details to fill remaining space
      marginLeft: 10, // Add margin between image and details
      marginTop: 10, // Margin between image and details
    },
    courseName: {
      fontSize: 16,
      fontFamily: 'outfit-bold',
    },
    courseAuthor: {
      fontSize: 14,
      fontFamily: 'outfit',
      color: Colors.GRAY,
    },
    courseInfoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10, // Margin between details and info row
    },
    courseInfo: {
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
    },
    courseInfoText: {
      color: Colors.GRAY,
      fontFamily: 'outfit',
    },
    coursePrice: {
      fontFamily: 'outfit-bold',
      color: Colors.PRIMARY,
    },
  });