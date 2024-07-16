import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  selectCounter,
  selectIsChatSettingsModalVisible, 
  setCounter, 
  toggleChatSeetingsModalVisible 
} from '../../../../slices/modalSlices';
import { blueColor } from '../../../../statics/color';
import { ScrollView } from 'react-native-gesture-handler';
import { setWebSearchEnable } from '../../../../slices/chatSlices';

const ChatSettingsModal = () => {
  const selectModalVisible = useSelector(selectIsChatSettingsModalVisible);
  const dispatch = useDispatch();
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const count = useSelector(selectCounter)
  const handleToggleSwitch = () => {
    const newValue = !isWebSearchEnabled;
    setIsWebSearchEnabled(newValue);
    dispatch(setWebSearchEnable(newValue));  
    dispatch(setCounter(count + 1))
  };


  return (
    <Modal
      style={{ flex: 1, margin: 0, backgroundColor: 'white' }}
      isVisible={selectModalVisible}
      hasBackdrop={true}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={1}
      onRequestClose={() => {
        dispatch(toggleChatSeetingsModalVisible(false));
      }}
      backdropColor='white'
    >
      <SafeAreaView style={{ flex: 1, margin: 0, backgroundColor: 'white' }}>
        <View style={styles.containerTop}>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  dispatch(toggleChatSeetingsModalVisible(false));
                }}>
                <Ionicons
                  name="arrow-back-outline"
                  color={blueColor}
                  size={35}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.headerName}>Settings</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          <View style={styles.settingsItem}>
            <Text style={styles.settingsText}>Web'de Arama</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isWebSearchEnabled ? blueColor : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={handleToggleSwitch}
              value={isWebSearchEnabled}
            />
          </View>
          {/* Add more settings items here */}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

export default ChatSettingsModal

const styles = StyleSheet.create({
  containerBottom: {
    flex: 1
  },
  closeButton: {
    marginLeft: 10,
    borderRadius: 5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerTop: {
    height: 50, 
    alignItems: 'center', 
    width: '100%', 
    marginTop: 50, 
    paddingLeft: 10
  },
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: '100%',
    borderBottomWidth: 0.3,
    borderColor: 'white',
  },
  headerName: {
    fontWeight: '600', 
    fontSize: 22, 
    marginLeft: 5, 
    color: blueColor
  },
  menuContainer: {
    marginRight: 15, 
    flexDirection: 'row'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'column',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 20,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  profileSec: {
    width: '100%',
    marginTop: 15,
    flexDirection: 'column',
    borderColor: 'grey',
  },
  profileDetails: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  userDetail: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetailCount: {
    fontSize: 20, 
    fontWeight: '600'
  },
  location: {
    fontSize: 22,
  },
  messageButton: {
    marginRight: 5,
    borderRadius: 5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    marginTop: 25,
    backgroundColor: blueColor,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    borderRadius: 12
  },
  scrollView: {
    marginHorizontal: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  settingsText: {
    fontSize: 18,
  },
});
