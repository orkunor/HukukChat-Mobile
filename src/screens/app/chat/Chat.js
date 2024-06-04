import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  FlatList,
  Image,
  ProgressViewIOSBase,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
  AppState,
  Keyboard,
} from 'react-native';

import EventSource, {EventSourceListener} from 'react-native-sse';
import 'react-native-url-polyfill/auto';

import ChatItem from './ChatItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatScreenMenuModal from '../modals/menuModals/ChatScreenMenuModal';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectCounter,
  selectIsChatHistoryModalVisible,
  selectIsWarningFuncVisible,
  setCounter,
  toggleChatHistoryModalVisible,
  toggleChatScreenMenuVisible,
  toggleLoginAgainModalVisible,
  toggleServerErrorModalVisible,
  toggleWarningFuncVisible,
} from '../../../slices/modalSlices';
import {Swing} from 'react-native-animated-spinkit';
import {blueColor, greyColor, orangeColor} from '../../../statics/color';
import {selectSignIn} from '../../../slices/authSlices';
import ServerErrorModal from '../modals/Warnings/ServerErrorModal';
import {selectUserName} from '../../../slices/userSlices';
import WarningFunc from '../modals/Warnings/WarningFunc';
import ChatHistoryModal from '../modals/ChatHistoryModal/ChatHistoryModal';
import {
  selectChatHistory,
  selectSessionToken,
  selectWarningButtonText,
  selectWarningText,
  setChatHistory,
  setSessionToken,
} from '../../../slices/chatSlices';
import LoginAgainModal from '../modals/Warnings/LoginAgainModal';

