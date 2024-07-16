import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectCounter, selectIsChatHistoryModalVisible, selectIsWarningFuncVisible, toggleChatHistoryModalVisible, toggleLoginAgainModalVisible, toggleServerErrorModalVisible, toggleWarningFuncVisible } from '../../../../slices/modalSlices';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import MenuItem from './MenuItem';
import { selectSignIn } from '../../../../slices/authSlices';
import { setWarningButtonText, setWarningText } from '../../../../slices/chatSlices';
import { blueColor } from '../../../../statics/color';
import { Swing } from 'react-native-animated-spinkit';
import LoginAgainModal from '../Warnings/LoginAgainModal';

const ChatHistoryModal = () => {
  const selectModalVisible = useSelector(selectIsChatHistoryModalVisible);
  const dispatch = useDispatch();
  const selectUserToken = useSelector(selectSignIn);
  const [menuData, setMenuData] = useState([]);
  const selectWarningFuncVisible = useSelector(selectIsWarningFuncVisible);
  const [loading, setLoading] = useState(false);
  let counter = useSelector(selectCounter);

  const MenuFlatlistItem = ({ item }) => {
    return (
      <MenuItem item={item} />
    );
  };

  const handleGetChatHistory = () => {
    setLoading(true);
    
    fetch('https://api.hukukchat.com/get_chat_history/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${selectUserToken}`,
      }
    })
      .then(response => response.json())
      .then(data => {
      setLoading(false);
        if (data && data.data && Array.isArray(data.data)) {
          const filteredData = data.data.filter(item => item.user_messages && item.user_messages.length > 0);
          setMenuData(filteredData);
        } else {
          dispatch(toggleLoginAgainModalVisible(true))

        }
      })
      .catch(error => {
        console.error('Hata:', error);
        setLoading(false);
        dispatch(toggleServerErrorModalVisible(true));
      });
      
  };

  useEffect(() => {
    handleGetChatHistory();
  }, [counter]);

  return (
    <Modal
      style={{ flex: 1, margin: 0, bottom: 0, backgroundColor: "white" }}
      isVisible={selectModalVisible}
      hasBackdrop={true}
      animationIn={'slideInLeft'}
      animationOut={'slideOutLeft'}
      animationInTiming={500}
      animationOutTiming={500}
      backdropColor='white'
      onRequestClose={() => {
        dispatch(toggleChatHistoryModalVisible(false));
      }}
    >
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 15 }}>
        <LoginAgainModal/>
        <View style={styles.topContainer}>
          <Text style={styles.topText}>Sohbet Geçmişi</Text>
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => dispatch(toggleChatHistoryModalVisible(false))}>
            <Ionicons name="close-outline" size={35} color={blueColor} />
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <Swing size={48} color={blueColor} />
          </View>
        ) : (
          <FlatList
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            data={menuData}
            renderItem={({ item, index }) => <MenuItem item={item} index={index} />}
            keyExtractor={(item, index) => index.toString()}

            />
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default ChatHistoryModal;

const styles = StyleSheet.create({
  topContainer: {
    height: 50,
    marginTop: 35,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  topText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: blueColor
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
