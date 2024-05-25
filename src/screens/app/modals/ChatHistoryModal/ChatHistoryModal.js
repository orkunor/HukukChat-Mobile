import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectCounter, selectIsChatHistoryModalVisible, selectIsChatScreenMenuModalVisible, selectIsWarningFuncVisible, toggleChatHistoryModalVisible, toggleChatScreenMenuVisible } from '../../../../slices/modalSlices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import MenuItem from './MenuItem';
import AccountSettingsModal from '../AccountSettingsModal/AccountSettingsModal';
import HelpModal from '../HelpModal/HelpModal';
import LicenceModal from '../LicenceModal/LicenceModal';
import SSSModal from '../SSSModal/SSSModal';
import KVKKModal from '../KVKKModal/KVKKModal';
import { orangeColor } from '../../../../statics/color';
import { BackHandler } from 'react-native';
import { selectSignIn } from '../../../../slices/authSlices';

const ChatHistoryModal = () => {
 const selectModalVisible = useSelector(selectIsChatHistoryModalVisible)
 const dispatch = useDispatch()
 const selectUserToken = useSelector(selectSignIn)
 const [menuData,setMenuData] = useState([])
const selectWarningFuncVisible = useSelector(selectIsWarningFuncVisible)
let counter = useSelector(selectCounter)

 const MenuFlatlistItem = ({item}) => {

  return(

    <MenuItem item={item}/>
  )
 }

const handleGetChatHistory = () => {

  fetch('https://api.hukukchat.com/get_chat_history/', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${selectUserToken}`,
  }
})
.then(response => response.json())
.then(data => {
  const filteredData = data.data.filter(item => item.user_messages.length > 0);
  setMenuData(filteredData);
})
.catch(error => {
  console.error('Hata:', error);
});

}



 useEffect(() => {

  handleGetChatHistory()


 },[counter])


 
  return (
    <Modal
  style={{flex:1,margin:0,bottom:0,backgroundColor:"white"}}
  isVisible={selectModalVisible}
  hasBackdrop={true}
  animationIn={'slideInLeft'}
  animationOut={'slideOutLeft'}
  animationInTiming={500}
  animationOutTiming={500}
  backdropColor='#D77A25'
  onRequestClose={() => {
    dispatch(toggleChatHistoryModalVisible(false))
 }}
>
  <SafeAreaView style={{flex:1,paddingHorizontal:15}}>
   
  <View style={styles.topConatiner}>
    <TouchableOpacity
              style={{marginRight:10}}
              onPress={() => dispatch(toggleChatHistoryModalVisible(false))}>
              <Ionicons name="close-outline" size={35} color={'black'} />
            </TouchableOpacity>
            </View>
            
            <FlatList
            style={{flex:1}}
            showsVerticalScrollIndicator={false}
            data={menuData}
            renderItem={MenuFlatlistItem}
            />
  </SafeAreaView>
  
      </Modal>
  )
}

export default ChatHistoryModal

const styles = StyleSheet.create({
  topConatiner:{
    height:50,
    marginTop:50,
    flexDirection:"row",
    justifyContent:'flex-end'
  }

})