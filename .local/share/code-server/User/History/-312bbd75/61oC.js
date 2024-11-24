// UPDATE_THIS change what data is being displayed

import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, recipeFormData } from '../state/recipeSlice'; // Updated Redux action and selector
import { Card, Text } from 'react-native-paper';
import Navigation from '../components/Navigation';

export default function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchRecipes()); // Fetch recipe data instead of user data
  }, []);
  
  const recipeData = useSelector(recipeFormData); // Select recipe data from Redux store

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>Recipe Name: </Text>
          <Text style={styles.value}>{item.recipeName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ingredients: </Text>
          <Text style={styles.value}>{item.ingredients}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantity: </Text>
          <Text style={styles.value}>{item.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Instructions: </Text>
          <Text style={styles.value}>{item.instructions}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Navigation />
      <FlatList
        data={recipeData} // Display recipe data instead of user data
        keyExtractor={(item, index) => index.toString()} // Using index as key, assuming recipe data doesn't have a unique ID
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    flex: 1, // Ensures label and value stay on the same line with space between
  },
  value: {
    flex: 2, // Allows value text to take more space, making it responsive
    textAlign: 'left',
  },
});
