/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  View,
  StyleSheet,
  Modal,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Icone from 'react-native-vector-icons/MaterialIcons';
import SendIcon from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { setActiveMessage, sendMessage } from '../../store/modules/chat/action';
import ChatItem from '../../components/ChatItem';

import {
  Container,
  SendArea,
  MessageInput,
  Title,
  Description,
} from './styles';
import colors from '../../config/color';

export default function Chat({ navigation }) {
  const dispatch = useDispatch();
  const chatArea = useRef();

  const userId = useSelector(state => state.auth.id);

  const item = navigation.getParam('data');

  const messages = useSelector(state => state.chat.activeChatMessages);
  const uid = useSelector(state => state.auth.uid);
  const activeChat = useSelector(state => state.chat.activeChat);

  const [heigth, setHeigth] = useState(hp('7%'));
  const [messageText, setMessageText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);

  function timmerSpinner() {
    setTimeout(() => {
      setShowSpinner(!showSpinner);
    }, 5000);
  }

  useEffect(() => {
    timmerSpinner();
    const unsubscribe = firestore()
      .collection('chats')
      .doc(activeChat)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const allMessages = [];
        snapshot.forEach(doc => {
          allMessages.unshift({
            date: doc._data.date,
            time: doc._data.time,
            messageContent: doc._data.messageContent,
            uid: doc._data.uid,
            send: doc._data.send,
            read: doc._data.read,
          });
        });

        dispatch(setActiveMessage(allMessages));

        firestore()
          .collection('users')
          .doc(`${uid}`)
          .collection('chats')
          .doc(activeChat)
          .update({
            unReadMsg: 0,
          })
          .catch(err => console.tron.log(err));
          
        firestore()
          .collection('chats')
          .doc(activeChat)
          .collection('messages')
          .get()
          .then(doc => {
            doc.forEach(childItem => {
              if (
                childItem._data.uid !== uid &&
                childItem._data.read !== true
              ) {
                firestore()
                  .collection('chats')
                  .doc(activeChat)
                  .collection('messages')
                  .doc(childItem._data.id)
                  .update({
                    read: true,
                  });

                firestore()
                  .collection('users')
                  .doc(`${uid}`)
                  .collection('chats')
                  .doc(activeChat)
                  .update({
                    'lastMsg.read': true,
                  });

                firestore()
                  .collection('users')
                  .doc(`${item.uid}`)
                  .collection('chats')
                  .doc(activeChat)
                  .update({
                    'lastMsg.read': true,
                  });
              }
            });
          });
      });

    return () => unsubscribe();
  }, []);
  function sendMessageText() {
    if(messageText !== "") {
      dispatch(
        sendMessage(messageText, uid, activeChat, item.uid),
      );
      setMessageText('');
    }
  }

  return (
    <Container>
      <Modal animationType="slide" visible={modalVisible}>
        <View
          style={{
            height: wp('30%'),
            justifyContent: 'center',
            alignItems: 'flex-end',
            paddingRight: 10,
          }}>
          <TouchableOpacity
            hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
            onPress={() => setModalVisible(!modalVisible)}>
            <Icone name="close" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: `${item.animalPhoto}` }}
          style={{
            flex: 1,

            maxWidth: wp('100%'),
            maxHeight: hp('80%'),
          }}
          resizeMode="contain"
        />
      </Modal>
      {messages.length !== undefined && messages.length > 0 ? (
        <FlatList
          inverted
          ref={chatArea}
          data={messages}
          renderItem={({ item }) => (
            <ChatItem data={item} me={uid} />
          )}
          key={item => item.id}
          keyExtractor={item => item.id}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {showSpinner ? (
            <ActivityIndicator size="large" color= {colors.secondary}/>
          ) : (
            <View
              elevation={2}
              style={{
                backgroundColor: '#fff',
                height: hp('18%'),
                width: wp('85%'),
                alignSelf: 'center',
                alignContent: 'center',
                padding: wp('5%'),
                marginTop: hp('-50%'),
                borderRadius: 4,
              }}>
              <Title>Você está iniciando uma nova conversa!</Title>
              <Description>Digite sua mensagem abaixo</Description>
            </View>
          )}
        </View>
      )}

      <SendArea>
        <View
          style={{
            zIndex: -1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <MessageInput
            style={{
              marginRight: messageText !== '' ? -5 : 15.5,
              height: heigth,
            }}
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="send"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            iconBeforeSize={25}
            placeholder={'Escreva sua mensagem'}
          />
        </View>
          <TouchableOpacity
            style={{paddingRight: 20}}
            onPress={sendMessageText}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
            <SendIcon name="send" size={40}/>
          </TouchableOpacity>
      </SendArea>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: -5,
    top: -12,

    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
  purple: {
    backgroundColor: '#A51C60',
    opacity: 0.1,
    height: 22,
    width: 22,
    borderRadius: 44,
    position: 'absolute',
    top: -18,
    right: 0,
    bottom: 0,
    left: 334,
  },
  input: {
    marginLeft: 10,
    marginRight: -50,
    paddingRight: wp('10%'),
    height: hp('7%'),
  },
});