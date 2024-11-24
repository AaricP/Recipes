import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, Alert, View } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe, fetchRecipes } from '../state/recipesSlice'; // Redux actions
import Navigation from '../components/Navigation';

export default function AddUserForm() {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [quantity, setQuantity] = useState('');
  const recipes = useSelector((state) => state.recipes.list); // Access recipe state
  console.log('RECIPES IN STATE:', recipes);

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!name) {
      newErrors.name = 'Recipe name is required';
      isValid = false;
    }

    if (!ingredients) {
      newErrors.ingredients = 'Ingredients are required';
      isValid = false;
    }

    if (!quantity) {
      newErrors.quantity = 'Quantity is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      const recipeData = {
        name,
        ingredients,
        quantity,
      };

      // Save to Redux store
      dispatch(addRecipe(recipeData));

      // Save to backend
      try {
        const response = await fetch('http://your-ec2-instance/api/recipes/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recipeData),
        });
        if (response.ok) {
          const savedRecipe = await response.json();
          console.log('Recipe saved:', savedRecipe);
          Alert.alert('Recipe saved', JSON.stringify(savedRecipe));
          dispatch(fetchRecipes()); // Refresh recipes in Redux
        } else {
          console.error('Failed to save recipe:', response.statusText);
        }
      } catch (error) {
        console.error('Error saving recipe:', error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Navigation />

      <CustomInput
        label="Recipe Name"
        value={name}
        onChangeText={setName}
        placeholder="Enter recipe name"
        error={errors.name}
      />
      <CustomInput
        label="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Enter ingredients"
        multiline
        error={errors.ingredients}
      />
      <CustomInput
        label="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        error={errors.quantity}
      />
      <Button title="Save Recipe" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
