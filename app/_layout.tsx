import useFavoritesStore from "@/store/useFavoritesStore"; // Bدّل path ila كان مختلف
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const { loadFavorites } = useFavoritesStore();

  // Load favorites ملي l'app kat-start
  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="index"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="explor"
          options={{ title: "Exploration", headerShown: false }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
