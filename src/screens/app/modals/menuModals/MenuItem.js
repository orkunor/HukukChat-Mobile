import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {toggleAccountSettingsModal, toggleCardModal, toggleChatScreenMenuVisible, togglePaymentsModal, toggleVerificationModal, toggleWalletModal} from '../../../../slices/modalSlices';
import { useNavigation } from '@react-navigation/native';
const MenuItem = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const handleItemPress = itemId => {
    switch (itemId) {
  /*    case '1':
          dispatch(toggleAccountSettingsModal(true))
        break;
        */
      case '9':
        dispatch(toggleChatScreenMenuVisible(false))
        navigation.navigate('Welcome')
      break;
      /*case '9':
        const removeData = async () => {
          try {
            await AsyncStorage.removeItem('jwt');
            dispatch(signOut());
            console.log('silindi');
          } catch (error) {
            console.error('Veri silme hatası:', error);
          }
        };
        removeData();
        */
        break;
    }
  };
  

  return (
    <TouchableOpacity
      onPress={() => handleItemPress(item.id)}
      style={{
        padding: 15,
        borderBottomWidth: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        borderColor:'white'
      }}>
      <FontAwesome5Icon name={`${item.icon}`} size={22} color={"white"}></FontAwesome5Icon>
      <Text
        style={{
          fontSize: 22,
          fontWeight: '500',
          textAlign: 'center',
          marginLeft: 15,
          color:"white"
        }}>
        {item.desc}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
