import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React,{useEffect, useState} from 'react'
import Modal from 'react-native-modal'
import { useDispatch, useSelector } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { selectIsAccountSettingsModalVisible, selectIsHelpModalVisible, selectIsSSSModalVisible, toggleAccountSettingsModalVisible, toggleHelpModalVisible, toggleSSSModalVisible } from '../../../../slices/modalSlices'
import { blueColor, orangeColor } from '../../../../statics/color'
import { ScrollView } from 'react-native-gesture-handler'
import { BackHandler } from 'react-native';
const SSSModal = () => {
  const selectModalVisible = useSelector(selectIsSSSModalVisible);
  const dispatch = useDispatch();
  const [button1, setButton1] = useState(false);
  const [button2, setButton2] = useState(false);
  const [button3, setButton3] = useState(false);
  const [button4, setButton4] = useState(false);

  return (
    <Modal
      style={{ flex: 1 }}
      isVisible={selectModalVisible}
      hasBackdrop={true}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      animationInTiming={500}
      animationOutTiming={500}
      backdropOpacity={1}
      onRequestClose={() => {
        dispatch(toggleSSSModalVisible(false));
      }}
      backdropColor="white"
    >
      <SafeAreaView style={{ flex: 1, margin: 0 }}>
        <View style={styles.containerTop}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                dispatch(toggleSSSModalVisible(false));
              }}
            >
              <Ionicons name="arrow-back-outline" color={orangeColor} size={35} />
            </TouchableOpacity>
            <Text style={styles.headerName}>Sıkça Sorulan Sorular</Text>
          </View>
        </View>
        <ScrollView>
        <View style={{ marginHorizontal: 0, backgroundColor: 'white', marginTop: 10, borderRadius: 8, padding: 10 }}>
            <TouchableOpacity
              onPress={() => setButton1(!button1)}
              style={ button1 ? { backgroundColor: orangeColor, minHeight: 25, paddingLeft: 10, borderTopLeftRadius: 7,borderTopRightRadius:7, justifyContent: 'center' }:{ backgroundColor: orangeColor, minHeight: 25, paddingLeft: 10, borderRadius:7, justifyContent: 'center' }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Neden HukukChat?</Text>
              {button1 ? (
                <Ionicons name="chevron-up" size={25} color="white" style={{ position: 'absolute', right: 10 }} />
              ) : (
                <Ionicons name="chevron-down" size={25} color="white" style={{ position: 'absolute', right: 10 }} />
              )}
            </TouchableOpacity>
            {button1 ? (
              <View style={{ minHeight: 150, paddingLeft: 10, borderBottomLeftRadius:7,borderBottomRightRadius:7, justifyContent: 'center',  padding: 10,backgroundColor:'#FFEAD2'  }}>
                <Text style={{ color: blueColor }}>
                Hukukta Yapay Zeka Çağı. HukukChat, GPT-3.5 ve GPT-4 Turbo teknolojileriyle hukuk alanına yenilik getiriyor. Derinlemesine anlama ve kapsamlı analiz yetenekleriyle, hukuki metin hazırlamada devrim yaratıyor.
                </Text>
              </View>
            ) : null}
          </View>

          <View style={{ marginHorizontal: 0, backgroundColor: 'white', marginTop: 10, borderRadius: 8, padding: 10 }}>
            <TouchableOpacity
              onPress={() => setButton2(!button2)}
              style={ button2 ? { backgroundColor: orangeColor, minHeight: 25, paddingLeft: 10, borderTopLeftRadius: 7,borderTopRightRadius:7, justifyContent: 'center' }:{ backgroundColor: orangeColor, minHeight: 25, paddingLeft: 10, borderRadius:7, justifyContent: 'center' }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>HukukChat'ın Rakiplerinden Farkları?</Text>
              {button2 ? (
                <Ionicons name="chevron-up" size={25} color="white" style={{ position: 'absolute', right: 10 }} />
              ) : (
                <Ionicons name="chevron-down" size={25} color="white" style={{ position: 'absolute', right: 10 }} />
              )}
            </TouchableOpacity>
            {button2 ? (
              <View style={{ minHeight: 150, paddingLeft: 10, borderBottomLeftRadius:7,borderBottomRightRadius:7, justifyContent: 'center',  padding: 10,backgroundColor:'#FFEAD2'  }}>
                <Text style={{ color: blueColor }}>
                  Teknolojik Üstünlük. HukukChat, sadece bir uygulama değil, aynı zamanda sürekli evrilen, teknolojik olarak ileri seviye bir platformdur. En son yapay zeka teknolojilerini kullanan altyapımız, size her zaman bir adım önde olma avantajı sunar.
                </Text>
              </View>
            ) : null}
          </View>

          <View style={{ marginHorizontal: 0, backgroundColor: 'white', marginTop: 10, borderRadius: 8, padding: 10 }}>
            <TouchableOpacity
              onPress={() => setButton3(!button3)}
              style={ button3 ? { backgroundColor: orangeColor, minHeight: 25, paddingLeft: 10, borderTopLeftRadius: 7,borderTopRightRadius:7, justifyContent: 'center' }:{ backgroundColor: orangeColor, minHeight: 25, paddingLeft: 10, borderRadius:7, justifyContent: 'center' }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Daha Detaylı Bilgilere Nereden Ulaşırım?</Text>
              {button3 ? (
                <Ionicons name="chevron-up" size={25} color="white" style={{ position: 'absolute', right: 10 }} />
              ) : (
                <Ionicons name="chevron-down" size={25} color="white" style={{ position: 'absolute', right: 10 }} />
              )}
            </TouchableOpacity>
            {button3 ? (
              <View style={{ minHeight: 150, paddingLeft: 10, borderBottomLeftRadius:7,borderBottomRightRadius:7, justifyContent: 'center',  padding: 10,backgroundColor:'#FFEAD2'  }}>
                <Text style={{ color: blueColor }}>
                https://www.hukukchat.com/ Web sayfası üzerinden bizimle ilgili daha detaylı sonuçlara ulaşabilirsiniz.
                </Text>
              </View>
            ) : null}
          </View>
          <View style={{ marginHorizontal: 0, backgroundColor: 'white', marginTop: 10, borderRadius: 8, padding: 10 }}>
            <TouchableOpacity
              onPress={() => setButton4(!button4)}
              style={ button3 ? { backgroundColor: orangeColor, minHeight: 25, paddingLeft: 10, borderTopLeftRadius: 7,borderTopRightRadius:7, justifyContent: 'center' }:{ backgroundColor: orangeColor, minHeight: 25, paddingLeft: 10, borderRadius:7, justifyContent: 'center' }}
            >
              <Text style={{ color: 'white', fontWeight: '600' }}>Webde Arama Nedir?</Text>
              {button4 ? (
                <Ionicons name="chevron-up" size={25} color="white" style={{ position: 'absolute', right: 10 }} />
              ) : (
                <Ionicons name="chevron-down" size={25} color="white" style={{ position: 'absolute', right: 10 }} />
              )}
            </TouchableOpacity>
            {button4 ? (
              <View style={{ minHeight: 150, paddingLeft: 10, borderBottomLeftRadius:7,borderBottomRightRadius:7, justifyContent: 'center',  padding: 10,backgroundColor:'#FFEAD2'  }}>
                <Text style={{ color: blueColor }}>
                Web üzerinden döküman arama özelliği, kullanıcıların internet üzerindeki çeşitli kaynaklardan hukuki dökümanları, makaleleri ve diğer ilgili içerikleri hızlı ve kolay bir şekilde bulmalarını sağlayan bir araçtır. Bu özellik sayesinde, hukuki konularla ilgili en güncel bilgilere ulaşabilir, araştırmalarınızı daha verimli bir şekilde yapabilirsiniz.
                </Text>
              </View>
            ) : null}
          </View>
          {/* Repeat this structure for additional sections as needed */}

        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default SSSModal;

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
            justifyContent: 'flex-start',
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