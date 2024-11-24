import React, { useState } from 'react';
import { ScrollView, Button, StyleSheet, Alert, Text } from 'react-native';
import { CustomInput } from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { postRandomRecipe, randomRecipeData } from '../state/randomRecipeSlice'; // Updated Redux action and selector

export default function AddRecipeForm() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [quantity, setQuantity] = useState('');
  const randomRecipe = useSelector(state => randomRecipeData(state)); // Get the latest random recipe from Redux
  console.log('OUR RECIPE REDUX STATE', randomRecipe);

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
        Quantity: quantity,
      };
      dispatch(postRandomRecipe(formData)); // Dispatch the recipe data to Redux and send to Django
      Alert.alert('Recipe submitted', JSON.stringify(formData));
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Add a Recipe</Text>

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
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
});
