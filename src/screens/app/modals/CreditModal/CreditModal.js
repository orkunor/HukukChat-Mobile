import { StyleSheet, Text, View,TouchableOpacity ,TextInput,KeyboardAvoidingView} from 'react-native'
import React, { useEffect, useState } from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, selectIsCreditModalVisible, selectIsHelpModalVisible, selectIsPaymentModalVisible, toggleAccountSettingsModalVisible, toggleCreditModal, toggleHelpModalVisible, toggleNoteSendedVisible, togglePaymentModalVisible, toggleServerErrorModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'
import { selectSignIn } from '../../../../slices/authSlices'
import NoteSended from '../Warnings/NoteSended'
import { Flow } from 'react-native-animated-spinkit';
import ServerErrorModal from '../Warnings/ServerErrorModal'
import { BackHandler } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SocialIcon } from 'react-native-elements'
import CreditItem from './CreditItem'
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';

const CreditModal = () => {

  const itemSkus = Platform.select({
    ios: [
      'standart_package', 
      'professional_package', 
      'premium_package'
    ],
    android: [
      'standart_package', 
      'professional_package', 
      'premium_package'
    ]
  });
  
  
  const dispatch = useDispatch()
  const selectModalVisible = useSelector(selectIsCreditModalVisible)
  const [data,setData] = useState([{
    packageName:'Standart',
    packagePrice:'49.99 TL',
    count:50,
    sku: 'standart_package',


  },
  {
    packageName:'Profesyonel',
    packagePrice:'99,99 TL',
    count:110,
    sku: 'professional_package',


  },
  {
    packageName:'Premium',
    packagePrice:'199,99 TL',
    count:250,
    sku: 'premium_package',


  }])
 
   
  const creditItem = ({item}) => {

      return(
                  <CreditItem item={item} />
      )



  }


useEffect(() => {
  const backAction = () => {
    dispatch(togglePaymentModalVisible(false))
    return true
    ;
  };

  const backHandler = BackHandler.addEventListener(
    'hardwareBackPress',
    backAction,
  );

  return () => backHandler.remove();
}, []);
const GradientText = ({ text, style }) => {
  return (
    <MaskedView maskElement={<Text style={[style, { backgroundColor: 'transparent' }]}>{text}</Text>}>
      <LinearGradient 
        opacity={0.5}
      colors={[orangeColor,'black']}>
        <Text style={[style, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};


 return(
               <Modal
               style={{flex:1,margin:0,backgroundColor:'white'}}
               isVisible={selectModalVisible}
               hasBackdrop={true}
               animationIn={'slideInUp'}
               animationOut={'slideOutDown'}
               animationInTiming={500}
               animationOutTiming={500}
               backdropOpacity={1}
               onRequestClose={() => {
                dispatch(toggleCreditModal(false))
             }}
               backdropColor='white'
             >
               <SafeAreaView style={{flex:1}}>
                              <ScrollView>
                              <View style={styles.containerTop}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
           
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                              dispatch(toggleCreditModal(false))
                }}>
                <Ionicons
                  name="chevron-down-outline"
                  color={orangeColor}
                  size={35}></Ionicons>
              </TouchableOpacity>

              <GradientText text="Kredi Yükle" style={styles.headerName} />

            </View>
          </View>
        </View>


        <View
        style={{flex:1,marginTop:20,justifyContent:'center',alignItems:'center'}}>
                  <GradientText text={"HukukChat'in Gücünü Kullan"} style={{paddingVertical:20,fontSize:26,fontWeight:'600',color:'black'}}></GradientText>

           <FlatList
            style={{marginTop:10,marginBottom:25}}
           data={data}
           renderItem={creditItem}
           horizontal={true} 
           showsHorizontalScrollIndicator={false}
           />
          

        </View>
                              </ScrollView>
                              
               </SafeAreaView>
                              

             </Modal>
 )
}

export default CreditModal


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
                            containerTop: {height: 50, alignItems: 'center', width: '100%',marginTop:50,paddingLeft:10},
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
                            submitButton:{
             
                             marginTop:25,backgroundColor:blueColor,width:300,justifyContent:'center',alignItems:'center',height:75,borderRadius:12
                            }
                          });