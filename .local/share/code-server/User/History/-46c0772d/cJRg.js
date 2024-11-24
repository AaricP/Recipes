import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs

// Thunk to fetch a random recipe from the API (MealDB)
export const fetchRandomRecipe = createAsyncThunk(
  'randomRecipe/fetchRandomRecipe',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue('Failed to fetch random recipe');
      }
      return data.meals[0]; // Returning the meal object directly
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch random recipe');
    }
  }
);

// Thunk to post a random recipe form data to the API (for saving it to your backend)
export const postRandomRecipe = createAsyncThunk(
  'randomRecipe/postRandomRecipe',
  async (recipeData, { rejectWithValue }) => {
    const serverUrl = process.env.EXPO_PUBLIC_PUBLIC_IP;
    try {
      const response = await fetch(`http://${serverUrl}:8000/api/addRecipe/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json(); // Parse response as JSON
      return data; // This will be the resolved action payload
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit random recipe');
    }
  }
);

const initialState = {
  randomRecipe: null,
  loading: false,
  error: null,
};

const randomRecipeSlice = createSlice({
  name: 'randomRecipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle POST request for saving the random recipe
      .addCase(postRandomRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRandomRecipe.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the server responds with the saved recipe data
        state.randomRecipe = action.payload;
      })
      .addCase(postRandomRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the server
      })

      // Handle GET request for fetching a random recipe
      .addCase(fetchRandomRecipe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomRecipe.fulfilled, (state, action) => {
        state.loading = false;
        // Format ingredients and quantities before storing
        const meal = action.payload;
        const ingredients = formatIngredients(meal); // Concatenate ingredients and quantities
        const formattedRecipe = {
          RecipeID: uuidv4(), // Generate a unique ID
          Name: meal.strMeal,
          Ingredients: ingredients,
          Quantity: 1, // Set Quantity to 1
        };
        state.randomRecipe = formattedRecipe;
      })
      .addCase(fetchRandomRecipe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the server
      });
  },
});

// Helper function to format ingredients and quantities
const formatIngredients = (meal) => {
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

export const randomRecipeData = (state) => state.randomRecipe.randomRecipe;
export const randomRecipeLoading = (state) => state.randomRecipe.loading;
export const randomRecipeError = (state) => state.randomRecipe.error;

export default randomRecipeSlice.reducer;
