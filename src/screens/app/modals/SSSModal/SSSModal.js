import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useEffect} from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, selectIsHelpModalVisible, selectIsSSSModalVisible, toggleAccountSettingsModalVisible, toggleHelpModalVisible, toggleSSSModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'
import { ScrollView } from 'react-native-gesture-handler'
import { BackHandler } from 'react-native';

const SSSModal = () => {
               const selectModalVisible = useSelector(selectIsSSSModalVisible)
               const dispatch = useDispatch()

             
            
            
               
  return (
               <Modal
               style={{flex:1}}
               isVisible={selectModalVisible}
               hasBackdrop={true}
               animationIn={'slideInRight'}
               animationOut={'slideOutRight'}
               animationInTiming={500}
               animationOutTiming={500}
               backdropOpacity={1}
               onRequestClose={() => {
                  dispatch(toggleSSSModalVisible(false))
               }}
               backdropColor='white'
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
                  color={orangeColor}
                  size={35}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.headerName}>Sıkça Sorulan Sorular</Text>
            </View>
          </View>
        </View>
        <View style={{flex:1,margin:0}}>
          <ScrollView>

         
          <View style={{marginHorizontal:0,backgroundColor:'white',minHeight:150,marginTop:10,borderRadius:8,padding:10}}>
          <View style={{backgroundColor:orangeColor,minHeight:25,paddingLeft:10,borderRadius:7,justifyContent:'center'}}>
          <Text style={{color:'white',fontWeight:'600'}}>Neden HukukChat?</Text>
          </View>
          <View style={{minHeight:25,paddingLeft:10,borderRadius:7,justifyContent:'center',marginTop:5,padding:10}}>
          <Text style={{color:blueColor}}>Hukukta Yapay Zeka Çağı. HukukChat, GPT-3.5 ve GPT-4 Turbo teknolojileriyle hukuk alanına yenilik getiriyor. Derinlemesine anlama ve kapsamlı analiz yetenekleriyle, hukuki metin hazırlamada devrim yaratıyor.
            </Text>
          </View>
          </View>
          <View style={{marginHorizontal:0,backgroundColor:'white',minHeight:150,marginTop:10,borderRadius:8,padding:10}}>
          <View style={{backgroundColor:orangeColor,minHeight:25,paddingLeft:10,borderRadius:7,justifyContent:'center'}}>
          <Text style={{color:'white',fontWeight:'600'}}>HukukChat'ın Rakiplerinden Farkları?</Text>
          </View>
          <View style={{minHeight:25,paddingLeft:10,borderRadius:7,justifyContent:'center',marginTop:5,padding:10}}>
          <Text style={{color:blueColor}}>Teknolojik Üstünlük
HukukChat, sadece bir uygulama değil, aynı zamanda sürekli evrilen, teknolojik olarak ileri seviye bir platformdur. En son yapay zeka teknolojilerini kullanan altyapımız, size her zaman bir adım önde olma avantajı sunar.</Text>
          </View>
          </View>
          <View style={{marginHorizontal:0,backgroundColor:'white',minHeight:150,marginTop:10,borderRadius:8,padding:10}}>
          <View style={{backgroundColor:orangeColor,minHeight:25,paddingLeft:10,borderRadius:7,justifyContent:'center'}}>
          <Text style={{color:'white',fontWeight:'600'}}>Daha Detaylı Bilgilere Nereden Ulaşırım?</Text>
          </View>
          <View style={{minHeight:25,paddingLeft:10,borderRadius:7,justifyContent:'center',marginTop:5,padding:10}}>
          <Text style={{color:blueColor}}>https://www.hukukchat.com/ Web sayfası üzerinden bizimle ilgili daha detaylı sonuçlara ulaşabilirsiniz.</Text>
          </View>
          </View>
          </ScrollView>
       
          

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
               containerTop: {height: 50, alignItems: 'center', width: '100%',marginTop:20},
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