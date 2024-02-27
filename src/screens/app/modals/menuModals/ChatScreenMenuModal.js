import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsChatScreenMenuModalVisible, toggleChatScreenMenuVisible } from '../../../../slices/modalSlices';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatScreenMenuModal = () => {
 const selectModalVisible = useSelector(selectIsChatScreenMenuModalVisible)
 const dispatch = useDispatch()
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

<TouchableOpacity
                style={{marginLeft: 15,}}
                onPress={() => dispatch(toggleChatScreenMenuVisible(false))}>
                <Ionicons name="arrow-back-outline" size={35} color={'white'} />
              </TouchableOpacity>
      </Modal>
  )
}

export default ChatScreenMenuModal

const styles = StyleSheet.create({})