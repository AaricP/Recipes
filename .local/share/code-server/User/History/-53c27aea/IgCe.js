// UPDATE_THIS maybe just change names???, change function names and rename file

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch the list of recipes from the API
export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const serverUrl = process.env.EXPO_PUBLIC_PUBLIC_IP;
      const response = await fetch(`http://${serverUrl}:8000/api/recipes/`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json(); // Parse response as JSON
      return data; // This will be the resolved action payload
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch recipes');
    }
  }
);

// Thunk to post recipe form data to the API
export const postRecipeForm = createAsyncThunk(
  'recipes/postRecipeForm',
  async (recipeData, { rejectWithValue }) => {
    const serverUrl = process.env.EXPO_PUBLIC_PUBLIC_IP;
    try {
      const response = await fetch(`http://${serverUrl}:8000/api/addRecipe/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipeData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }

      const data = await response.json(); // Parse response as JSON
      console.log(data)
      return data; // This will be the resolved action payload
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit recipe form');
    }
  }
);

const initialState = {
  recipeData: [],
  loading: false,
  error: null,
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle POST request
      .addCase(postRecipeForm.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postRecipeForm.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeData.push(action.payload); // Assuming the server responds with the saved recipe data
      })
      .addCase(postRecipeForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the server
      })

      // Handle GET request for fetching recipes
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeData = action.payload; // Replace recipeData with the fetched recipes
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Error message from the server
      });
  },
});

export const recipeFormData = (state) => state.recipes.recipeData;
export const recipeLoading = (state) => state.recipes.loading;
export const recipeError = (state) => state.recipes.error;

export default recipeSlice.reducer;
