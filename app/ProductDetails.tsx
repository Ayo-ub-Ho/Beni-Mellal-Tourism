import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useFavoritesStore from "../store/useFavoritesStore";

export default function ProductDetails() {
  const params = useLocalSearchParams();

  const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();

  const productId = params.id as string;
  const isFav = isFavorite(productId);

  const thumbnailUri = Array.isArray(params.thumbnail)
    ? params.thumbnail[0]
    : params.thumbnail;

  const description = params.description
    ? decodeURIComponent(params.description as string)
    : "";

  const allImages = params.images
    ? typeof params.images === "string"
      ? params.images.split(",")
      : params.images
    : params.thumbnail
    ? typeof params.thumbnail === "string"
      ? [params.thumbnail]
      : params.thumbnail
    : [];

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(productId);
    } else {
      addFavorite(productId);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {thumbnailUri && (
              <Image source={{ uri: thumbnailUri }} style={styles.image} />
            )}

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={toggleFavorite}
            >
              <Ionicons
                name={isFav ? "heart" : "heart-outline"}
                size={32}
                color={isFav ? "#ff6b6b" : "#fff"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.title}>{params.name}</Text>

            <View style={styles.divider} />

            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{description}</Text>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.galleryButton}
              onPress={() =>
                router.push({
                  pathname: "/gallery",
                  params: {
                    images: allImages.join(","),
                    placeName: params.name,
                  },
                })
              }
            >
              <Ionicons name="images-outline" size={24} color="#fff" />
              <Text style={styles.galleryButtonText}>
                View Photos ({allImages.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f1ece1ff",
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 400,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 10,
    zIndex: 10,
  },
  favoriteButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    padding: 10,
    zIndex: 10,
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 20,
    minHeight: 300,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 26,
    color: "#666",
    textAlign: "justify",
  },
  galleryButton: {
    backgroundColor: "#cd7a7aff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    gap: 10,
  },
  galleryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
