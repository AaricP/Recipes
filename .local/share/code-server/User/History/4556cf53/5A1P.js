// UPDATE_THIS change import names and reducer names

import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './recipeSlice'; // Updated to recipeSlice
import weatherReducer from './weatherSlice';
import randomRecipeReducer form './randomRecipeSlice';

export const store = configureStore({
  reducer: {
    recipes: recipeReducer, // Use recipes reducer instead of form
    weather: weatherReducer,
    randomRecipe: randomRecipeReducer,
  },
});

export default store;

