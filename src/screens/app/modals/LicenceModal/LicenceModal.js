import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsLicenceModalVisible, toggleLicenceModalVisible } from '../../../../slices/modalSlices';
import { WebView } from 'react-native-webview';
import { orangeColor } from '../../../../statics/color';

const LicenceModal = () => {
  const selectModalVisible = useSelector(selectIsLicenceModalVisible);
  const dispatch = useDispatch();

  return (
    <Modal
      style={{ flex: 1, margin: 0 }}
      statusBarTranslucent={true}
      isVisible={selectModalVisible}
      hasBackdrop={true}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={1}
      backdropColor='#D77A25'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => dispatch(toggleLicenceModalVisible(false))}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="arrow-back-outline"
              color={orangeColor}
              size={35}
            />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <WebView 
          
          source={{ uri: 'https://www.hukukchat.com/cerez-politikasi' }} style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default LicenceModal;

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor:'white',
    borderRadius:50
  },
  iconContainer: {
    borderRadius: 5,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
