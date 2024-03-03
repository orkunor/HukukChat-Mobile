import React, { useState } from "react";
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { orangeColor } from "../../statics/color";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [surname, setSurname] = useState("");
  const navigation = useNavigation()

  const login = () => {
    /* fetch("http://localhost:3000/users", {
       method: "POST",
       headers: {
         "Content-Type": "application/json"
       },
       body: JSON.stringify({
         email,  
         password,
         surname
       })
     })
       .then(response => {
         // Sunucudan gelen yanıtı kontrol edin
         if (!response.ok) {
           throw new Error("Sunucu hatası: " + response.status);
         }
         return response.json();
       })
       .then(data => {
         console.log(data);
       })
       .catch(error => {
         console.error("Bir hata oluştu:", error);
       });
       */
    navigation.navigate('Chat')
  };

  return (
    <SafeAreaView style={{ backgroundColor: orangeColor, height: '100%' }}>
      <StatusBar
        hidden={true}
      />
      <View style={styles.container} >
        <View style={styles.textContainerSignin}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.logo}
              source={require('../../icons/1.png')}
            />
          </View>
        </View>

        <View style={styles.textInputContainer}>
          <TextInput placeholder="Kullanıcı adı" style={styles.username}></TextInput>
          <TextInput placeholder="Şifre" style={styles.password}></TextInput>
        </View>

        <View>
          <TouchableOpacity onPress={login} style={styles.button}><Text style={styles.buttonText}>Devam et</Text></TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15 }}>
            <Text style={{ color: 'black' }}>Hesabın yok mu? </Text>
            <TouchableOpacity onPress={() => { navigation.navigate('Register') }}><Text style={{ fontWeight: '600', color: 'black' }}>Hemen oluştur.</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default Login;

const styles = StyleSheet.create({
  container: { backgroundColor: '#454545', flex: 1 },
  username: { height: 50, width: 300, backgroundColor: 'white', paddingLeft: 15, borderRadius: 8 },
  password: { height: 50, width: 300, backgroundColor: 'white', paddingLeft: 15, borderRadius: 8, marginTop: 20 },
  textContainerSignin: { marginTop: 50 },
  textInputContainer: { marginTop: 30 },
  button: { backgroundColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', width: 300, marginTop: 25, borderRadius: 100 },
  buttonText: { color: orangeColor, fontWeight: '600', fontSize: 18 },
  elementLogin: { borderWidth: 2, borderRadius: 50, height: 50, width: 300, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginBottom: 25, backgroundColor: 'white', borderColor: 'white' },
  container: { marginHorizontal: 40 },
  imageContainer: { alignItems: 'center', justifyContent: 'center' }, // Güncellendi
  logo: { height: 225, width: 325 },
});
