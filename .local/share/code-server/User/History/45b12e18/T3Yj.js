// UPDATE_THIS change what data is being displayed

import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, recipeFormData } from '../state/recipeSlice'; // Updated Redux action and selector
import { Card } from 'react-native-paper';
import Navigation from '../components/Navigation';

export default function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchRecipes()); // Fetch recipe data instead of user data
  }, [dispatch]);
  
  const recipeData = useSelector(recipeFormData); // Select recipe data from Redux store

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>Recipe Name: </Text>
          <Text style={styles.value}>{item.Name}</Text> {/* Updated to use 'Name' */}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ingredients: </Text>
          <Text style={styles.value}>{item.Ingredients}</Text> {/* Updated to use 'Ingredients' */}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantity: </Text>
          <Text style={styles.value}>{item.Quantity}</Text> {/* Updated to use 'Quantity' */}
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Navigation />
      <FlatList
        data={recipeData} // Display recipe data instead of user data
        keyExtractor={(item) => item.RecipeID.toString()} // Use 'RecipeID' as key if available
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
