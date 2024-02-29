import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, toggleAccountSettingsModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'

const AccountSettingsModal = () => {
               const selectModalVisible = useSelector(selectIsAccountSettingsModalVisible)
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
               backdropColor='white'
             >
               <SafeAreaView style={{flex:1,margin:0}}>
               <View style={styles.containerTop}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                              dispatch(toggleAccountSettingsModalVisible(false))
                }}>
                <Ionicons
                  name="arrow-back-outline"
                  color={orangeColor}
                  size={35}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.headerName}>Hesap Ayarları</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerBottom}>
            <View style={{width:'100%',alignItems:'center',marginTop:10}}>
              
              <View style={{width:'90%',borderColor:blueColor,height:200,borderRadius:12,borderWidth:1,padding:10}}>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                <Text>Güncel Plan : </Text>
                <Text>Premium</Text>
                </View>
                
                
              </View>
            </View>
        </View>
               </SafeAreaView>
               
             </Modal>
  )
}

export default AccountSettingsModal

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
               headerName: {fontWeight: '600', fontSize: 22, marginLeft: 5,color:orangeColor},
        
           containerBottom:{
            flex:1

           },
             });