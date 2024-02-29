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
              <Text style={styles.headerName}>Hesap Bilgileri</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerBottom}>
            <View style={{width:'100%',alignItems:'center',marginTop:10}}>
              
              <View style={{width:'90%',borderColor:blueColor,height:175,borderRadius:12,borderWidth:1,padding:10,alignItems:'center',justifyContent:'center'}}>
                <View style={{flexDirection:'row',alignItems:'center',}}>
                <Text>Güncel Abonelik : </Text>
                <Text style={{color:orangeColor,fontWeight:'600'}}>Premium</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text>Abonelik Başlangıç : </Text>
                <Text style={{color:'black',fontWeight:'600'}}>17/05/2002</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text>Abonelik Bitiş : </Text>
                <Text style={{color:'black',fontWeight:'600'}}>19/02/2024</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text>Kalan Kontür : </Text>
                <Text style={{color:orangeColor,fontWeight:'600'}}>141</Text>
                </View>
              </View>
            </View>


          <View style={{marginTop:15}}>
          <Text style={{fontWeight:'600',fontSize:20}}>Profil Bilgileri</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text>Kullanıcı Adı : </Text>
                <Text style={{color:blueColor,fontWeight:'600',fontSize:15}}>kemalalibircan</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text>Email : </Text>
                <Text style={{color:blueColor,fontWeight:'600',fontSize:15}}>kemal.alibircan@gmail.com</Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center',marginTop:15}}>
                <Text>Telefon Numarası : </Text>
                <Text style={{color:blueColor,fontWeight:'600',fontSize:15}}>+90 534 612 46 42</Text>
                </View>
          </View>

<View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:20,borderTopWidth:.3,paddingTop:15}}>
  <Text>
    Buradan parola sıfırlama talebinde bulunabilirsiniz.
  </Text>
<TouchableOpacity style={{width:250,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'red',borderRadius:8,marginTop:20}}> 
                  <Text style={{color:'white',fontSize:18}}>Parola Sıfırlama Talebi</Text>
                  </TouchableOpacity>

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