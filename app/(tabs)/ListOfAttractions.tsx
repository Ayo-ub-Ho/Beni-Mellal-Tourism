import { getProdacte } from '@/service/AttractionsSelector';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListOfAttractions() {
    interface Product {
  id: string;
  name: string;
  thumbnail: string;
}

  const tabHeight = useBottomTabBarHeight();

const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProdacte();
      setProducts(data);
      console.log("DATA FROM API:", data);
    } catch (error) {
      console.error("rah mt9blch:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#f1ece1ff", flex: 1 }}>
      <View style={styles.content}>
        
        {/* Header */}
        <View style={styles.containerIcone}>
          <FontAwesome6 name="bars" size={24} color="black" />
          <Text style={styles.TextIcone}>Discover Beni Mellal</Text>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>

        {/* Search */}
        <View style={styles.containerRecherche}>
          <Feather name="search" size={24} color="black" />
          <TextInput placeholder="search" style={{ textAlign: "center", flex: 1, marginLeft: 5 }} />
        </View>

        {/* Filter Buttons */}
        <View style={styles.containerButton}>
          <TouchableOpacity style={styles.button}><Text style={styles.Text1}>All</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text style={styles.Text1}>Nature</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text style={styles.Text1}>History</Text></TouchableOpacity>
          <TouchableOpacity style={styles.button}><Text style={styles.Text1}>Culture</Text></TouchableOpacity>
        </View>

        {/* List */}
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: tabHeight + 140 }}
          renderItem={({ item }) => (
            <View style={styles.Card}>
              <Image source={{ uri: item.thumbnail }} style={{ width: "100%", height: 180, borderRadius: 12 }} />
              <Text style={styles.Text2}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  containerIcone: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
  TextIcone: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    marginLeft: 5,
  },
  containerRecherche: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  containerButton: {
    marginTop: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#f1cbbaff",
    width: 85,
    padding: 17,
    borderRadius: 50,
  },
  Text1: {
    textAlign: "center",
    fontWeight: "bold",
  },
  Card: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
  Text2: {
    fontWeight: "bold",
    fontSize: 17,
    marginTop: 10,
  }
});
