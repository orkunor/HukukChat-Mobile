import React, { useState } from "react";
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { orangeColor } from "../../statics/color";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate('Chat');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainerSignin}>
        <Image
          style={styles.logo}
          source={require('../../icons/1.png')}
        />
      </View>

      <View style={styles.textInputContainer}>
        <TextInput
          placeholder="Kullanıcı adı"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="Şifre"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        style={styles.button}>
        <Text style={styles.buttonText}>Kaydol</Text>
      </TouchableOpacity>

      <View style={styles.optionLoginContainer}>
        <Text style={styles.optionText}>Hesabın var mı?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.optionLink}>Giriş yap.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.privacyContainer}>
        <View style={{flexDirection:'row'}}>
        <Text style={styles.privacyText}>Devam ederek </Text>
        <Text style={styles.privacyTextLaws}>Gizlilik Yasalarımızı </Text>
        </View>
        <Text style={styles.privacyText}>kabul etmiş olursun.</Text>
      </View>
    </SafeAreaView>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: orangeColor,
  },
  textContainerSignin: {
    marginBottom: 30,
  },
  logo: {
    height: 225,
    width: 325,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 300,
    backgroundColor: 'white',
    paddingLeft: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    height: 50,
    width: 300,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: {
    color: orangeColor,
    fontWeight: '600',
    fontSize: 18,
  },
  optionLoginContainer: {
    flexDirection: 'row',
    marginBottom: 20,

  },
  optionText: {
    color: 'white',
    marginRight: 5,
  },
  optionLink: {
    fontWeight: '600',
    color: 'white',
  },
  privacyContainer: {
    justifyContent:'center',
    alignItems:'center',
    width:300,
    height:50
  },
  privacyText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  privacyTextLaws:{
    color:'black',
    fontWeight: '400',
    fontSize: 16,
  }
  
});
