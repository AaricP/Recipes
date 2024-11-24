// UPDATE_THIS change navigation to new page names

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

// Import your screen components here
import HomePage from './HomePage'; // replace with actual file
import AboutUs from './AboutUs'; // replace with actual file
import WeatherDashboard from './WeatherDashboard'; // replace with actual file
import AddRecipeForm from './AddRecipeForm'; // replace with actual file

const Drawer = createDrawerNavigator();

const Navigation = () => {
  const router = useRouter();

  return (
    <NavigationContainer>
      <Drawer.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // Hide the header
          drawerStyle: {
            width: 240, // Adjust the width of the drawer
            backgroundColor: '#f0f0f0',
          },
          drawerActiveTintColor: '#6200ee', // Active link color
          drawerInactiveTintColor: '#333', // Inactive link color
        }}>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="About Us" component={AboutUs} />
        <Drawer.Screen name="Weather Dashboard" component={WeatherDashboard} />
        <Drawer.Screen name="Add Recipe Form" component={AddRecipeForm} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

