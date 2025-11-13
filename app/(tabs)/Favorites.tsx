import { getProdacte } from "@/service/AttractionsSelector";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import useFavoritesStore from "../../store/useFavoritesStore";

interface Prodacte {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  images?: string[];
}

export default function Favorites() {
  const favorites = useFavoritesStore(
    (state: { favorites: any }) => state.favorites
  );
  const removeFavorite = useFavoritesStore(
    (state: { removeFavorite: any }) => state.removeFavorite
  );

  const [products, setProducts] = useState<Prodacte[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProdacte();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favoriteProducts.length === 0 ? (
        <Text style={styles.noFav}>No favorites yet</Text>
      ) : (
        favoriteProducts.map((product) => (
          <View key={product.id} style={styles.card}>
            <Image source={{ uri: product.thumbnail }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => removeFavorite(product.id)}
            >
              <Text style={styles.buttonText}>Remove Favorite</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  noFav: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 50,
    color: "#666",
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 8,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
