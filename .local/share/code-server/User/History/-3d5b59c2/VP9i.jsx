// UPDATE_THIS change navigation to new page names

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Navigation() {
  const router = useRouter();

  return (
    <View style={styles.pageContainer}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <View style={styles.navButtonContainer}>
          <TouchableOpacity onPress={() => router.push('/')} style={styles.button}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navButtonContainer}>
          <TouchableOpacity onPress={() => router.push('/aboutUs')} style={styles.button}>
            <Text style={styles.buttonText}>About Us</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navButtonContainer}>
          <TouchableOpacity onPress={() => router.push('/WeatherDashboard')} style={styles.button}>
            <Text style={styles.buttonText}>Weather Dashboard</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.navButtonContainer}>
          <TouchableOpacity onPress={() => router.push('/AddRecipeForm')} style={styles.button}>
            <Text style={styles.buttonText}>Add Recipe Form</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.contentArea}>
        {/* The content of your current page will be rendered here */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'row',  // Align sidebar and content horizontally
  },
  sidebar: {
    width: 250,  // Fixed width for sidebar
    backgroundColor: '#333',  // Dark background color for sidebar
    height: '100%',  // Sidebar spans the full height
    paddingTop: 50,  // Add space from the top
    paddingLeft: 20,  // Padding from the left
  },
  navButtonContainer: {
    marginBottom: 15,  // Add space between buttons
  },
  button: {
    backgroundColor: '#6200ea',  // Purple background color
    paddingVertical: 15,  // Vertical padding
    paddingHorizontal: 20,  // Horizontal padding
    borderRadius: 8,  // Rounded corners
    alignItems: 'center',  // Center content inside button
    justifyContent: 'center',  // Center content
  },
  buttonText: {
    color: '#fff',  // White text color
    fontSize: 16,  // Text size
    fontWeight: 'bold',  // Bold text
  },
  contentArea: {
    flex: 1,  // Occupy remaining space
    padding: 20,  // Padding for the content area
    backgroundColor: '#f4f4f4',  // Light background for content
  },
});
