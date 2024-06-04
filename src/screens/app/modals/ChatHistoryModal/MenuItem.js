import {StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native';
import React from 'react';
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
  toggleVerificationModal,
  toggleWalletModal,
} from '../../../../slices/modalSlices';
import {useNavigation} from '@react-navigation/native';
import {setSignIn} from '../../../../slices/authSlices';
import {setChatHistory, setSessionToken} from '../../../../slices/chatSlices';
import {blueColor} from '../../../../statics/color';

const MenuItem = ({item}) => {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

  const handleItemPress = itemId => {
    dispatch(setChatHistory(item));
    dispatch(setSessionToken(item.session_id));
    console.log('menu item dan geldi:', item.session_id);
    dispatch(setCounter(counter + 1));
    dispatch(toggleChatHistoryModalVisible(false));
  };

  const renderItem = ({item}) => (
    <View style={{backgroundColor:'white'}}>


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
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          width: 65,
          margin: 5,
          backgroundColor:'red',
          padding:10,
          right: 0
        }}
        onPress={() => console.log('Delete button pressed')}>
       
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
