import { AttractionsSelector } from '@/service/AttractionsSelector';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
// import { TextInput } from 'react-native-paper';
import { TextInput, TouchableOpacity } from 'react-native';
// Icone
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ListOfAttractions(){
const tabHeight = useBottomTabBarHeight();

    return(
        <SafeAreaView style={{backgroundColor:"#f1ece1ff",flex:1}}>
            
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
                data={AttractionsSelector}
                keyExtractor={(item)=>item.id.toString()}
                contentContainerStyle={{  paddingBottom: tabHeight + 140}}
                renderItem={({item})=>(
                    <View style={styles.Card}>
                        <Image style={styles.image}source={item.image} resizeMode="cover"/>
                    <View style={{alignSelf:'flex-start',marginTop:5,paddingHorizontal:5}}>
                        <Text style={styles.Text2}>{item.title}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    </View>
                    </View>
                )}
                />
            </View>
            
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
    },
    containerButton:{
        marginTop:17,
        alignItems:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        marginBottom:10
    },
    button:{
        backgroundColor:"#f1cbbaff",
        width:85,
        padding:17,
        borderRadius:50,
    },
    Text1:{
        textAlign:"center",
        fontWeight:"bold",
    },
    Card:{
        backgroundColor:"#fff",
        alignItems:"center",
        padding:10,
        marginVertical:10,
        borderRadius:15,
        shadowColor:"red",
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.5,
        shadowRadius:4
    },
    image:{
        height:180,
        width:"95%",
        borderRadius:15
    },
    Text2:{
        fontWeight:"bold",
        fontSize:17,
    },
    description:{
        marginTop:3
    }
})
