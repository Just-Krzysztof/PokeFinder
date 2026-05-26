import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[];
  toggleFavorite: (name: string) => void;
  isFavorite: (name: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (name) =>
        set((state) => ({
          favorites: state.favorites.includes(name)
            ? state.favorites.filter((n) => n !== name)
            : [...state.favorites, name],
        })),
      isFavorite: (name) => get().favorites.includes(name),
    }),
    { name: "pokemon-favorites" },
  ),
);
