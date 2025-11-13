import { getProdacte } from "@/service/AttractionsSelector";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFavoritesStore from "../../store/useFavoritesStore"; // ✅ التصحيح هنا

interface Prodacte {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  images?: string[];
}

export default function ListOfAttractions() {
  const [products, setProducts] = useState<Prodacte[]>([]);
  const [loading, setLoading] = useState(true);
  const tabHeight = useBottomTabBarHeight();

  const { favorites, addFavorite, removeFavorite, isFavorite, loadFavorites } =
    useFavoritesStore();

  useEffect(() => {
    loadFavorites();
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProdacte();
      setProducts(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (productId: string) => {
    if (isFavorite(productId)) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f1ece1ff" }}>
      <View style={styles.content}>
        <View style={styles.containerIcone}>
          <FontAwesome6 name="bars" size={24} color="black" />
          <Text style={styles.TextIcone}>Discover Beni Mellal</Text>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>

        <View style={styles.containerRecherche}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder="Search"
            style={{ flex: 1, textAlign: "center", marginLeft: 5 }}
          />
        </View>

        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.Text1}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.Text1}>Nature</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.Text1}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.Text1}>Culture</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/ProductDetails",
                  params: {
                    id: item.id,
                    name: item.name,
                    thumbnail: item.thumbnail,
                    description: encodeURIComponent(item.description),
                    images: item.images
                      ? item.images.join(",")
                      : item.thumbnail,
                  },
                })
              }
              activeOpacity={0.7}
            >
              <View style={styles.Card}>
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: "100%", height: 180, borderRadius: 12 }}
                />
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Ionicons
                    name={isFavorite(item.id) ? "heart" : "heart-outline"}
                    size={28}
                    color={isFavorite(item.id) ? "#ff6b6b" : "#fff"}
                  />
                </TouchableOpacity>

                <Text style={styles.Text2}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: tabHeight + 20 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20 },
  containerIcone: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  TextIcone: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 5,
  },
  containerRecherche: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 17,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f1cbbaff",
    width: 85,
    padding: 17,
    borderRadius: 50,
  },
  Text1: {
    fontWeight: "bold",
    textAlign: "center",
  },
  Card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
    position: "relative",
  },
  Text2: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 50,
    padding: 8,
    zIndex: 10,
  },
});
