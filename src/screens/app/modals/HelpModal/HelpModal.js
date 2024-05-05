import { StyleSheet, Text, View,TouchableOpacity ,TextInput,KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, selectIsHelpModalVisible, toggleAccountSettingsModalVisible, toggleHelpModalVisible, toggleNoteSendedVisible, toggleServerErrorModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'
import { selectSignIn } from '../../../../slices/authSlices'
import NoteSended from '../Warnings/NoteSended'
import { Flow } from 'react-native-animated-spinkit';
import ServerErrorModal from '../Warnings/ServerErrorModal'
import { BackHandler } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler'

const HelpModal = () => {

  const selectUserToken = useSelector(selectSignIn)
  const [userData,setUserData] = useState()
  const selectModalVisible = useSelector(selectIsHelpModalVisible)
  const dispatch = useDispatch()
  const [note,setNote] = useState('')
  const [loading,setLoading] = useState(false)

  const handleNoteChange = newNote => {
    setNote(newNote)
  
}
useEffect(() => {
  const backAction = () => {
    dispatch(toggleHelpModalVisible(false))
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



  const handleFormSubmit = () => {
    
    try { 
      setLoading(true)
       fetch('https://api.hukukchat.com/handle-contact-form', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name:userData.user_name,
        phone:"",
        email:userData.email,
        message:note

      })
    })
    .then( response => response.json())
    .then(data =>{
      setLoading(false)
      if(data.message == "Email sent successfully"){
        dispatch(toggleNoteSendedVisible(true))
      }
      setNote('')
    })
    } catch (error) { 


     dispatch(toggleServerErrorModalVisible(true))
    }
  };
  return (
               <Modal
               style={{flex:1,margin:0,backgroundColor:'white'}}
               isVisible={selectModalVisible}
               hasBackdrop={true}
               animationIn={'slideInRight'}
               animationOut={'slideOutRight'}
               animationInTiming={500}
               animationOutTiming={500}
               backdropOpacity={1}
               onRequestClose={() => {
                dispatch(toggleHelpModalVisible(false))
             }}
               backdropColor='white'
             >
              <NoteSended/>
              <ServerErrorModal/>
               <SafeAreaView style={{flex:1,margin:0,backgroundColor:'white'}}>
               <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : null} enabled>

                <ScrollView>

               <View style={styles.containerTop}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                              dispatch(toggleHelpModalVisible(false))
                }}>
                <Ionicons
                  name="arrow-back-outline"
                  color={blueColor}
                  size={35}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.headerName}>Yardım</Text>
            </View>
          </View>
        </View>
        <View style={{flex:1,alignItems:'center'}}>
               <Text
               style={{
               fontSize: 25,
               color: blueColor,
               fontWeight: '600',
               marginBottom: 50,
               marginTop: 25,
               }}>
               Destek Talebinizi Paylaşın
               </Text>
               <View style={{width:350,height:350,borderWidth:.3,borderColor:blueColor,borderRadius:20,padding:25}}>
               <TextInput
               value={note}
               placeholderTextColor={'grey'}
               onChangeText={handleNoteChange}
                style={{
                              color: 'black',
                              fontSize: 20,
                              fontWeight: '700',
                            flex:1,
                            }}
               placeholder='Bir şeyler yazın...'
               textAlign='left'
               textAlignVertical='top'
               multiline={true}
               >
               
               </TextInput>            
               </View>
             
               <TouchableOpacity
  onPress={handleFormSubmit}
  style={[
    styles.submitButton,
    { backgroundColor: note.length < 10 ? '#cccccc' : blueColor },
  ]}
  disabled={note.length < 10}
>
{loading ? (
                <Flow color={orangeColor} size={30} />
              ) : (
                <Text style={{color:'white',fontSize:24}}>Gönder</Text>
              )}  
  
</TouchableOpacity>
               </View>
               </ScrollView>
                </KeyboardAvoidingView>
               </SafeAreaView>
             </Modal>
  )
}

export default HelpModal

const styles = StyleSheet.create({
  containerBottom:{
    flex:1
  },
               closeButton: {
                 marginLeft: 10,
                 borderRadius: 5,
                 height: 50,
                 width: 50,
                 justifyContent: 'center',
                 alignItems: 'center',
               },
               containerTop: {height: 50, alignItems: 'center', width: '100%',marginTop:50,paddingLeft:10},
               header: {
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 flexDirection: 'row',
                 height: 50,
                 width: '100%',
                 borderBottomWidth: 0.3,
                 borderColor: 'white',
               },
               headerName: {fontWeight: '600', fontSize: 22, marginLeft: 5,color:blueColor},
               menuContainer: {marginRight: 15, flexDirection: 'row'},
               modalContainer: {
                 flex: 1,
                 justifyContent: 'flex-start',
                 alignItems: 'flex-start',
                 backgroundColor: 'rgba(0, 0, 0, 0.5)',
                 flexDirection: 'column',
               },
               modalContent: {
                 backgroundColor: '#fff',
                 width: '100%',
                 borderTopRightRadius: 20,
                 borderTopLeftRadius: 20,
                 padding: 20,
                 justifyContent: 'flex-start',
                 flexDirection: 'column',
                 alignItems: 'flex-start',
                 flex: 1,
               },
             
               profileSec: {
                 width: '100%',
                 marginTop: 15,
                 flexDirection: 'column',
                 borderColor: 'grey',
               },
               profileDetails: {
                 justifyContent: 'space-around',
                 flexDirection: 'row',
                 alignItems: 'center',
                 marginRight: 5,
               },
               userDetail: {
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
               },
               userDetailCount: {fontSize: 20, fontWeight: '600'},
               location: {
                 fontSize: 22,
               },
               messageButton: {
                 marginRight: 5,
                 borderRadius: 5,
                 height: 50,
                 width: 50,
                 justifyContent: 'center',
                 alignItems: 'center',
               },
               submitButton:{

                marginTop:25,backgroundColor:blueColor,width:300,justifyContent:'center',alignItems:'center',height:75,borderRadius:12
               }
             });