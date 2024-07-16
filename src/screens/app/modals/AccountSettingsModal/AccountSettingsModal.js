import { StyleSheet, View,TouchableOpacity, StatusBar } from 'react-native'
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
import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import { Avatar } from 'react-native-elements';
import { Text } from '@rneui/themed';



const AccountSettingsModal = () => {
               const selectModalVisible = useSelector(selectIsAccountSettingsModalVisible)
               const dispatch = useDispatch()
              const [accVisible,setAccVisible] = useState(false)
               const [subscriptionPlans, setSubscriptionPlans] = useState(null);
               const selectUserToken = useSelector(selectSignIn)
              const [userData,setUserData]  = useState()
              const [restVisible,setRestVisible] = useState(false)
              function formatDate(dateString) {
                const dateObject = new Date(dateString);
                const months = [
                  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
                  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
                ];
                const formattedDate = `${dateObject.getDate()} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
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

 /* return (
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
*/

return(
  <Modal
  style={{flex:1,backgroundColor:'white',margin:0}}
  statusBarTranslucent={false}
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
  <View style={{flex:1,margin:0,backgroundColor:orangeColor,}}>

<SafeAreaView style={{flex:1,margin:0,backgroundColor:'white',alignItems:'center'}}>
  <StatusBar backgroundColor={orangeColor}  />
  <ScrollView>
    <View style={styles.topContainer}>
      <View style={styles.headerTop}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={() => {

          dispatch(toggleAccountSettingsModalVisible(false))
        }}>

        <Ionicons name="chevron-back-outline" color="white" size={35} style={{marginLeft: 10}} />
        <Text style={{color:'white',fontWeight:'500',fontSize:22,marginLeft:10}}>Hesap Bilgileri</Text>
        </TouchableOpacity>

      </View>

<View style={{flex:1,justifyContent:'center',alignItems:'center',marginBottom:50,paddingTop:20}}> 
<Avatar
  size='xlarge'
  avatarStyle={{borderRadius: 40,borderWidth:4,borderColor:'black'}}
  title='SJ'
  source={require('../../../../icons/5.png')}
  
/>
<Text 
 style={ { fontFamily:'Verdana-Bold' ,color:'white',fontSize:18,marginTop:20}}>{userData ? userData.email:null}</Text>

</View>
     

    </View>

    <View style={styles.bottomContainer}>
           <View style={styles.boxRestOne}>
                <Ionicons name="server-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />
                <Text style={{color:blueColor,fontWeight:'500',fontSize:17,marginLeft:10}}>Kalan Krediniz:  {userData ? userData.subscription.mobile_credits: null}</Text>
            </View>
            <View style={styles.box}>
              <View style={{flexDirection:'row',alignItems:'center'}}>

              <Ionicons name="bag-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />
              <Text style={{color:blueColor,fontWeight:'500',fontSize:17,marginLeft:10}}>Paket Bilgileri </Text>
              </View>

              <TouchableOpacity
              onPress={() => setRestVisible(!restVisible)}
                
              >
                {
                  restVisible ?
                  (
                    <Ionicons name="chevron-up-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />

                  )
                  :
                  <Ionicons name="chevron-down-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />

                }


              </TouchableOpacity>
            </View>
            
            {
              restVisible ?
              (
                
                <View style={{marginLeft:15}}>
                <View style={styles.boxRest}>
                <Ionicons name="diamond-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />
                <Text style={{color:blueColor,fontWeight:'500',fontSize:17,marginLeft:10}}>Paket Türü: {userData ? (userData.subscription.plan) : null}</Text>
              </View>
                <View style={styles.boxRest}>
                <Ionicons name="calendar-clear-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />
                <Text style={{color:blueColor,fontWeight:'500',fontSize:17,marginLeft:10}}>Başlangıç Tarihi: {userData ? formatDate(userData.subscription.start_date) : null}</Text>
              </View>
              <View style={styles.boxRest}>
                <Ionicons name="calendar-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />
                <Text style={{color:blueColor,fontWeight:'500',fontSize:17,marginLeft:10}}>Bitiş Tarihi: {userData ? formatDate(userData.subscription.end_date) : null}</Text>
              </View>
              </View>

              )
              :
              null


            }
          
          <View style={styles.box}>
              <View style={{flexDirection:'row',alignItems:'center'}}>

              <Ionicons name="finger-print-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />
              <Text style={{color:blueColor,fontWeight:'500',fontSize:17,marginLeft:10}}>Üyelik Bilgileri </Text>
              </View>

              <TouchableOpacity
              onPress={() => setAccVisible(!accVisible)}
                
              >
                {
                  accVisible ?
                  (
                    <Ionicons name="chevron-up-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />

                  )
                  :
                  <Ionicons name="chevron-down-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />

                }


              </TouchableOpacity>
            </View>
            {
              accVisible ?
              (
                
                <View style={{marginLeft:15}}>
                <View style={styles.boxRest}>
                <Ionicons name="mail-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />
                <Text style={{color:blueColor,fontWeight:'500',fontSize:17,marginLeft:10}}>Mail: {userData ? userData.email:null}</Text>
              </View>
                <View style={styles.boxRest}>
                <Ionicons name="person-outline"  color={blueColor} size={22} style={{marginLeft: 10}} />
                <Text style={{color:blueColor,fontWeight:'500',fontSize:17,marginLeft:10}}>Kullanıcı Adı: {userData ? userData.user_name:null}</Text>
              </View>
            
              </View>

              )
              :
              null


            }

    </View>

    
    <View>
        
    </View>
  </ScrollView>
</SafeAreaView>
</View>



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

           topContainer:{
            width:width,
            minHeight:height/2,
            backgroundColor:orangeColor,
            display:'flex',
            flex:1,
            borderBottomLeftRadius:40,
            borderBottomRightRadius:40,
           },
           headerTop:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'flex-start',
            marginTop:40,
            marginLeft:10
           },
           bottomContainer:{
            minHeight:height/2,
            display:'flex',
            backgroundColor:'white',
            flex:1,
            marginTop:20,
            paddingHorizontal:20
           },
           box:{

            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#FFEAD2',
            padding:15,
            borderRadius:20,
            justifyContent:'space-between',
            marginTop:10

            
           },
           boxRest:{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#FFEAD2',
            padding:15,
            borderRadius:20,
            marginTop:10

           },
           boxRestOne:{
            flexDirection:'row',
            alignItems:'center',
            backgroundColor:'#FFEAD2',
            padding:15,
            borderRadius:20,

           }
             });