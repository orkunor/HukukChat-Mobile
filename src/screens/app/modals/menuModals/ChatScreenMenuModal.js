import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState,useEffect } from 'react'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsChatScreenMenuModalVisible, toggleChatScreenMenuVisible, toggleCreditModal, togglePaymentModalVisible } from '../../../../slices/modalSlices';
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
import PaymentModal from '../PaymentModal/PaymentModal';
import CreditModal from '../CreditModal/CreditModal';

const ChatScreenMenuModal = () => {
 const selectModalVisible = useSelector(selectIsChatScreenMenuModalVisible)
 const dispatch = useDispatch()
 const [menuData,setMenuData] = useState([
  {
    "id": "1",
    "desc":"Hesap Bilgileri",
    "icon":"settings-outline"
  },
  {
    "id": "2",
    "desc":"Destek",
    "icon":"chatbox-outline"
  },
  {
    "id": "4",
    "desc":"Sıkça Sorulan Sorular",
    "icon":"help-outline"
  },
  {
    "id": "3",
    "desc":"Çerez Politikası",
    "icon":"document-text-outline"
  },
  {
    "id": "5",
    "desc":"KVKK",
    "icon":"server-outline"
  },
  {
    "id": "6",
    "desc":"Çıkış Yap",
    "icon":"log-out-outline"
  },
])



 const MenuFlatlistItem = ({item}) => {

  return(

    <MenuItem item={item}/>
  )

  



 }
  return (
    <Modal
  style={{flex:1,margin:0,bottom:0,backgroundColor:"white"}}
  isVisible={selectModalVisible}
  hasBackdrop={true}
  animationIn={'slideInRight'}
  animationOut={'slideOutRight'}
  animationInTiming={500}
  animationOutTiming={500}
  backdropColor='white'
  onRequestClose={() => {
    dispatch(toggleChatScreenMenuVisible(false))
 }}
>
  <SafeAreaView style={{flex:1,paddingHorizontal:15}}>
    <AccountSettingsModal/>
    <HelpModal/>
    <LicenceModal/>
    <PaymentModal/>
    <SSSModal/>
    <KVKKModal/>
    <CreditModal/>
  <View style={styles.topConatiner}>
    <TouchableOpacity
              style={{marginLeft: 15,}}
              onPress={() => dispatch(toggleChatScreenMenuVisible(false))}>
              <Ionicons name="arrow-back-outline" size={35} color={orangeColor} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 15,padding:10,borderColor:orangeColor,borderRadius:5,borderWidth:.3,flexDirection:'row',alignItems:'center'}}
              onPress={() => dispatch(toggleCreditModal(true))}>
                <Ionicons name="diamond-outline" size={16} color={orangeColor}></Ionicons>
              <Text style={{fontWeight:'600',color:orangeColor,marginLeft:10}}>Kredi Yükle</Text>
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
    height:50,
    marginTop:40,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'

  }

})