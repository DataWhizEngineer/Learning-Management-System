import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../Screens/HomePage';
import MyCourse from '../Screens/MyCourse';
import Profile from '../Screens/Profile';
import Colors from '../Utilis/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {

    return (
        <Tab.Navigator
          screenOptions={{
            headerShown: false, // Hide headers for a cleaner tab bar experience
            tabBarActiveTintColor: "red", // Apply the red color to active tabs
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomePage}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home-outline" size={size} color={color} /> // Use the provided color for active/inactive states
              ),
              tabBarLabel: ({color}) => <Text style={{ color:color }}>Home</Text>, // Use the provided color for active/inactive text
            }}
          />
          <Tab.Screen
            name="MyCourse"
            component={MyCourse}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="book-outline" size={size} color={color} /> // Use the provided color for active/inactive states
              ),
              tabBarLabel: ({color}) => <Text style={{ color:color }}>MyCourse</Text>, // Use the provided color for active/inactive text
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="user-circle-o" size={size} color={color} /> // Use the provided color for active/inactive states
              ),
              tabBarLabel: ({color}) => <Text style={{ color:color }}>Profile</Text>, // Use the provided color for active/inactive text
            }}
          />
        </Tab.Navigator>
      );
  
}
