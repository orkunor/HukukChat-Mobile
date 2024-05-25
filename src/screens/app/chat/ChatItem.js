import React from "react";
import { View, SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Wave } from 'react-native-animated-spinkit';
import { blueColor, orangeColor } from "../../../statics/color";

const ChatItem = ({ item, index }) => {
    function gosterme(str) {
        if (str.length <= 4) {
            return ""; // Dize 4 karakterden kısa ise hiçbir şey döndür
        } else {
            return str.slice(0, -4); // Dizenin son 4 karakterini kes ve geri kalanını döndür
        }
    }

    if (item.title.slice(-4) === "null") {
        // Eğer dizenin son 4 karakteri "null" ise gosterme fonksiyonunu çağır
        return (
            <View style={(item.owner == "Ai") ? styles.ai : styles.user}>
                <View style={styles.container}>
                    {
                        (item.owner == "Ai")
                            ?
                            <Image style={styles.imageai}
                            tintColor={"#D77A25"}
                                source={require(`../../../icons/1.png`)} />
                            :
                            <Image style={styles.imageai}
                                source={require(`../../../icons/0.png`)} />
                    }
                    <Text style={(item.owner == "Ai") ? styles.aiText : styles.userText}>{gosterme(item.title)}</Text>
                </View>
            </View>
        );
    } else if (item.title === "loading"){
            return(
                <View style={(item.owner == "Ai") ? styles.ai : styles.user}>
                <View style={styles.container}>
                    {
                        (item.owner == "Ai")
                            ?
                            <Image style={styles.imageai}
                            tintColor={"#D77A25"}
                            source={require(`../../../icons/1.png`)} />
                            :
                            <Image style={styles.imageai}
                                source={require(`../../../icons/0.png`)} />
                    }
                                                <Wave size={25} color={orangeColor} />
                </View>
            </View>
            )
    }
    else {
        return (
            <View style={(item.owner == "Ai") ? styles.ai : styles.user}>
                <View style={styles.container}>
                    {
                        (item.owner == "Ai")
                            ?
                            <Image style={styles.imageai}
                                tintColor={"#D77A25"}
                                source={require(`../../../icons/1.png`)} />
                            :
                            <Image style={styles.imageai}
                                source={require(`../../../icons/0.png`)} />
                    }
                    <Text style={(item.owner == "Ai") ? styles.aiText : styles.userText}>{item.title}</Text>
                </View>
            </View>
        );
    }
}

export default ChatItem;

const styles = StyleSheet.create({
    ai: {
        backgroundColor: 'white'

    },
    user: {
    backgroundColor:"#E5E4E2"
    },
    aiText: { marginRight: 75,        color: blueColor,
},
    userText: {
        marginRight: 75,
        color: orangeColor,
        fontWeight:'400'
    },
    container: {
        minHeight: 75, marginTop: 2, justifyContent: 'flex-start', paddingTop: 10, paddingBottom: 10, flexDirection: 'row', alignItems: 'center', paddingRight: 25
    },
    imageai: { height: 25, width: 38, marginRight: 15, marginLeft: 25 }
});
