import { StyleSheet, Text, View,TouchableOpacity ,TextInput} from 'react-native'
import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, selectIsHelpModalVisible, toggleAccountSettingsModalVisible, toggleHelpModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'

const HelpModal = () => {
               const selectModalVisible = useSelector(selectIsHelpModalVisible)
               const dispatch = useDispatch()
               const [note,setNote] = useState('')
                
               const handleNoteChange = newNote => {
                setNote(newNote)
 }


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
                              dispatch(toggleHelpModalVisible(false))
                }}>
                <Ionicons
                  name="arrow-back-outline"
                  color={blueColor}
                  size={35}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.headerName}>Yardım</Text>
            </View>
          </View>
        </View>
        <View style={{flex:1,alignItems:'center'}}>
               <Text
               style={{
               fontSize: 25,
               color: blueColor,
               fontWeight: '600',
               marginBottom: 50,
               marginTop: 25,
               }}>
               Destek Talebinizi Paylaşın
               </Text>
               <View style={{width:350,height:350,borderWidth:.3,borderColor:blueColor,borderRadius:20,padding:25}}>
               <TextInput
               value={note}
               onChangeText={handleNoteChange}
                style={{
                              color: 'black',
                              fontSize: 20,
                              fontWeight: '700',
                            flex:1,
                            }}
               placeholder='Bir şeyler yazın...'
               textAlign='left'
               textAlignVertical='top'
               multiline={true}
               >
               
               </TextInput>            
               </View>
             
<TouchableOpacity style={{marginTop:25,backgroundColor:blueColor,width:300,justifyContent:'center',alignItems:'center',height:75,borderRadius:12,}}><Text style={{color:'white',fontSize:22}}>Gönder</Text></TouchableOpacity>
               </View>
               </SafeAreaView>
             </Modal>
  )
}

export default HelpModal

const styles = StyleSheet.create({
  containerBottom:{
    flex:1
  },
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
               headerName: {fontWeight: '600', fontSize: 22, marginLeft: 5,color:blueColor},
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