import React, { useState, useEffect, useRef } from "react";
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

import EventSource, { EventSourceListener } from "react-native-sse";
import "react-native-url-polyfill/auto";

import ChatItem from "./ChatItem";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChatScreenMenuModal from "../modals/menuModals/ChatScreenMenuModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleChatScreenMenuVisible } from "../../../slices/modalSlices";
import AccountSettingsModal from "../modals/AccountSettingsModal/AccountSettingsModal";
import { Flow } from 'react-native-animated-spinkit';
import { blueColor, greyColor, orangeColor } from "../../../statics/color";
import { selectSignIn } from "../../../slices/authSlices";

const Chat = ({ navigation }) => {
  const [req, setReq] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch()
  const [messageWaiting, setMessageWaiting] = useState(false)
  const selectUserToken = useSelector(selectSignIn)
  const [data, setData] = useState([
     ]);

  



let accumulatedData = ''; // Accumulate chunks into a single string


const handleResetChatHistory = () => {

  fetch('https://api.hukukchat.com/reset_session', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${selectUserToken}`,
  },
})
.then(response => response.json())
.then(data =>{
  if (data.status === 'success') {
    console.log('Session reset successfully');
    setData([])
  }else{
    console.log(data)
    setData([])

  }

})
.catch(error => console.error('Hata:', error));
  
}

  const send = () => {
    setMessageWaiting(true)
    const myrequest = {title: req}
    setData(prevData => [...prevData, myrequest]);
    setReq('')

    const eventSource = new EventSource('https://api.hukukchat.com/generate_response/', {
      headers: {
        'Authorization': `Bearer ${selectUserToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_question: req,  
        selected_model: "gpt-4",
        selected_law_area: "Genel Hukuk"
      }),
      method: 'POST'
    });
  
    eventSource.addEventListener("message", (event) => {
      try {
        const chunk = JSON.parse(event.data);
        console.log(chunk)
        accumulatedData += chunk.text
        const newChatItem = { title: accumulatedData }; 
        
        if(chunk.text == null){
          setData(prevData => [...prevData, newChatItem]);
          accumulatedData=''
          setMessageWaiting(false)
          return eventSource.close();
          }

       /*const lastNewlineIndex = accumulatedData.lastIndexOf('\n');
        if (lastNewlineIndex !== -1) {
          const responseData = JSON.parse(accumulatedData.slice(lastNewlineIndex + 1));
          const newChatItem = { title: responseData.text }; // Assuming responseData has a text field
          setData(prevData => [...prevData, newChatItem]);
          accumulatedData = accumulatedData.slice(0, lastNewlineIndex + 1); // Reset accumulatedData to the remaining chunk
        }*/

      } catch (error) {
        console.error("Error parsing JSON data:", error);
        setMessageWaiting(false)

      }

    });
  
    eventSource.addEventListener("error", (event) => {
      if (event.type === "error") {
        console.error("Connection error:", event.message);
        setMessageWaiting(false)

      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
        setMessageWaiting(false)

      }
    });
  
    return () => {
      eventSource.close();
    };
  }
   
  
  const renderItem = ({ item, index }) => {
    return <ChatItem item={item} index={index}></ChatItem>;
  };

  return (
    <SafeAreaView style={{ flex: 1, margin: 0 }}>
      <ChatScreenMenuModal />
      <StatusBar hidden={true} />
      <View style={styles.bigContainer}>
        <View style={styles.headTextContainer}>
          <Text style={styles.headText}>HukukChat</Text>
          <View style={{flexDirection:'row'}}>

          <TouchableOpacity style={{ marginRight: 5 }} onPress={handleResetChatHistory}>
            <Ionicons name="add-circle-outline" size={27} color={"#193353"}></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 5 }} onPress={() => {
            dispatch(toggleChatScreenMenuVisible(true))
          }}>
            
            <Ionicons name="grid-outline" size={25} color={"#193353"}></Ionicons>
          </TouchableOpacity>
          </View>

        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={data}
            renderItem={renderItem}
            style={styles.flatListContainer}
            extraData={data}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={req}
              onChangeText={(text) => setReq(text)}
              placeholder="Bir şeyler sorun..."
              ref={inputRef}
              placeholderTextColor={'#D77A25'}
            />
            {messageWaiting ?
              <View style={{ height: 25, width: 25, justifyContent: 'center', alignItems: 'center' }}>
                <Flow size={25} color={blueColor} />
              </View>
              :
              <TouchableOpacity style={styles.sendButton} onPress={send}>
                <FontAwesome5 name="paper-plane" size={22} color="#193353" />
              </TouchableOpacity>
            }
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
    backgroundColor:'white'
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
    color: "#D77A25",
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
    borderColor:'#D77A25',
    backgroundColor:'white'
  },
  sendButton:{

    height:25,width:25
  }

})