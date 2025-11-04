import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { TextInput } from 'react-native-paper';
import { TextInput } from 'react-native';
// Icone
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ListOfAttractions(){
    return(
        <SafeAreaView style={{backgroundColor:"#f1ece1ff",flex:1}}>
        <ScrollView>
            
                <View style={styles.content}>
                <View style={styles.containerIcone}>
                <FontAwesome6 name="bars" size={24} color="black" />
                <Text style={styles.TextIcone}>Discover Beni Melall</Text>
                <Ionicons name="notifications-outline" size={24} color="black" />
                </View>
                    <View style={styles.containerRecherche}>
                    <Feather name="search" size={24} color="black"/>
                <TextInput placeholder='search' style={{textAlign:"center",flex:1,marginLeft:5}}/>
                
                </View>
            </View>
            
</ScrollView>
</SafeAreaView>
    )
}

const styles = StyleSheet.create({
    containerIcone:{
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
         marginVertical: 5,
         paddingHorizontal:20,
    },
    content:{
        paddingHorizontal:20,
    },
    TextIcone:{
        fontWeight:"bold",
        textAlign:"center",
        flex:1,
        marginLeft:5,
    },
    containerRecherche:{
        backgroundColor:"#fff",
       flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
        borderRadius:10, 
        paddingHorizontal:10,
        marginTop:20
    }
})
