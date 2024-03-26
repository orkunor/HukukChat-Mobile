import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';

import { toggleAccountSettingsModalVisible, toggleCardModal, toggleChatScreenMenuVisible, toggleHelpModalVisible, toggleKVKKModalVisible, toggleLicenceModalVisible, togglePaymentsModal, toggleSSSModalVisible, toggleVerificationModal, toggleWalletModal} from '../../../../slices/modalSlices';
import { useNavigation } from '@react-navigation/native';
import { setSignIn } from '../../../../slices/authSlices';
const MenuItem = ({item}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const handleItemPress = itemId => {
    switch (itemId) {
         case '1':
          dispatch(toggleAccountSettingsModalVisible(true))
         break;
         case '2':
          dispatch(toggleHelpModalVisible(true))
         break;
         case '3':
          dispatch(toggleLicenceModalVisible(true))
         break;
         case '4':
          dispatch(toggleSSSModalVisible(true))
         break;
         case '5':
          dispatch(toggleKVKKModalVisible(true))
         break;
        case '6':
          dispatch(toggleChatScreenMenuVisible(false))
          const removeData = async () => {
            try {
              await AsyncStorage.removeItem('jwt');
              dispatch(setSignIn(null));
              console.log('silindi');
            } catch (error) {
              console.error('Veri silme hatası:', error);
            }
          };
          
          removeData();
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
