import React, { useState, useEffect } from 'react';
import { ScrollView, Button, StyleSheet, Text, View } from 'react-native';

export default function RandomRecipePage() {
  const [recipe, setRecipe] = useState(null);  // State for storing the fetched recipe

  // Fetch random recipe from API
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

  // Fetch the first random recipe on initial render
  useEffect(() => {
    fetchRandomRecipe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Random Recipe</Text>

      {recipe ? (
        <>
          <Text style={styles.recipeName}>{recipe.Name}</Text>
          <Text style={styles.ingredients}>{recipe.Ingredients}</Text>

          {/* Button to generate new random recipe */}
          <Button title="Generate New Recipe" onPress={fetchRandomRecipe} />
        </>
      ) : (
        <Text>Loading Random Recipe...</Text>
      )}
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
});
