// UPDATE_THIS to get new form data for recipes

import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, Alert, View } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { postRecipeForm, recipeFormData } from '../state/recipeSlice'; // Updated Redux action and selector
import Navigation from '../components/Navigation';

export default function AddRecipeForm() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [quantity, setQuantity] = useState('');
  const allRecipes = useSelector(state => recipeFormData(state)); // Get recipe data from Redux state
  console.log('OUR RECIPE REDUX STATE', allRecipes);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch(); // Initialize Redux dispatch

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!recipeName) {
      newErrors.recipeName = 'Recipe name is required';
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

  const handleSubmit = () => {
    if (validateForm()) {
      const formData = {
        Name: recipeName,
        Ingredients: ingredients,
        Quantity: quantity
      };
      dispatch(postRecipeForm(formData)); // Dispatch the recipe data to Redux
      Alert.alert('Recipe submitted', JSON.stringify(formData));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Navigation />

      <CustomInput
        label="Recipe Name"
        value={recipeName}
        onChangeText={setRecipeName}
        placeholder="Enter recipe name"
        error={errors.recipeName}
      />
      <CustomInput
        label="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Enter ingredients"
        error={errors.ingredients}
      />
      <CustomInput
        label="Quantity"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Enter quantity"
        keyboardType="numeric"
        error={errors.quantity}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  navButtonContainer: {
    marginBottom: 20,
  },
});
