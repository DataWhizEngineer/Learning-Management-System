import { View, Text } from 'react-native'
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../Screens/HomePage';
import CourseDetails from '../Screens/CourseDetails';
import TabNavigation from './TabNavigation';
import MembershipModal from '../Screens/MembershipModal';
import WatchLessons from '../Screens/WatchLessons';

const stack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Screen name='home' component={TabNavigation}/>

        <stack.Screen name='course-details' component={CourseDetails}/>

        <stack.Screen name="membership" component={MembershipModal}
        options={{
          presentation:'modal'
        }}/>
        <stack.Screen name='watch-lesson' component={WatchLessons}/>
        
    </stack.Navigator>
  )
}