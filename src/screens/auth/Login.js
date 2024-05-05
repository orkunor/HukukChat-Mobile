import React, { useState } from "react";
import { Image, View, Text,KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { orangeColor } from "../../statics/color";
import { Formik } from 'formik';
import * as Yup from 'yup';
import WrongPassOrMailModal from "../app/modals/Warnings/WrongPassOrMailModal";
import ServerErrorModal from "../app/modals/Warnings/ServerErrorModal";
import { Flow } from 'react-native-animated-spinkit';
import { useDispatch } from "react-redux";
import { toggleServerErrorModalVisible, toggleWrongPassOrMailModalVisible } from "../../slices/modalSlices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSignIn } from "../../slices/authSlices";

const Login = () => {
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('Kullanıcı adı gereklidir'),
    password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre gereklidir'),
  });

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('jwt', value);
      dispatch(setSignIn(value))
    } catch (e) {
      console.log(value)
    }
  }
  


  const handleLogin = async (values) => {
   setLoading(true);
    try {
      let formData = new FormData();
    formData.append('username', values.username);
    formData.append('password', values.password);
    await fetch('https://api.hukukchat.com/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      }) .then(response => response.json())
      .then(data =>{
          if(data.message =="An error occurred: Incorrect username or password"){
              dispatch(toggleWrongPassOrMailModalVisible(true))
          }
          else if (data.token_type == "bearer"){
            storeData(data.access_token)
          }
          else{
            dispatch(toggleServerErrorModalVisible(true))
          }
        
      })

      

    
      // Handle successful response data
  
    } catch (error) {
      console.error('Fetch Error:', error);
      dispatch(toggleServerErrorModalVisible(true))
      // Handle fetch error
    } finally {
      setLoading(false);
    }
    
  }
  

  return (
    <SafeAreaView style={{ backgroundColor: orangeColor, flex: 1 }}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null} enabled>

      <WrongPassOrMailModal />
      <ServerErrorModal />
     
      <View style={styles.container}>
        <Formik
          initialValues={{ username: '', password: '' }} // Değişiklik burada: email yerine username
          validationSchema={loginValidationSchema}
          onSubmit={values => handleLogin(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <>
              <View style={styles.textContainerSignin}>
                  <Image
                    style={styles.logo}
                    source={require('../../icons/1.png')}
                  />
              </View>

              <View style={styles.textInputContainer}>
                <View style={styles.containerInput}>
                  <TextInput
                  placeholderTextColor={'grey'}
                    placeholder="Kullanıcı Adı" // Değişiklik burada: email yerine username
                    style={styles.username}
                    onChangeText={handleChange('username')} // Değişiklik burada: email yerine username
                    onBlur={handleBlur('username')} // Değişiklik burada: email yerine username
                    value={values.username} // Değişiklik burada: email yerine username
                  />
                  {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                </View>

                <View style={styles.containerInput}>
                  <TextInput
                    placeholderTextColor={'grey'}
                    placeholder="Şifre"
                    style={styles.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                  />
                  
                  {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                  <TouchableOpacity onPress={()=> {
                      navigation.navigate('ResetPassword')
  
                  }} style={{marginLeft:5,marginTop:2}}>
                  <Text style={{color:'black'}}>Şifremi Unuttum</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit} // Değişiklik burada: handleSubmit çağrısı
                style={styles.button}
                disabled={!isValid}
              >

            {loading ? (
                <Flow color={orangeColor} size={30} />
              ) : (
                <Text style={styles.buttonText}>Devam Et</Text>
              )}  
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15 }}>
                <Text style={{ color: 'black' }}>Hesabın yok mu? </Text>
                <TouchableOpacity onPress={() => { navigation.navigate('Register') }}>
                  <Text style={{ fontWeight: '600', color: 'black' }}>Hemen oluştur.</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
export default Login;


const styles = StyleSheet.create({
  container: { backgroundColor: orangeColor, flex: 1,justifyContent:'center',alignItems:'center' },
  username: { height: 50, width: 300, backgroundColor: 'white', paddingLeft: 15, borderRadius: 8,color:'black'  },
  password: { height: 50, width: 300, backgroundColor: 'white', paddingLeft: 15, borderRadius: 8,color:'black' },
  textInputContainer: { marginTop: 30 },
  button: { backgroundColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', width: 300, borderRadius: 100 ,marginTop:45},
  buttonText: { color: orangeColor, fontWeight: '800', fontSize: 18 },
  imageContainer: { alignItems: 'center', justifyContent: 'center' },
  logo: { height: 225, width: 325 },
  errorText: {
    color: 'white',
    fontSize: 12,
    marginLeft:5
  },
  containerInput:{
    height:65,
    marginBottom:10
  },
  textContainerSignin:{
    marginBottom:30
  }
  
});
