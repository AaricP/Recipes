import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs
import { postRandomRecipe } from '../state/randomRecipeSlice';

export default function RandomRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const dispatch = useDispatch();

  // Fetch random recipe from API
  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];
        const ingredients = getIngredientsAndQuantities(meal); // Format ingredients and quantities
        const recipeData = {
          RecipeID: uuidv4(), // Generate a unique ID
          Name: meal.strMeal,
          Ingredients: ingredients
        };
        setRecipe(recipeData); // Set the formatted recipe
      } catch (error) {
        console.error('Error fetching random recipe:', error);
      }
    };

    fetchRandomRecipe();
  }, []);

  // Format ingredients and quantities
  const getIngredientsAndQuantities = (meal) => {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient !== '') {
        ingredients.push(`${ingredient} (${measure})`);
      }
    }
    return ingredients.join(', '); // Concatenate ingredients and quantities with commas
  };

  const handleSaveRecipe = () => {
    console.log(recipe)
    if (recipe) {
      dispatch(postRandomRecipe(recipe)); // Dispatch the recipe data to Redux
      Alert.alert('Recipe Saved', 'The random recipe has been saved!');
    } else {
      Alert.alert('Error', 'No recipe data available!');
    }
  };

  return (
    <View style={styles.container}>
      {recipe ? (
        <>
          <Text style={styles.header}>{recipe.Name}</Text>
          <Text style={styles.ingredients}>{recipe.Ingredients}</Text>
          <Button title="Save Recipe" onPress={handleSaveRecipe} />
        </>
      ) : (
        <Text>Loading Random Recipe...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});
