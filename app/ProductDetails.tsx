import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ProductDetails() {
  const params = useLocalSearchParams(); 

  // handle case if thumbnail is array or undefined
  const thumbnailUri =
    Array.isArray(params.thumbnail) ? params.thumbnail[0] : params.thumbnail;
  const description = params.description ? decodeURIComponent(params.description as string) : "";
  return (
    <SafeAreaView>
      <View style={styles.container}>
      {thumbnailUri && <Image source={{ uri: thumbnailUri }} style={styles.image} />}
      <Ionicons name="caret-back-circle-sharp" size={40} color="black" style={{padding:9}} onPress={()=>router.push("/ListOfAttractions")}/>
      <View style={{borderRadius:30,backgroundColor:"#fff",marginTop:300}}>
        <Text style={styles.title}>{params.name}</Text>
      {/* <Text>ID: {params.id}</Text> */}
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity  style={[styles.Button, { marginTop: 15 }]}>
        <Text style={styles.Text}>View Photos</Text>
      </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{},
  title: { fontSize: 22,padding:10, fontWeight: "bold", },
  image: { width: "100%" , height: 400 ,borderRadius: 0, marginBottom:20 ,position: "absolute",zIndex: 0,},
  description: { fontSize: 16, padding:10, lineHeight: 30,color:"#929191ff"},
 // styles Button
 Text:{fontWeight:"bold",color:"#fff",textAlign:"center"},
 Button:{backgroundColor:"#cd7a7aff", width:"90%",alignItems:"center",padding:20,alignSelf:"center",borderRadius:9}
});
