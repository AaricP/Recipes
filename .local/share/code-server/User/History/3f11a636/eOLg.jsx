// UPDATE_THIS change navigation to new page names

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default Navigation = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.navButtonContainer}>
        <Button mode="contained" onPress={() => router.push('/')}>
          Home
        </Button>
      </View>
      <View style={styles.navButtonContainer}>
        <Button mode="contained" onPress={() => router.push('/aboutUs')}>
          About Us
        </Button>
      </View>
      <View style={styles.navButtonContainer}>
        <Button mode="contained" onPress={() => router.push('/WeatherDashboard')}>
          Recipe Dashboard
        </Button>
      </View>
      <View style={styles.navButtonContainer}>
        <Button mode="contained" onPress={() => router.push('/AddRecipeForm')}>
          Add Recipe Form
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  navButtonContainer: {
    flex: 1,
    margin: 8,
  },
});
