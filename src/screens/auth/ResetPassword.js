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
import { toggleServerErrorModalVisible, toggleWarningFuncVisible, toggleWrongPassOrMailModalVisible } from "../../slices/modalSlices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSignIn } from "../../slices/authSlices";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import WarningFunc from "../app/modals/Warnings/WarningFunc";


const ResetPassword = () => {
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const [message,setMessage] = useState("")
  const [buttonText,setButtonText] = useState("")
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
  

  const handleLogin = (values) => {
   setLoading(true);


      let formData = new FormData();
    formData.append("email",values.email);
    fetch('https://api.hukukchat.com/password_reset_request/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email:values.email
  })
})
.then(response => response.json())
.then(data => {
  if(data.message =="An error occurred: Kullanıcı bulunamadı"){
    setMessage("Böyle bir kullanıcı bulunamadı!")
    setLoading(false)
    setButtonText("Tekrar Dene")
    dispatch(toggleWarningFuncVisible(true))
  }
  else if(data.msg == "Şifre sıfırlama bağlantısı gönderildi!"){
    setMessage("Şifre sıfırlama bağlantısı mail adresinize gönderilmiştir!")
    setLoading(false)
    setButtonText("Tamamla")
    dispatch(toggleWarningFuncVisible(true))

  }
  else{
    dispatch(toggleServerErrorModalVisible(true))
    setLoading(false)
  }
  setLoading(false)
})
.catch(error => {
  console.error('Hata:', error);
  dispatch(toggleServerErrorModalVisible(true))
  setLoading(false)

});
      
    
    
  }
  

  return (
    <SafeAreaView style={{ backgroundColor: orangeColor, flex: 1 }}>
      <ServerErrorModal />
      <WarningFunc message={message} button={buttonText}/>
     
      <View style={styles.container}>
        <Formik
          initialValues={{email:''}} // Değişiklik burada: email yerine username
          validationSchema={loginValidationSchema}
          onSubmit={values => handleLogin(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
            <>
              <View style={styles.textContainerSignin}>
               <TouchableOpacity
               style={{flexDirection:'row',alignItems:'center'}}
                onPress={()=> {navigation.navigate('Login')}}>
                              <FontAwesome5 name='arrow-left' size={35} color='white'></FontAwesome5>
                              <Text style={{color:'white',fontSize:25,marginLeft:10,fontWeight:'600'}}>Giriş Yap</Text>
               </TouchableOpacity>
                <View style={styles.imageContainer}>
                  <Text style={{color:'white',fontSize:25}}>Şifremi Unuttum</Text>
                </View>
              </View>

              <View style={styles.textInputContainer}>
                <View style={styles.containerInput}>
                  <TextInput
                    placeholder="E-mail" 
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
export default ResetPassword;


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
               marginTop:35
  }
  
});
