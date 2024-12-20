import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

type Recipe = {
  id: number;
  title: string;
  instructions?: string;
};

type RecipeDetailsProps = {
  recipe: Recipe;
  onClose: () => void;
};

export default function RecipeDetails({ recipe, onClose }: RecipeDetailsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{recipe.title}</Text>
      {recipe.instructions ? (
        <Text style={styles.instructions}>{recipe.instructions}</Text>
      ) : (
        <Text style={styles.instructions}>No instructions available.</Text>
      )}
      <Button title="Close" onPress={onClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  instructions: { fontSize: 16, marginTop: 10 },
});
