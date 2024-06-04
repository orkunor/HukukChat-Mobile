import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  selectIsAccountSettingsModalVisible,
  selectIsHelpModalVisible,
  selectIsLoginAgainModalVisible,
  selectIsSSSModalVisible,
  selectIsWarningFuncVisible,
  selectIsWrongPassOrMailModalVisible,
  toggleAccountSettingsModalVisible,
  toggleHelpModalVisible,
  toggleSSSModalVisible,
  toggleWarningFuncVisible,
  toggleWrongPassOrMailModalVisible,
} from '../../../../slices/modalSlices';
import {blueColor, orangeColor} from '../../../../statics/color';
import {ScrollView} from 'react-native-gesture-handler';
import { setSignIn } from '../../../../slices/authSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginAgainModal = ({message, button}) => {
  const selectModalVisible = useSelector(selectIsLoginAgainModalVisible);
  const dispatch = useDispatch();

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('jwt');
      dispatch(setSignIn(null));
      console.log('silindi');
    } catch (error) {
      console.error('Veri silme hatası:', error);
    }
  };
  
  return (
    <Modal
      style={{flex: 1}}
      isVisible={selectModalVisible}
      hasBackdrop={true}
      animationIn={'slideInDown'}
      animationOut={'slideOutUp'}
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={0.7}
      backdropColor="#D77A25">
      <SafeAreaView
        style={{
          flex: 1,
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '95%',
            height: 225,
            backgroundColor: 'white',
            borderRadius: 12,
          }}>
          <Text style={{color: 'black', textAlign: 'center', fontSize: 22}}>
            Doğrulama süresi doldu. Lütfen tekrar giriş yapın.
          </Text>
          <TouchableOpacity
            onPress={() => {
             removeData();
            }}
            style={{
              backgroundColor: blueColor,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 15,
              borderRadius: 8,
              marginTop: 20,
            }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 18}}>
              Giriş Yap
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default LoginAgainModal;

const styles = StyleSheet.create({});
