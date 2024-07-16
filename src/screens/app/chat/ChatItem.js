import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Wave } from 'react-native-animated-spinkit';
import Markdown from 'react-native-markdown-display';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { blueColor, orangeColor } from "../../../statics/color";

const ChatItem = ({ item, index }) => {
    const [isMenuVisible, setIsMenuVisible] = React.useState(false);

    const handleCopyText = (text) => {
        Clipboard.setString(text);
        setIsMenuVisible(false);
    };

    const gosterme = (str) => {
        if (str.length <= 4) {
            return ""; // Dize 4 karakterden kısa ise hiçbir şey döndür
        } else {
            return str.slice(0, -4); // Dizenin son 4 karakterini kes ve geri kalanını döndür
        }
    };

    if (item.title.slice(-4) === "null") {
        return (
            <View style={item.owner == "Ai" ? styles.ai : styles.user}>
                <View style={styles.container}>
                    {item.owner == "Ai" ? (
                        <Image
                            style={styles.imageai}
                            tintColor={"#D77A25"}
                            source={require(`../../../icons/1.png`)}
                        />
                    ) : (
                        <Image
                            style={styles.imageai}
                            source={require(`../../../icons/0.png`)}
                        />
                    )}
                    <Text style={item.owner == "Ai" ? styles.aiText : styles.userText}>
                        {gosterme(item.title)}
                    </Text>
                </View>
            </View>
        );
    } else if (item.title === "loading") {
        return (
            <View style={item.owner == "Ai" ? styles.ai : styles.user}>
                <View style={styles.container}>
                    {item.owner == "Ai" ? (
                        <Image
                            style={styles.imageai}
                            tintColor={"#D77A25"}
                            source={require(`../../../icons/1.png`)}
                        />
                    ) : (
                        <Image
                            style={styles.imageai}
                            source={require(`../../../icons/0.png`)}
                        />
                    )}
                    <Wave size={25} color={orangeColor} />
                </View>
            </View>
        );
    } else {
        return (
            <View style={item.owner == "Ai" ? styles.ai : styles.user}>
                <View style={styles.container}>
                    {item.owner == "Ai" ? (
                        <Image
                            style={styles.imageai}
                            tintColor={"#D77A25"}
                            source={require(`../../../icons/1.png`)}
                        />
                    ) : (
                        <Image
                            style={styles.imageai}
                            source={require(`../../../icons/0.png`)}
                        />
                    )}
                    <TouchableOpacity
                        style={styles.textContainer}
                        onLongPress={() => setIsMenuVisible(true)}
                    >
                        <Markdown style={item.owner == "Ai" ? styles.aiText : styles.userText}>
                            {item.title}
                        </Markdown>
                        {isMenuVisible && (
                            <Menu 
                            opened={true} onBackdropPress={() => setIsMenuVisible(false)}>
                                <MenuTrigger />
                                <MenuOptions
                                                             style={{padding:5,justifyContent:'center',alignItems:'center',display:'flex',borderRadius:8}}
                                                             >
                                         <MenuOption  onSelect={() => handleCopyText(item.title)}>
                                            <View style={{flexDirection:'row',alignItems:'center'}}>

                                            <Ionicons name="clipboard-outline" size={16} color={orangeColor}></Ionicons>
                                             <Text style={{marginLeft:5,fontSize:16,fontWeight:'500',color:blueColor}}>Kopyala</Text>
                                            </View>
                                        </MenuOption>
                                </MenuOptions>
                            </Menu>
                        )}
                    </TouchableOpacity>
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
        backgroundColor: "#E5E4E2"
    },
    aiText: {
        marginRight: 75,
        color: blueColor,
        fontWeight: '400'
    },
    userText: {
        marginRight: 75,
        color: orangeColor,
        fontWeight: '400'
    },
    container: {
        minHeight: 75,
        
        marginTop: 2,
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 25
    },
    imageai: {
        height: 25,
        width: 25,
        marginRight: 15,
        marginLeft: 20
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
    }
});
