import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsChatScreenMenuModalVisible, toggleChatScreenMenuVisible } from '../../../../slices/modalSlices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import MenuItem from './MenuItem';

const ChatScreenMenuModal = () => {
 const selectModalVisible = useSelector(selectIsChatScreenMenuModalVisible)
 const dispatch = useDispatch()
 const [menuData,setMenuData] = useState([
  {
    "id": "1",
    "desc":"Hesap Ayarları",
    "icon":"cog"
  },
 
  {
    "id": "3",
    "desc":"Cüzdanım",
    "icon":"wallet"
  },
  {
    "id": "4",
    "desc":"Ödemelerim",
    "icon":"shopping-cart"
  },
  {
    "id": "5",
    "desc":"Yardım",
    "icon":"hands-helping"
  },
  {
    "id": "6",
    "desc":"Verilerin Korunması",
    "icon":"database"
  },
  {
    "id": "7",
    "desc":"Lisanslar",
    "icon":"certificate"
  },
  {
    "id": "8",
    "desc":"Sıkça Sorulan Sorular",
    "icon":"question"
  },
  {
    "id": "9",
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
  backdropColor='orange'
>
  <SafeAreaView style={{flex:1}}>
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