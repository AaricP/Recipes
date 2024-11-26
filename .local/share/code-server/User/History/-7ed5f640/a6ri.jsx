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
        <TouchableOpacity onPress={() => router.push('/AddRecipeForm')} style={styles.button}>
          <Text style={styles.buttonText}>Add Recipe Form</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navButtonContainer}>
        <TouchableOpacity onPress={() => router.push('/RandomRecipePage')} style={styles.button}>
          <Text style={styles.buttonText}>Random Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',  // Aligning buttons vertically
    backgroundColor: '#333',  // Dark background for sidebar
    width: 250,  // Fixed width for sidebar
    height: '100%',  // Full screen height
    paddingTop: 50,  // Space from the top
    paddingLeft: 20,  // Space from the left
    position: 'fixed',  // Keep it fixed on the left side
  },
  navButtonContainer: {
    marginBottom: 15,  // Add space between buttons
  },
  button: {
    backgroundColor: '#6200ea',  // Purple background color
    paddingVertical: 15,  // Vertical padding for buttons
    paddingHorizontal: 20,  // Horizontal padding for buttons
    borderRadius: 8,  // Rounded corners for buttons
    alignItems: 'center',  // Center text inside the button
    justifyContent: 'center',  // Center content
    elevation: 5,  // Shadow effect for the button
    transitionDuration: '0.3s',  // Smooth transition effect for hover
  },
  buttonText: {
    color: '#fff',  // White text color
    fontSize: 16,  // Slightly bigger text
    fontWeight: 'bold',  // Bold text
  },
  // Add hover effect on touchable elements
  buttonHover: {
    backgroundColor: '#3700b3',  // Darker shade when hovering
    transform: [{ scale: 1.1 }],  // Slightly scale up on hover
  },
});
