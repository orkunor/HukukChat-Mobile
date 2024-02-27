import React, { useState ,useEffect,useRef} from "react";
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
  TouchableOpacity,
  View,
} from "react-native";
import ChatItem from "./ChatItem";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatScreenMenuModal from "../modals/menuModals/ChatScreenMenuModal";
import { useDispatch } from "react-redux";
import { toggleChatScreenMenuVisible } from "../../../slices/modalSlices";

const Chat = ({navigation}) => {
  const [req, setReq] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch()
  const [data, setData] = useState([
               {
                 "title": "Merhaba, nasılsın?",
               },
               {
                 "title": "Ben de iyiyim, teşekkürler. Sana nasıl yardımcı olabilirim?",
               },
               {
                 "title": "Sana nasıl yardımcı olabilirim?"
               },
               {
                 "title": "Bana bugün hava nasıl?"
               }
               // Diğer sohbet öğeleri buraya eklenebilir
             ]);
  const flatListRef = useRef(data);


  const SendReq = () =>{
    const newData = [...data, { id: data.length + 1, title: req }];
    setData(newData)
   


    fetch('http://localhost:3000/',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        message:req
      })
    }) 
    .then(response => {
      // Sunucudan gelen yanıtı kontrol edin
      if (!response.ok) {
        throw new Error('Sunucu hatası: ' + response.status);
      }
      return response.json();
    })
    .then(veri => {
      newData.push({ id: newData.length + 1, title: veri.choices[0].message.content });
      setData(newData); 

    })
    .catch(error => {
      console.error('Bir hata oluştu:', error);
    })
    .catch(e => console.log(e))

    inputRef.current.clear(); // Clear the input value
    inputRef.current.blur();   
  }

  renderItem = ({ item, index }) => {
    return <ChatItem item={item} index={index}></ChatItem>;
  };

  return (
               
    <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
        hidden={true}
      />
      <ChatScreenMenuModal/>
      <View style={styles.bigContainer}>
        <View style={styles.headTextContainer}>
          <Text style={styles.headText}>HukukChat</Text>
          <TouchableOpacity style={{marginRight:5}} onPress={() => {
            dispatch(toggleChatScreenMenuVisible(true))
          }}>
          <Ionicons name="menu-outline" size={30} color={"white"}></Ionicons>

          </TouchableOpacity>

        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            style={styles.flatListContainer}
            ref={flatListRef}
            keyExtractor={(item) => item.id}
            extraData={data}

          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={req}
              onChangeText={(req) =>setReq(req)}
              placeholder="Bir şeyler sorun..."
              ref={inputRef}
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity style={styles.sendButton} onPress={SendReq}>
              <FontAwesome5 name="paper-plane" size={22} color="white" />
            </TouchableOpacity>
          </View> 
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  bigContainer: {
    flex: 1,
    backgroundColor:'orange'
  },
  headTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor:'white',
    height: 50,
    alignItems: "center",
  },
  headText: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
    marginLeft:25
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  flatListContainer: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopWidth: 2,
    borderColor:'white',
    height:75
  },
  textInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    borderColor:'white',
    backgroundColor:'white'
  }})