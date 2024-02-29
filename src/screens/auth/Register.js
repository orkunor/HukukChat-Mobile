import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, VirtualizedList ,SafeAreaView,TouchableOpacity} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { orangeColor } from "../../statics/color";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
const navigation = useNavigation()

const handleRegister = () => {

navigation.navigate('Chat')


}
  return (
    


      <SafeAreaView style={{backgroundColor:orangeColor,height:'100%',flex:1}}>
        <View style={styles.container} >
        <View style={styles.textContainerSignin}>
          <Text style={styles.textHukuk}>Hukuk</Text>
          <Text style={styles.textChat}>Chat</Text>

        </View>
    
  
        <View style={styles.textInputContainer}>
        <TextInput placeholder="Kullanıcı adı" style={styles.username}></TextInput>
        <TextInput placeholder="Şifre" style={styles.password}></TextInput>
        <TextInput placeholder="E-mail" style={styles.password}></TextInput>
        </View>   
        
        <View>
        <TouchableOpacity 
        onPress={() => {
          handleRegister()
        }}
        style={styles.button}><Text style={styles.buttonText}>Kaydol</Text></TouchableOpacity>
        <View style={{flexDirection:'row',marginTop:10,marginLeft:15}}>
            <Text style={{color:'black'}}>Hesabın var mı? </Text>
             <TouchableOpacity
             onPress={() => {
              navigation.navigate('Login')
              
             }}>
              <Text style={{fontWeight:'600',color:'black'}}>Giriş yap.</Text></TouchableOpacity>
             </View>
        </View>
        <View style={{justifyContent:'flex-end',alignItems:'center',marginTop:20,}}>
          <Text style={{color:'white',marginTop:15,}}>Devam ederek <Text style={{color:'black',fontWeight:'400',fontSize:16}}>Gizlilik</Text> </Text>
          <Text style={{color:'white'}}><Text style={{color:'black',fontWeight:'400',fontSize:16}}>Yasalarımızı </Text>kabul etmiş olursun.</Text>
          </View>


       
    
       
        </View>
       </SafeAreaView>
    )
    }
    export default Register;
    
    const styles = StyleSheet.create({
    container:{backgroundColor:'#454545'},
    username:{height:50,width:300,backgroundColor:'white',paddingLeft:15,borderRadius:8},
    password:{height:50,width:300,backgroundColor:'white',paddingLeft:15,borderRadius:8,marginTop:20},
    textChat:{fontWeight:'700',fontSize:65,color:'white',marginLeft:100},
    textHukuk:{fontWeight:'700',fontSize:65,color:'black'},
    textContainerSignin:{marginTop:50},
    textInputContainer:{marginTop:30,},
    button:{backgroundColor:'white',height:50,justifyContent:'center',alignItems:'center',width:300,marginTop:25,borderRadius:100},
    buttonText:{color:orangeColor,fontWeight:'600',fontSize:18},
    optionLoginContainer:{marginTop:80,},
    elementLogin:{borderWidth:2,borderRadius:50,height:50,width:300,justifyContent:'flex-start',alignItems:'center',flexDirection:'row',marginBottom:25,backgroundColor:'white',borderColor:'white'},
    container:{marginHorizontal:40},
    })