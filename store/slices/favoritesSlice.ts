import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Recipe = {
  id: number;
  title: string;
  instructions?: string;
};

type FavoritesState = {
  favorites: Recipe[];
};

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Recipe>) => {
      if (!state.favorites.find((recipe) => recipe.id === action.payload.id)) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.favorites = state.favorites.filter((recipe) => recipe.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.favorites;
export default favoritesSlice.reducer;
