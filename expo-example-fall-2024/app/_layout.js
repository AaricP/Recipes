import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state/store';
import { Slot } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Navigation from '../components/Navigation'; // Sidebar navigation

export default function Root() {
  return (
    <Provider store={store}>
      <View style={styles.pageContainer}>
        {/* Sidebar Navigation (on the left) */}
        <Navigation />

        {/* Main Content Area */}
        <View style={styles.contentArea}>
          <Slot />  {/* Dynamically renders the content of the active page */}
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flexDirection: 'row', // Sidebar on the left and content on the right
    height: '100%', // Full screen height
  },
  contentArea: {
    flex: 1, // Content takes up remaining space next to sidebar
    padding: 20, // Padding for content
    backgroundColor: '#f4f4f4', // Light background color for content
  },
});
