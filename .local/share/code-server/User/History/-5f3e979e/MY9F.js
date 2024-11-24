// UPDATE_THIS change import names and reducer names

import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice'; // Updated to recipeSlice
import randomRecipeReducer from './randomRecipeSlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer, // Use recipes reducer instead of form

  },
});

export default store;

