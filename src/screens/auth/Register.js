import React, { useState } from "react";
import { Image, View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { orangeColor } from "../../statics/color";
import { Formik } from 'formik'
import ServerErrorModal from "../app/modals/Warnings/ServerErrorModal";
import * as Yup from 'yup';
import { Flow } from 'react-native-animated-spinkit';
import { useDispatch } from "react-redux";
import { toggleKVKKModalVisible, toggleMailAlreadyInUse, toggleServerErrorModalVisible, toggleUserCreated, toggleUserNameAlreadyInUseVisible } from "../../slices/modalSlices";
import MailAlreadyInUse from "../app/modals/Warnings/MailAlreadyInUse";
import UserNameAlreadyInUse from "../app/modals/Warnings/UserNameAlreadyInUse";
import UserCreated from "../app/modals/Warnings/UserCreated";
import KVKKModal from "../app/modals/KVKKModal/KVKKModal";

const Register = () => {
  const navigation = useNavigation();
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const registerValidationSchema = Yup.object().shape({
    username: Yup.string().required('Kullanıcı adı gereklidir'),
    email: Yup.string().email('Geçerli bir email adresi girin').required('Email gereklidir'),
    password: Yup.string().min(6, 'Şifre en az 6 karakter olmalı').required('Şifre gereklidir'),
  });

  const handleRegister = (values) => {
    

    // values içinde form alanlarının değerlerine erişebilirsiniz
    setLoading(true);
    

    // API'ye post isteği göndermek için fetch kullanıyoruz
    fetch('https://api.hukukchat.com/create_user/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: values.username, // Kullanıcı adını kullanıcı kimliği olarak kullanıyoruz
        email: values.email,
        password: values.password,
        parent_user_id: null // Eğer bir üst kullanıcı yoksa null olarak gönderiyoruz
      })
    })
      .then(response => response.json())
      .then(data => {
        // API yanıtını işleme alabilirsiniz, örneğin kullanıcıyı yönlendirebilirsiniz
        if (data.msg === "Kullanıcı başarıyla oluşturuldu, aktivasyon için lütfen e-postanızı kontrol edin!") {
         console.log(data.msg)
         setLoading(false);
        dispatch(toggleUserCreated(true))
        } 
        else if(data.message === "An error occurred: Bu e-posta adresi zaten kullanılıyor"){
          setLoading(false);
         dispatch(toggleMailAlreadyInUse(true))
        }
        
        else if(data.message === "An error occurred: Bu kullanıcı adı zaten alınmış"){
          dispatch(toggleUserNameAlreadyInUseVisible(true))
          setLoading(false);
        }else{
          dispatch(toggleServerErrorModalVisible(true))
          setLoading(false);

        }
        
        // API'den dönen veriyi konsola yazdır
      })
      .catch(error => {
        console.error('Error:', error);
        dispatch(toggleServerErrorModalVisible(true))
        setLoading(false);


        // Hata durumunda kullanıcıya bir hata mesajı gösterebilirsiniz
      }); 


      /*else if(data.msg == "An error occurred: Bu e-posta adresi zaten kullanılıyor") {
        dispatch(toggleMailAlreadyInUse(true))
      }
      */
  }
  return (
    <SafeAreaView style={styles.container}>
    <ServerErrorModal />
    <MailAlreadyInUse/>
    <UserNameAlreadyInUse/>
    <KVKKModal/>
    <UserCreated/>
    <Formik
      initialValues={{ username: '', password: '', email: '' }}
      onSubmit={(values, { resetForm }) => {
        handleRegister(values);
        resetForm(); // Input değerlerini sıfırlar
      }}
      validationSchema={registerValidationSchema}
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
              placeholder="Kullanıcı adı"
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            </View>
          
          <View style={styles.containerInput}>

            <TextInput
              placeholder="Şifre"
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>
<View style={styles.containerInput}>

            <TextInput
              placeholder="E-mail"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
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
                <Text style={styles.buttonText}>Kaydol</Text>
              )}  
          </TouchableOpacity>

          <View style={styles.optionLoginContainer}>
            <Text style={styles.optionText}>Hesabın var mı?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.optionLink}>Giriş yap.</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privacyContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.privacyText}>Devam ederek </Text>
              <TouchableOpacity
              onPress={()=> {
                dispatch(toggleKVKKModalVisible(true))
              }}
              >

              <Text style={styles.privacyTextLaws}>Gizlilik Yasalarımızı </Text>
              </TouchableOpacity>

            </View>
            <Text style={styles.privacyText}>kabul etmiş olursun.</Text>
          </View>
        </>
      )}
    </Formik>
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
    marginBottom: 0,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 50
  },
  privacyText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  privacyTextLaws: {
    color: 'black',
    fontWeight: '400',
    fontSize: 16,
  }, errorText: {
    color: 'white',
    fontSize: 12,
    marginLeft:5
  },
  containerInput:{
    height:65,
    marginBottom:10
  }
});
