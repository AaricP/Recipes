// UPDATE_THIS change navigation to new page names

import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function Navigation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',  // Stack buttons vertically
    backgroundColor: '#333',  // Dark background for sidebar
    width: 250,  // Fixed width for sidebar
    height: '100%',  // Full screen height
    paddingTop: 50,  // Space from the top of the screen
    paddingLeft: 20,  // Space from the left edge of the screen
    position: 'fixed',  // Keep the sidebar fixed on the screen
    top: 0,  // Start at the top of the screen
    left: 0, // Start at the left of the screen
  },
  navButtonContainer: {
    marginBottom: 15,  // Space between buttons
  },
  button: {
    backgroundColor: '#6200ea',  // Purple background for buttons
    paddingVertical: 15,  // Vertical padding
    paddingHorizontal: 20,  // Horizontal padding
    borderRadius: 8,  // Rounded corners
    alignItems: 'center',  // Center text inside the button
    justifyContent: 'center',  // Center the content
  },
  buttonText: {
    color: '#fff',  // White text color
    fontSize: 16,  // Font size
    fontWeight: 'bold',  // Bold font
  },
});
