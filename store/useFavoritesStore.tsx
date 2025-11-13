import { create } from "zustand";

interface FavoritesStore {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  loadFavorites: () => void;
}

const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  addFavorite: (id) =>
    set((state) => ({ favorites: [...state.favorites, id] })),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((fav) => fav !== id),
    })),

  isFavorite: (id) => get().favorites.includes(id),

  loadFavorites: () => {
    console.log("Favorites loaded");
  },
}));

export default useFavoritesStore;
