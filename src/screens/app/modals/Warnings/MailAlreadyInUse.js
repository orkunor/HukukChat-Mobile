import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, selectIsHelpModalVisible, selectIsSSSModalVisible, selectIsWrongPassOrMailModalVisible, toggleAccountSettingsModalVisible, toggleHelpModalVisible, toggleSSSModalVisible, toggleWrongPassOrMailModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'
import { ScrollView } from 'react-native-gesture-handler'

const MailAlreadyInUse = () => {
               const selectModalVisible = useSelector(selectIsWrongPassOrMailModalVisible)
               const dispatch = useDispatch()
  return (
               <Modal
               style={{flex:1}}
               statusBarTranslucent={true}
               isVisible={selectModalVisible}
               hasBackdrop={true}
               animationIn={'slideInDown'}
               animationOut={'slideOutUp'}
               animationInTiming={500}
               animationOutTiming={500}
               backdropOpacity={.7}
               backdropColor='#D77A25'
             >
               <SafeAreaView style={{flex:1,margin:0,justifyContent:'center',alignItems:'center'}}>
          
                <View style={{justifyContent:'center',alignItems:'center',width:'95%',height:225,backgroundColor:'white',borderRadius:12}}>
                  <Text style={{color:'black',textAlign:'center',fontSize:22}}>Parole veya kullanıcı adınız hatalıdır!</Text>
                  <TouchableOpacity 
                  onPress={() => {
                    dispatch(toggleWrongPassOrMailModalVisible(false))

                  }}
                  style={{backgroundColor:blueColor,justifyContent:'center',alignItems:'center',padding:15,borderRadius:8,marginTop:20}}><Text style={{color:'white',textAlign:'center',fontSize:18}}>Tekrar Dene</Text></TouchableOpacity>
                </View>
       
               </SafeAreaView>
               
             </Modal>
  )
}

export default MailAlreadyInUse

const styles = StyleSheet.create({
               
                
             });