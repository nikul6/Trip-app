import React, { useEffect, useState } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CustomKeyboardView from '../components/CustomKeyboardView';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { getRoomIdD } from '../coomon/common';

type ChatRoomScreenProps = NativeStackScreenProps<RootStackParamList, "ChatRoom">

export default function ChatRoom({route}: ChatRoomScreenProps) {
    const {id, name} = route.params;
    // console.log(" id", id )
    const user = useSelector((state: RootState) => state.auth.user);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    try {
            let roomId = getRoomIdD(user?.uid, id);
            console.log(" id12121 ", )
            const docRed = doc(db, "room", roomId);
            const messageRef = collection(docRed, "messages");
            const newDoc = await addDoc(messageRef,{
              useid: user?.uid,
              text: message,
              senderName: user?.email,
              craeteDAT: Timestamp.fromDate(new Date())
            })
            
            console.log(" id ", docRed.id)
    } catch (error) {
        console.log("error ", error)
    }
    
  };

  const createRoomIfNotExist = async () => {
    let roomID = getRoomIdD(user?.uid, id);
    await setDoc(doc(db, "room", roomID), {
      roomID,
        createdAttt: Timestamp.fromDate(new Date())
      });
}

  useEffect(()=>{
    createRoomIfNotExist();
  },[])

//   const renderItem = ({ item }) => (
//     <View style={styles.message}>
//       <Text>{item.text}</Text>
//     </View>
//   );

  return (
        <CustomKeyboardView>
        <View style={styles.inner}>
          {/* <FlatList
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.messageList}
          /> */}
          <View style={{flex:10}}>
            <Text>hi</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Type a message"
              style={styles.textInput}
              value={message}
              onChangeText={setMessage}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
        </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    flex:1
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
