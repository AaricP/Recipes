import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../state/recipesSlice';

const RecipeForm = () => {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [quantity, setQuantity] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async () => {
        const newRecipe = { name, ingredients, quantity };
        // Save to Redux store
        dispatch(addRecipe(newRecipe));

        // Save to backend
        const response = await fetch('http://your-ec2-instance/api/recipes/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecipe),
        });
        if (response.ok) {
            console.log('Recipe saved!');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Recipe Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Ingredients" value={ingredients} onChangeText={setIngredients} multiline />
            <TextInput placeholder="Quantity" value={quantity} onChangeText={setQuantity} />
            <Button title="Save Recipe" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
});

export default RecipeForm;
