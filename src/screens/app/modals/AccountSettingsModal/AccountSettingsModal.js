import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, toggleAccountSettingsModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler'
import { selectSignIn } from '../../../../slices/authSlices';
import { BackHandler } from 'react-native';


const AccountSettingsModal = () => {
               const selectModalVisible = useSelector(selectIsAccountSettingsModalVisible)
               const dispatch = useDispatch()

               const [subscriptionPlans, setSubscriptionPlans] = useState(null);
               const selectUserToken = useSelector(selectSignIn)
              const [userData,setUserData]  = useState()

              function formatDate(dateString) {
                const dateObject = new Date(dateString);
                const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;
                return formattedDate;
            }
                       
            useEffect(() => {
              const backAction = () => {
                dispatch(toggleAccountSettingsModalVisible(false))
                return true
                ;
              };
          
              const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
              );
      
              return () => backHandler.remove();
            }, []);

               const fetchSubscriptionPlans = () => {
                fetch('https://api.hukukchat.com/get_user_details/', {
                  method: 'GET',
                  headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${selectUserToken}`,

                    // Buraya gerekirse diğer header bilgilerini ekleyebilirsiniz
                  }
                })
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  }
                  throw new Error('Network response was not ok.');
                })
                .then(data => {
                  // Burada data ile yapılmak istenen işlemleri gerçekleştirin
                  setUserData(data);

                })
                .catch(error => {
                  console.error('There was a problem with your fetch operation:', error);
                });
               }

               useEffect(() => {
                fetchSubscriptionPlans();
              }, []);

  return (
               <Modal
               style={{flex:1,backgroundColor:'white',margin:0}}
               statusBarTranslucent={true}
               isVisible={selectModalVisible}
               hasBackdrop={true}
               animationIn={'slideInRight'}
               animationOut={'slideOutRight'}
               animationInTiming={500}
               animationOutTiming={500}
               onRequestClose={() => {
                dispatch(toggleAccountSettingsModalVisible(false))
             }}
               backdropOpacity={1}
               backdropColor='white'
             >
               <SafeAreaView style={{flex:1,margin:0,backgroundColor:'white',alignItems:'center'}}>
                <ScrollView>


               <View style={styles.containerTop}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                              dispatch(toggleAccountSettingsModalVisible(false))
                }}>
                <Ionicons
                  name="arrow-back-outline"
                  color={orangeColor}
                  size={35}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.headerName}>Hesap Bilgileri</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerBottom}>
        <LinearGradient colors={[blueColor,blueColor,blueColor]} style={{width:'100%',alignItems:'center',marginTop:10,borderRadius:12,padding:15,}}>
              <View style={{width:'90%',height:175,justifyContent:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                <Text style={{color:'white'}}>Güncel Abonelik : </Text>
                <Text style={{color:"#00FF00",fontWeight:'600',fontSize:18}}>{userData ? userData.subscription.plan : null} </Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text style={{color:'white'}}>Abonelik Başlangıç : </Text>
                <Text style={{color:'white',fontWeight:'600'}}>{userData ? formatDate(userData.subscription.start_date) : null}</Text>
                </View>
               
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text style={{color:'white'}}>Kalan Kontür : </Text>
                <Text style={{color:"white",fontWeight:'600',fontSize:16}}>{userData ? userData.subscription.mobile_credits : null}</Text>
                </View>
              </View>
              </LinearGradient>


          <View style={{marginTop:15}}>
          <Text style={{fontWeight:'600',fontSize:20}}>Profil Bilgileri</Text>
          <LinearGradient colors={[orangeColor, orangeColor, orangeColor]} style={{width:'100%',marginTop:10,borderRadius:12,padding:15,height:175,justifyContent:'center'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:16}}>Kullanıcı Adı : </Text>
                <Text style={{color:blueColor,fontWeight:'600',fontSize:15}}>{userData ? userData.user_name: null}</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text style={{color:'white',fontSize:16}}>Email : </Text>
                <Text style={{color:blueColor,fontWeight:'600',fontSize:15}}>{userData ? userData.email:null}</Text>
                </View>
                
</LinearGradient>

         
          </View>



</View>
          
</ScrollView>

               </SafeAreaView>

             </Modal>
  )
}

export default AccountSettingsModal

const styles = StyleSheet.create({
               closeButton: {
                 marginLeft: 10,
                 borderRadius: 5,
                 height: 50,
                 width: 50,
                 justifyContent: 'center',
                 alignItems: 'center',
               },
               containerTop: {height: 50, alignItems: 'center', width: '100%',marginTop:50},
               header: {
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 flexDirection: 'row',
                 height: 50,
                 width: '100%',
                 borderBottomWidth: 0.3,
                 borderColor: 'white',
               },
               headerName: {fontWeight: '600', fontSize: 22, marginLeft: 5,color:orangeColor},
        
           containerBottom:{
            flex:1,
            width:350

           },
             });