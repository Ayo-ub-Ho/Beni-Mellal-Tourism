import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

export default function Index() {
  const router = useRouter();

  const fadeText = useRef(new Animated.Value(0)).current;
  const slideButton = useRef(new Animated.Value(50)).current;
  const zoomImage = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation texte
    Animated.timing(fadeText, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Animation bouton après 1.5s
    Animated.timing(slideButton, {
      toValue: 0,
      duration: 1000,
      delay: 1500,
      useNativeDriver: true,
    }).start();

    // Zoom sur l’image de fond
    Animated.timing(zoomImage, {
      toValue: 1.1, // agrandit légèrement
      duration: 8000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      <AnimatedImageBackground
        source={require("../assets/images/bg-bnimellal.jpg")}
        resizeMode="cover"
        style={[styles.image, { transform: [{ scale: zoomImage }] }]}
      >
        {/* Overlay pour assombrir légèrement l’image */}
        <View style={styles.overlay} />

        <View style={styles.content}>
          <Animated.Text style={[styles.title, { opacity: fadeText }]}>
            Bienvenue à Béni Mellal
          </Animated.Text>
          <Text style={styles.subtitle}>
            Découvrez la beauté naturelle et la richesse culturelle du Maroc 🌄
          </Text>
          <Animated.View style={{ transform: [{ translateY: slideButton }] }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/explor")}
            >
              <Text style={styles.buttonText}>Découvrir</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </AnimatedImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
    // marginTop: -50,
  },
  title: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#eee",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "600",
  },
});
