import { useState } from 'react';

export default function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToFavorites = (id: number) => setFavorites([...favorites, id]);
  const removeFromFavorites = (id: number) =>
    setFavorites(favorites.filter((itemId) => itemId !== id));
  const isFavorite = (id: number) => favorites.includes(id);

  return { favorites, addToFavorites, removeFromFavorites, isFavorite };
}
