import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, selectIsHelpModalVisible, selectIsSSSModalVisible, toggleAccountSettingsModalVisible, toggleHelpModalVisible, toggleSSSModalVisible } from '../../../../slices/modalSlices'

const SSSModal = () => {
               const selectModalVisible = useSelector(selectIsSSSModalVisible)
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
               backdropColor='#D77A25'
             >
               
               <SafeAreaView style={{flex:1,margin:0}}>
               <View style={styles.containerTop}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                              dispatch(toggleSSSModalVisible(false))
                }}>
                <Ionicons
                  name="arrow-back-outline"
                  color={'white'}
                  size={35}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.headerName}>SSS</Text>
            </View>
          </View>
        </View>
               </SafeAreaView>
               
             </Modal>
  )
}

export default SSSModal

const styles = StyleSheet.create({
               closeButton: {
                 marginLeft: 10,
                 borderRadius: 5,
                 height: 50,
                 width: 50,
                 justifyContent: 'center',
                 alignItems: 'center',
               },
               containerTop: {height: 50, alignItems: 'center', width: '100%'},
               header: {
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 flexDirection: 'row',
                 height: 50,
                 width: '100%',
                 borderBottomWidth: 0.3,
                 borderColor: 'white',
               },
               headerName: {fontWeight: '600', fontSize: 22, marginLeft: 5,color:'white'},
               menuContainer: {marginRight: 15, flexDirection: 'row'},
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
               userDetailCount: {fontSize: 20, fontWeight: '600'},
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
             });