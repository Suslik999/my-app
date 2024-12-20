import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

type Recipe = {
  id: number;
  title: string;
  image?: string;
};

type FavoritesScreenProps = {
  favorites: Recipe[];
  removeFromFavorites: (id: number) => void;
  navigateHome: () => void;
  viewRecipe: (recipe: Recipe) => void;
};

export default function FavoritesScreen({
  favorites,
  removeFromFavorites,
  navigateHome,
  viewRecipe,
}: FavoritesScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorites</Text>
      <TouchableOpacity style={styles.homeButton} onPress={navigateHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <Text style={styles.itemText}>{item.title}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => viewRecipe(item)}
              >
                <Text style={styles.buttonText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => removeFromFavorites(item.id)}
              >
                <Text style={styles.buttonText}>Remove</Text>
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
  homeButton: {
    backgroundColor: '#FF5722',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
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
});
