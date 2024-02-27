import React from "react";
import { View,SafeAreaView, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ChatItem = ({item,index}) =>{

    const aiId = 1
    

    return(
        <TouchableOpacity style={(index % 2 === 0) ? styles.ai : styles.user}>
    <View style={styles.container}>
        {
            (index % 2 === 0)
            ?
            <Image style={styles.imageai}
            source={require(`../../../icons/1.png`)}/>
            :
            <Image style={styles.imageai}
            source={require(`../../../icons/0.png`)}/>
        }
    <Text style={{marginVertical:5,fontSize:16,marginRight:75}}>{item.title}</Text></View>        
        </TouchableOpacity>
    )                                                       
}

export default ChatItem

const styles = StyleSheet.create({


    ai:{
    
        backgroundColor:'#F7F7F8'

    },

    user:{
        backgroundColor:'white'



    },
    container:{
    minHeight:75,marginTop:2,justifyContent:'flex-start',paddingTop:10,paddingBottom:10,flexDirection:'row',borderBottomWidth:2,borderColor:'orange',alignItems:'center',paddingRight:15},
    imageai:{height:35,width:35,marginRight:25,marginLeft:25}
    


})