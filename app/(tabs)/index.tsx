import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { API_BASE_URL, API_KEY } from '@/constants/api';
import RenderHtml from 'react-native-render-html';
import FavoritesScreen from '@/app/FavoritesScreen';
import RecipeDetails from '@/app/RecipeDetails';

type Recipe = {
  id: number;
  title: string;
  image?: string;
  instructions?: string;
};

export default function HomeScreen() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const searchRecipes = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/recipes/complexSearch?query=${searchQuery}&apiKey=${API_KEY}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  const fetchRecipeDetails = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/recipes/${id}/information?apiKey=${API_KEY}`);
      const data = await response.json();
      setSelectedRecipe(data);
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    }
  };

  const addToFavorites = (recipe: Recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      setFavorites([...favorites, recipe]);
    }
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const closeRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  if (selectedRecipe) {
    return <RecipeDetails recipe={selectedRecipe} onClose={closeRecipeDetails} />;
  }

  return isFavoritesOpen ? (
    <FavoritesScreen
      favorites={favorites}
      removeFromFavorites={removeFromFavorites}
      navigateHome={() => setIsFavoritesOpen(false)}
      viewRecipe={(recipe) => fetchRecipeDetails(recipe.id)}
    />
  ) : (
    <View style={styles.container}>
      <Text style={styles.header}>Search Recipes</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for recipes"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <Button title="Search" onPress={searchRecipes} />
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => setIsFavoritesOpen(true)}
        >
          <Text style={styles.buttonText}>Favorites</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <Text style={styles.itemText}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => fetchRecipeDetails(item.id)}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => addToFavorites(item)}
              >
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  searchContainer: { flexDirection: 'row', marginBottom: 12, gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: { fontSize: 16, flex: 1 },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
    maxWidth: 80,
  },
  buttonText: { color: '#fff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  favoritesButton: {
    backgroundColor: '#FF5722',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
});
