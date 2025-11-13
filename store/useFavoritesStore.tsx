import { create } from "zustand";
import { storage } from "./mmkvStorage";

interface FavoritesStore {
  favorites: string[];
  addFavorite: (id: string) => Promise<void>;
  removeFavorite: (id: string) => Promise<void>;
  isFavorite: (id: string) => boolean;
  loadFavorites: () => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
}

const FAVORITES_KEY = "favorites";

const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],

  loadFavorites: async () => {
    try {
      const saved = await storage.getString(FAVORITES_KEY);
      if (saved) set({ favorites: JSON.parse(saved) });
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  },

  addFavorite: async (id) => {
    const state = get();
    if (state.favorites.includes(id)) return;

    const newFavorites = [...state.favorites, id];
    set({ favorites: newFavorites });

    try {
      await storage.set(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  },

  removeFavorite: async (id) => {
    const newFavorites = get().favorites.filter((fav) => fav !== id);
    set({ favorites: newFavorites });

    try {
      await storage.set(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  },

  isFavorite: (id) => get().favorites.includes(id),

  toggleFavorite: async (id) => {
    const { isFavorite, addFavorite, removeFavorite } = get();
    if (isFavorite(id)) {
      await removeFavorite(id);
    } else {
      await addFavorite(id);
    }
  },
}));

export default useFavoritesStore;
