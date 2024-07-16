import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React, { useEffect } from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SwipeListView} from 'react-native-swipe-list-view';

import {
  selectCounter,
  setCounter,
  toggleAccountSettingsModalVisible,
  toggleCardModal,
  toggleChatHistoryModalVisible,
  toggleChatScreenMenuVisible,
  toggleHelpModalVisible,
  toggleKVKKModalVisible,
  toggleLicenceModalVisible,
  togglePaymentsModal,
  toggleSSSModalVisible,
  toggleServerErrorModalVisible,
  toggleVerificationModal,
  toggleWalletModal,
} from '../../../../slices/modalSlices';
import {useNavigation} from '@react-navigation/native';
import {setSignIn} from '../../../../slices/authSlices';
import {selectChatHistory, selectSessionToken, setChatHistory, setSessionToken} from '../../../../slices/chatSlices';
import {blueColor} from '../../../../statics/color';
import ServerErrorModal from '../Warnings/ServerErrorModal';

const MenuItem = ({item,index}) => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();


  const selectLastToken = useSelector(selectSessionToken)

  useEffect(() => {
    


  },[])

  const deleteSession = async () => {
    try {
      const response = await fetch(`https://api.hukukchat.com/delete-session/`+item.session_id, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
        },
      })
      .then((response) => response.json())
      .then((data)=> {
        if(data.message === "Session deleted successfully"){
          dispatch(setCounter(counter + 1));
        }else{
           dispatch(toggleServerErrorModalVisible(true))
        }
      })
    } catch (error) {
      Alert.alert('Hata', `Bir hata oluştu: ${error.message}`);
    }
  };

  const handleItemPress = itemId => {
    dispatch(setChatHistory(item));
    dispatch(setSessionToken(item.session_id));
    dispatch(setCounter(counter + 1));
    dispatch(toggleChatHistoryModalVisible(false));
  };

  const renderItem = ({item}) => (
    <View style={{backgroundColor:'white'}}>
      <ServerErrorModal/>

    <TouchableOpacity

      onPress={() => handleItemPress(item.id)}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        backgroundColor:'white',
        borderColor: blueColor,
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '500',
          marginLeft: 15,
          color: blueColor,
          width:'90%'
        }}>
        {item.user_messages[0]}
      </Text>
      <Ionicons name="arrow-forward-outline" size={27} color={blueColor} />
    </TouchableOpacity>
    </View>

  );

  const renderHiddenItem = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
      }}>
      <TouchableOpacity
      disabled={selectLastToken === item.session_id ? true : false}
        style={selectLastToken === item.session_id? { justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        width: 65,
        margin: 5,
        backgroundColor:'grey',
        padding:10,} : {
          
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          width: 65,
          margin: 5,
          backgroundColor:'red',
          padding:10,
          right: 0
        }}
        onPress={() =>deleteSession()}>
       
        <Text style={{color:'white'}}>Sil</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SwipeListView
      data={[{key: 'item', ...item}]}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      disableRightSwipe={true}
      rightOpenValue={-75}
    />
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
