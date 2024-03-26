import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, selectIsHelpModalVisible, selectIsNoteSendedVisible, selectIsSSSModalVisible, selectIsWrongPassOrMailModalVisible, toggleAccountSettingsModalVisible, toggleHelpModalVisible, toggleNoteSendedVisible, toggleSSSModalVisible, toggleWrongPassOrMailModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'
import { ScrollView } from 'react-native-gesture-handler'

const NoteSended = () => {
               const selectModalVisible = useSelector(selectIsNoteSendedVisible)
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
                  <Text style={{color:'black',textAlign:'center',fontSize:22}}>Notunuz başarıyla gönderilmiştir.</Text>
                  <TouchableOpacity 
                  onPress={() => {
                    dispatch(toggleNoteSendedVisible(false))

                  }}
                  style={{backgroundColor:'green',justifyContent:'center',alignItems:'center',padding:15,borderRadius:8,marginTop:20}}><Text style={{color:'white',textAlign:'center',fontSize:18}}>Tamam</Text></TouchableOpacity>
                </View>
       
               </SafeAreaView>
               
             </Modal>
  )
}

export default NoteSended

const styles = StyleSheet.create({
               
                
             });