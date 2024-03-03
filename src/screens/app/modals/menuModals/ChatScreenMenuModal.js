import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsChatScreenMenuModalVisible, toggleChatScreenMenuVisible } from '../../../../slices/modalSlices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import MenuItem from './MenuItem';
import AccountSettingsModal from '../AccountSettingsModal/AccountSettingsModal';
import HelpModal from '../HelpModal/HelpModal';
import LicenceModal from '../LicenceModal/LicenceModal';
import SSSModal from '../SSSModal/SSSModal';
import KVKKModal from '../KVKKModal/KVKKModal';

const ChatScreenMenuModal = () => {
 const selectModalVisible = useSelector(selectIsChatScreenMenuModalVisible)
 const dispatch = useDispatch()
 const [menuData,setMenuData] = useState([
  {
    "id": "1",
    "desc":"Hesap Bilgileri",
    "icon":"cog"
  },
  {
    "id": "2",
    "desc":"Yardım",
    "icon":"hands-helping"
  },
  {
    "id": "4",
    "desc":"Sıkça Sorulan Sorular",
    "icon":"question"
  },
  {
    "id": "3",
    "desc":"Çerez Politikası",
    "icon":"certificate"
  },
  {
    "id": "5",
    "desc":"KVKK",
    "icon":"database"
  },
  {
    "id": "6",
    "desc":"Çıkış Yap",
    "icon":"sign-out-alt"
  },
])

 const MenuFlatlistItem = ({item}) => {

  return(

    <MenuItem item={item}/>
  )

  



 }
  return (
    <Modal
  style={{flex:1}}
  statusBarTranslucent={true}
  isVisible={selectModalVisible}
  hasBackdrop={true}
  animationIn={'slideInRight'}
  animationOut={'slideOutRight'}
  animationInTiming={500}
  animationOutTiming={500}
  backdropOpacity={1}
  backdropColor='#D77A25'
>
  <SafeAreaView style={{flex:1}}>
    <AccountSettingsModal/>
    <HelpModal/>
    <LicenceModal/>
    <SSSModal/>
    <KVKKModal/>
  <View style={styles.topConatiner}>
    <TouchableOpacity
              style={{marginLeft: 15,}}
              onPress={() => dispatch(toggleChatScreenMenuVisible(false))}>
              <Ionicons name="arrow-back-outline" size={35} color={'white'} />
            </TouchableOpacity>
            </View>
            
            <FlatList
            style={{flex:1}}
            data={menuData}
            renderItem={MenuFlatlistItem}
            />
  </SafeAreaView>
  
      </Modal>
  )
}

export default ChatScreenMenuModal

const styles = StyleSheet.create({
  topConatiner:{
    height:50
  }

})