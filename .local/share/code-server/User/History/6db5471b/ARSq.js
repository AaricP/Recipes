import React, { useState, useEffect } from 'react';
import { ScrollView, Button, StyleSheet, Alert, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { postRandomRecipe } from '../state/randomRecipeSlice';

export default function RandomRecipePage() {
  const [recipe, setRecipe] = useState(null);  // State for storing the fetched recipe
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();  // Redux dispatch function

  // Fetch random recipe from API
  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const data = await response.json();
        const meal = data.meals[0];
        const ingredients = getIngredientsAndQuantities(meal); // Format ingredients and quantities
        const recipeData = {
          Name: meal.strMeal, // No RecipeID needed here
          Ingredients: ingredients
        };
        setRecipe(recipeData); // Set the fetched recipe data
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

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!recipe || !recipe.Name) {
      newErrors.recipeName = 'Recipe name is required';
      isValid = false;
    }

    if (!recipe || !recipe.Ingredients) {
      newErrors.ingredients = 'Ingredients are required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveRecipe = () => {
    if (validateForm()) {
      dispatch(postRandomRecipe(recipe)); // Dispatch the recipe data to Redux
      Alert.alert('Recipe Saved', 'The random recipe has been saved!');
    } else {
      Alert.alert('Error', 'Please make sure all fields are filled out!');
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Random Recipe</Text>

      {recipe ? (
        <>
          <Text style={styles.recipeName}>{recipe.Name}</Text>
          <Text style={styles.ingredients}>{recipe.Ingredients}</Text>

          <Button title="Save Recipe" onPress={handleSaveRecipe} />
        </>
      ) : (
        <Text>Loading Random Recipe...</Text>
      )}

      {/* Display validation errors */}
      {errors.recipeName && <Text style={styles.error}>{errors.recipeName}</Text>}
      {errors.ingredients && <Text style={styles.error}>{errors.ingredients}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  recipeName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredients: {
    fontSize: 16,
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});
