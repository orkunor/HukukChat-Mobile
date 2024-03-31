import React, { useState } from "react";
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from "react-native";
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
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const EnterCode = () => {
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  const loginValidationSchema = Yup.object().shape({

               email: Yup.string().email('Geçerli bir email adresi girin').required('Email gereklidir'),

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
               <TouchableOpacity onPress={()=> {navigation.navigate('ResetPassword')}}>
                              <FontAwesome5 name='arrow-left' size={35} color='white'></FontAwesome5>
               </TouchableOpacity>
                <View style={styles.imageContainer}>
                  <Text style={{color:'white',fontSize:25}}>Şifremi Unuttum</Text>
                </View>
              </View>
              <View style={styles.textInputContainer}>
                <View style={styles.containerInput}>
                  <TextInput
                    placeholder="Örnek: 013-343" 
                    style={styles.username}
                    onChangeText={handleChange('email')} 
                    onBlur={handleBlur('email')} 
                    value={values.email} 
                  />
                  {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

              </View>

              <TouchableOpacity
                onPress={handleSubmit} 
                style={styles.button}
                disabled={!isValid}
              >

            {loading ? (
                <Flow color={orangeColor} size={30} />
              ) : (
                <Text style={styles.buttonText}>Devam Et</Text>
              )}  
              </TouchableOpacity>

         
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  )
}
export default EnterCode;


const styles = StyleSheet.create({
  container: { backgroundColor: orangeColor, flex: 1, marginHorizontal: 40 },
  username: { height: 50, width: 300, backgroundColor: 'white', paddingLeft: 15, borderRadius: 8,  },
  password: { height: 50, width: 300, backgroundColor: 'white', paddingLeft: 15, borderRadius: 8 },
  textContainerSignin: { marginTop: 50 },
  textInputContainer: { marginTop: 30 },
  button: { backgroundColor: 'white', height: 50, justifyContent: 'center', alignItems: 'center', width: 300, borderRadius: 100 ,marginTop:25},
  buttonText: { color: orangeColor, fontWeight: '600', fontSize: 18 },
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
  imageContainer:{
               marginTop:20
  }
  
});