const Chat = ({navigation}) => {
  const [req, setReq] = useState('');
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const [messageWaiting, setMessageWaiting] = useState(false);
  const selectUserToken = useSelector(selectSignIn);
  const [message, setMessage] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [userData, setUserData] = useState();
  const [textId, setTextId] = useState(0);
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);
  const [index, setIndex] = useState(0);
  const [editButtonDisable, setEdditButtonDisable] = useState(true);
  const [session_id, set_session_id] = useState('');
  const [userDataOneTime, setUserDataOneTime] = useState(false);
  let counter = useSelector(selectCounter);
  let sessionToken = useSelector(selectSessionToken);

  const warningText = useSelector(selectWarningText);
  const warningButtonText = useSelector(selectWarningButtonText);

  const [data, setData] = useState([
    {
      title: 'Merhabalar ben Hukuk Chat size nasıl yardımcı olabilirim?null',
      owner: 'Ai',
      index: index,
    },
  ]);
  const selectUserId = useSelector(selectUserName);
  const dataFromChatHistory = useSelector(selectChatHistory);
  let selectChatHistoryVisible = useSelector(selectIsChatHistoryModalVisible);

  useEffect(() => {
    if (data.length > 1) {
      setEdditButtonDisable(false);
    } else {
      setEdditButtonDisable(true);
    }
  }, [data]);
  const from_chat_history = dataFromChatHistory => {
    const inputData = [dataFromChatHistory];

    // Eğer inputData boşsa veya bir array değilse, bir uyarı mesajı yazdır
    if (!Array.isArray(inputData) || inputData.length === 0) {
      console.log('Girdi verisi boş veya geçersiz.');
      return;
    }

    // Dönüştürülen veriyi saklamak için boş bir liste oluşturun
    let outputData = [];

    // Mesajları takip etmek için bir index sayacı oluşturun
    let indexCounter = 0;

    // Veriyi işlemek
    inputData.forEach(session => {
      // Oturumun undefined olup olmadığını kontrol et
      if (session === undefined) {
        console.log('Oturum verisi undefined.');
        return;
      }

      // Kullanıcı ve asistan mesajlarını ayrı listelere ekleyin
      let userMessages = [];
      let assistantMessages = [];

      // Kullanıcı mesajlarının var olup olmadığını kontrol et ve ekle
      if (session.user_messages && session.user_messages.length > 0) {
        session.user_messages.forEach(userMessage => {
          userMessages.push({
            index: indexCounter,
            owner: 'me',
            title: userMessage,
          });
          indexCounter++;
        });
      }

      // Asistan mesajlarının var olup olmadığını kontrol et ve ekle
      if (session.assistant_messages && session.assistant_messages.length > 0) {
        session.assistant_messages.forEach(assistantMessage => {
          assistantMessages.push({
            index: indexCounter,
            owner: 'Ai',
            title: assistantMessage,
          });
          indexCounter++;
        });
      }

      // Kullanıcı ve asistan mesajlarını dönüşümlü olarak outputData'ya ekle
      const maxLength = Math.max(userMessages.length, assistantMessages.length);
      for (let i = 0; i < maxLength; i++) {
        if (i < userMessages.length) {
          outputData.push(userMessages[i]);
        }
        if (i < assistantMessages.length) {
          outputData.push(assistantMessages[i]);
        }
      }
    });

    if (outputData.length > 0) {
      setData(outputData);
    }
  };



  useEffect(() => {
    
    if (dataFromChatHistory && dataFromChatHistory.session_id != undefined){
      from_chat_history(dataFromChatHistory);
      set_session_id(dataFromChatHistory.session_id);
      console.log(dataFromChatHistory)
    }
  }, [counter]);


  useEffect(() => {
    if(userData){
      handleResetChatHistory();
    }
    
  },[])

  const flatListRef = useRef(null); // Ref'i tanımla

  // Diğer kodlar...

  useEffect(() => {
    // FlatList'e her güncelleme yapıldığında en altına kaydır
    flatListRef.current.scrollToEnd({animated: true});
  }, [data]); // data state'i değiştiğinde useEffect'i tetikle

  let accumulatedData = ''; // Accumulate chunks into a single string

  const fetchSubscriptionPlans = () => {
    fetch('https://api.hukukchat.com/get_user_details/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${selectUserToken}`,
      },
    })
      .then(response => {
        if (response.ok){
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        setUserData(data);
        setUserDataOneTime(true);
      })
      .catch(error => {});
  };

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  useEffect(() => {
      if (userData) {
      const updateSession = async () => {
        const url = 'https://api.hukukchat.com/update_session/';
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        
        const body = JSON.stringify({
          session_id: session_id,
          user_id: userData.user_name,
        });

        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
          });

          
          const data = await response.json();
        } catch (error) {
        }
      };
      updateSession();
    }
  }, [session_id]);

  useEffect(() => {
    if (userData) {
      if (userData.subscription.mobile_credits <= 1) {
        setMessage('Krediniz tükendi lütfen bir plan seçip kredi yükleyiniz!');
        setButtonText('Tamam');
        setSendButtonDisabled(true);
        dispatch(toggleWarningFuncVisible(true));
      }
    }
  }, [userData]);

  useEffect(() => {
    setMessage(warningText);
    setButtonText(warningButtonText);
  }, [warningText, warningButtonText, selectIsWarningFuncVisible]);

  const updateDataAtLastIndex = newData => {
    setData(prevData => {
      // Eğer veri dizisi boşsa, hiçbir güncelleme yapma
      if (prevData.length === 0) {
        return prevData;
      }
      // Önceki veri dizisinin bir kopyasını oluştur
      const updatedData = [...prevData];
      // Son indeksi al
      const lastIndex = updatedData.length - 1;
      // Son indeksteki veriyi güncelle
      updatedData[lastIndex] = newData;
      // Güncellenmiş veriyi state'e kaydet
      return updatedData;
    });
  };

  useEffect(() => {


handleResetChatHistory()

  },[userDataOneTime])
  const handleResetChatHistory = () => {
    if (userData) {
      fetch('https://api.hukukchat.com/reset_session/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.user_name,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            dispatch(setSessionToken(''));
            set_session_id('');
            setData([
              {
                title:
                  'Merhabalar ben Hukuk Chat size nasıl yardımcı olabilirim?null',
                owner: 'Ai',
                index: index,
              },
            ]);
          } else {
            dispatch(toggleServerErrorModalVisible(true));
          }
        })
        .catch(error => {
          console.log('Hata:', error);
          dispatch(toggleServerErrorModalVisible(true));
          setData([
            {
              title:
                'Merhabalar ben Hukuk Chat size nasıl yardımcı olabilirim?null',
              owner: 'Ai',
              index: index,
            },
          ]);
        });
    }
  };

  
  useEffect(() => {
    if (req.trim().length === 0) {
      setSendButtonDisabled(true);
    } else {
      setSendButtonDisabled(false);
    }
  }, [req]);

  const send = () => {
    setSendButtonDisabled(true);
    fetchSubscriptionPlans();
    const myrequest = {title: req, owner: 'me'};
    setReq('');
    console.log("session_id :"  ,session_id)
    setData(prevData => [...prevData, myrequest]);

    const loading = {
      title: 'loading',
      owner: 'Ai',
      index: index + 1,
    };
    setData(prevData => [...prevData, loading]);

    Keyboard.dismiss();
    flatListRef.current.scrollToEnd({animated: true});

    const eventSource = new EventSource(
      'https://api.hukukchat.com/generate_mobile_response/',
      {
        headers: {
          Authorization: `Bearer ${selectUserToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_question: req,
          selected_model: 'gpt-4',
          selected_law_area: 'Genel Hukuk',
          session_id: session_id,
        }),
        method: 'POST',
      },
    );

    eventSource.addEventListener('message', event => {
      try {
        const chunk = JSON.parse(event.data);
        accumulatedData += chunk.text;
        const newChatItem = {
          title: accumulatedData,
          owner: 'Ai',
          index: index + 1,
        };

        if (chunk.text === null) {
          accumulatedData = '';
          setMessageWaiting(false);
          setSendButtonDisabled(false);
          return eventSource.close();
        }

        updateDataAtLastIndex(newChatItem);
      } catch (error) {
        setMessageWaiting(false);
        dispatch(toggleServerErrorModalVisible(true));
        setSendButtonDisabled(false);
        return eventSource.close();
      }
    });

    eventSource.addEventListener('error', event => {
      let errorMessage = JSON.parse(event.message);
      if (
        errorMessage.message ==
        'An error occurred: Doğrulama süresi doldu. Lütfen tekrar giriş yapın.'
      ) {
       
        setMessageWaiting(false);
        dispatch(toggleLoginAgainModalVisible(true));
        setSendButtonDisabled(false);
        return eventSource.close();
      } else if (event.type === 'error') {
        setMessageWaiting(false);
        dispatch(toggleServerErrorModalVisible(true));
        setSendButtonDisabled(false);
        return eventSource.close();
      } else if (event.type === 'exception') {
        setMessageWaiting(false);
        setSendButtonDisabled(false);
        return eventSource.close();
      }
    });
    

    return () => {
      eventSource.close();
    };
  };

  const renderItem = ({item, index}) => {
    return <ChatItem item={item} index={index}></ChatItem>;
  };

  return (
    <SafeAreaView style={{flex: 1, margin: 0}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        <ChatHistoryModal />
        <ChatScreenMenuModal />
        <ServerErrorModal />
        <LoginAgainModal/>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <WarningFunc message={message} button={buttonText} />
        <View style={styles.bigContainer}>
          <View style={styles.headTextContainer}>
            <View style={styles.headLeftContainer}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(toggleChatHistoryModalVisible(true));
                  dispatch(setCounter(counter + 1));
                  dispatch(setChatHistory(data));
                }}>
                <Ionicons
                  name="albums-outline"
                  size={27}
                  color={orangeColor}></Ionicons>
              </TouchableOpacity>
              <Text style={styles.headText}>HukukChat</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                disabled={editButtonDisable}
                style={{marginRight: 5}}
                onPress={handleResetChatHistory}>
                <FontAwesome5
                  name="edit"
                  size={22}
                  color={
                    editButtonDisable == true ? '#DCDCDC' : '#193353'
                  }></FontAwesome5>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: 5}}
                onPress={() => {
                  dispatch(toggleChatScreenMenuVisible(true));
                }}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={25}
                  color={'#193353'}></Ionicons>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <FlatList
              ref={flatListRef}
              data={data}
              renderItem={renderItem}
              style={styles.flatListContainer}
              extraData={data}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={req}
                onChangeText={text => setReq(text)}
                placeholder="Bir şeyler sorun..."
                ref={inputRef}
                placeholderTextColor={'#D77A25'}
              />
              {messageWaiting ? (
                <View
                  style={{
                    height: 25,
                    width: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Swing size={25} color={blueColor} />
                </View>
              ) : (
                <TouchableOpacity
                  disabled={sendButtonDisabled}
                  style={styles.sendButton}
                  onPress={send}>
                  <FontAwesome5
                    name="paper-plane"
                    size={22}
                    color={sendButtonDisabled == true ? '#DCDCDC' : '#193353'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: 'white',
    height: 50,
    alignItems: 'center',
  },
  headText: {
    fontSize: 25,
    fontWeight: '500',
    color: blueColor,
    marginLeft: 15,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flatListContainer: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 2,
    borderColor: 'white',

    height: 75,
  },
  textInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    paddingHorizontal: 10,
    marginRight: 10,
    borderColor: '#D77A25',
    backgroundColor: 'white',
  },
  sendButton: {
    height: 25,
    width: 25,
  },
  headLeftContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});
