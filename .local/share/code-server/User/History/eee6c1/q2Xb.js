import React, { useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, recipeFormData } from '../state/recipeSlice'; // Updated Redux action and selector
import { Card } from 'react-native-paper';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRecipes()); // Fetch recipe data
  }, [dispatch]);

  const recipeData = useSelector(recipeFormData); // Select recipe data from Redux store

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Text style={styles.label}>Recipe Name:</Text>
          <Text style={styles.value}>{item.Name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Ingredients:</Text>
          <Text style={styles.value}>{item.Ingredients}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{item.Quantity}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>My Recipes</Text>

      <FlatList
        data={recipeData} // Display recipe data
        keyExtractor={(item) => item.RecipeID.toString()} // Use 'RecipeID' as key
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
    backgroundColor: '#f8f8f8', // Light background for better contrast
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    marginBottom: 20,
    borderRadius: 8,
    elevation: 5, // Add slight shadow to the cards
    backgroundColor: '#fff', // White background for cards
    padding: 15, // Padding inside cards for better content spacing
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Space between each row of data
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333', // Dark color for labels for readability
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#555', // Slightly lighter color for the values
    flex: 2,
    textAlign: 'left',
  },
  header: {
    fontSize: 30, // Larger header size for better visibility
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Dark color for header
  },
});
