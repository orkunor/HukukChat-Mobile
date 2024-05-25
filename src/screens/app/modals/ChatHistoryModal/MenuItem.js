import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { selectCounter, setCounter, toggleAccountSettingsModalVisible, toggleCardModal, toggleChatHistoryModalVisible, toggleChatScreenMenuVisible, toggleHelpModalVisible, toggleKVKKModalVisible, toggleLicenceModalVisible, togglePaymentsModal, toggleSSSModalVisible, toggleVerificationModal, toggleWalletModal} from '../../../../slices/modalSlices';
import { useNavigation } from '@react-navigation/native';
import { setSignIn } from '../../../../slices/authSlices';
import { setChatHistory, setSessionToken } from '../../../../slices/chatSlices';
const MenuItem = ({item}) => {
  
  let counter = useSelector(selectCounter)
const dispatch = useDispatch()
  const handleItemPress = itemId => {
    dispatch(setChatHistory(item))
    dispatch(setSessionToken(item.session_id))
    dispatch(setCounter(counter + 1))
    dispatch(toggleChatHistoryModalVisible(false))
  };
  

  return (
    <TouchableOpacity
    onPress={handleItemPress}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        borderColor:'black'
      }}>
         
        <Ionicons name="arrow-forward-outline" size={25} color={'black'} />

      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          marginLeft: 15,
          color:"black"
        }}>
{item.user_messages[0]}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
