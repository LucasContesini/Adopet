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

import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import Icone from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import ImageResizer from 'react-native-image-resizer';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import VComm from '../../services/vcomm';

import SendingAudio from './ChatAudio';

import { getProfileByUserId } from '../../store/modules/profile/actions';

import { availableButtons } from '../../store/modules/commons/actions';

import ChatItem from '../../components/ChatItem';
import {
  setActiveCallData,
  getParticipantTyping,
  setTyping,
  setActiveMessage,
  realtimeToFirestoreMessages,
  sendMessage,
  setCallOFF,
  setCallON,
} from '../../store/modules/chat/actions';

import send from '../../assets/icon-send-text.png';
import {
  Container,
  SendArea,
  MessageInput,
  Icon,
  Title,
  Description,
} from './styles';

export default function Chat({ navigation }) {
  const dispatch = useDispatch();
  const chatArea = useRef();
  const vcomm = VComm.getInstance();

  const callerId = useSelector(state => state.auth.profile.userId);
  const inCall = useSelector(state => state.chat.inCall);

  const item = navigation.getParam('data');

  function handleCall() {
    if (inCall) return;

    vcomm.makeCall(item.userId, item.name, false);

    const calldata = {
      profile: {
        name: item.name,
        photoUrl: item.photoUrl,
        userId: item.userId,
      },
    };
    dispatch(setActiveCallData(calldata));
  }

  function handleVideoCall() {
    if (inCall) return;

    vcomm.makeCall(item.userId, item.name, true);

    const calldata = {
      profile: {
        name: item.name,
        photoUrl: item.photoUrl,
        userId: item.userId,
      },
    };
    dispatch(setActiveCallData(calldata));
  }

  const onCallStatusChanged = status => {
    switch (status) {
      case VComm.CallStatus.Iddle:
      case VComm.CallStatus.Failed:
        dispatch(setCallOFF());
        break;

      case VComm.CallStatus.Calling:
      case VComm.CallStatus.InCall:
        dispatch(setCallON());
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    vcomm.on(VComm.Events.CallStatus, onCallStatusChanged);

    return () => {
      vcomm.off(VComm.Events.CallStatus, onCallStatusChanged);
    };
  }, []);

  useEffect(() => {
    navigation.setParams({
      videocall: handleVideoCall,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inCall]);

  useEffect(() => {
    navigation.setParams({
      call: handleCall,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inCall]);

  const translateX = new Animated.Value(0);

  const messages = useSelector(state => state.chat.activeChatMessages);
  const uid = useSelector(state => state.auth.profile.uId);
  const activeChat = useSelector(state => state.chat.activeChat);

  const [heigth, setHeigth] = useState(hp('7%'));
  const [messageText, setMessageText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [showSpinner, setShowSpinner] = useState(true);

  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);

  const animatedStyle = {
    transform: [
      {
        translateX: translateX.interpolate({
          inputRange: [-100, 0, 0],
          outputRange: [-100, 0, 0],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setDuration(seconds => seconds + 500);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isRecording]);

  if (messageText.length > 0) {
    dispatch(setTyping(item.uid, activeChat, true));
  } else {
    dispatch(setTyping(item.uid, activeChat, false));
  }

  function timmerSpinner() {
    setTimeout(() => {
      setShowSpinner(!showSpinner);
    }, 5000);
  }

  function showProfileProfessional() {
    dispatch(availableButtons(false));
    dispatch(getProfileByUserId(item.userId, callerId));
  }

  function resetAudioTimeAndRecording() {
    setIsRecording(false);
    setDuration(0);
  }

  function sendAudio(blob) {
    resetAudioTimeAndRecording();

    dispatch(
      sendMessage(
        'audio',
        '',
        uid,
        activeChat,
        item.uid,
        item.userId,
        blob,
        duration,
      ),
    );
  }

  useEffect(() => {
    dispatch(getParticipantTyping(uid, activeChat));
  }, []);

  useEffect(() => {
    timmerSpinner();
    const unsubscribe = firestore()
      .collection('chats')
      .doc(activeChat)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const allMessages = [];
        if (snapshot.empty) {
          dispatch(realtimeToFirestoreMessages(activeChat, uid));
        }
        snapshot.forEach(doc => {
          switch (doc._data.messageType) {
            case 'text':
              allMessages.unshift({
                date: doc._data.date,
                time: doc._data.time,
                messageContent: doc._data.messageContent,
                uid: doc._data.uid,
                messageType: 'text',
                send: doc._data.send,
                read: doc._data.read,
              });
              break;
            case 'audio':
              allMessages.unshift({
                date: doc._data.date,
                time: doc._data.time,
                audioSource: doc._data.audioSource,
                uid: doc._data.uid,
                messageType: 'audio',
                send: doc._data.send,
                read: doc._data.read,
                duration: doc._data.duration,
              });
              break;
            case 'image':
              allMessages.unshift({
                date: doc._data.date,
                time: doc._data.time,
                imageSource: doc._data.imgSource,
                uid: doc._data.uid,
                messageType: 'image',
                send: doc._data.send,
                read: doc._data.read,
              });
              break;
            case 'canceledCall':
              allMessages.unshift({
                date: doc._data.date,
                time: doc._data.time,
                messageContent: doc._data.messageContent,
                uid: doc._data.uid,
                messageType: 'canceledCall',
                send: doc._data.send,
                read: doc._data.read,
              });
              break;
            default:
              break;
          }
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
          .collection('users')
          .doc(`${item.uid}`)
          .get()
          .then(doc => {
            const { available } = doc._data;
            dispatch({
              type: '@chat/STATUS_PROFESSIONAL_ACTIVE_CHAT',
              payload: {
                available,
              },
            });
          });

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

  useEffect(() => {
    navigation.setParams({
      showProfile: showProfileProfessional,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendMessageText() {
    dispatch(
      sendMessage('text', messageText, uid, activeChat, item.uid, item.userId),
    );
    setMessageText('');
  }

  function chooseImage() {
    const options = {
      title: 'Selecione uma imagem',
      takePhotoButtonTitle: 'Tirar uma Foto',
      chooseFromLibraryButtonTitle: 'Escolher da Galeria',
      quality: 1,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('ImagePicker Custom: ', response.error);
      } else {
        const { originalRotation, error } = response;

        let rotation = 0;

        if (response.uri && !error) {
          rotation = 0;

          if (originalRotation === 90) {
            rotation = 90;
          } else if (originalRotation === 270) {
            rotation = -90;
          }
        }

        ImageResizer.createResizedImage(
          response.uri,
          1280,
          720,
          'JPEG',
          100,
          rotation,
        ).then(({ uri }) => {
          const uriResize = uri.replace('file://', '');
          RNFetchBlob.fs.readFile(uriResize, 'base64').then(data => {
            return RNFetchBlob.polyfill.Blob.build(data, {
              type: 'image/jpeg;BASE64',
            }).then(blob => {
              dispatch(
                sendMessage(
                  'image',
                  '',
                  uid,
                  activeChat,
                  item.uid,
                  item.userId,
                  blob,
                ),
              );
            });
          });
        });
      }
    });
  }

  function imagePress(img) {
    setImageUri(img);
    setModalVisible(true);
  }

  return (
    <Container>
      <Modal animationType="slide" visible={modalVisible} style={{}}>
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
            <Icone name="close" size={32} color="#A51C60" />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: `${imageUri}` }}
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
            <ChatItem data={item} me={uid} onImagePress={imagePress} />
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
            <ActivityIndicator size="large" color="#A51C60" />
          ) : (
            <View
              elevation={2}
              style={{
                backgroundColor: '#fff',
                height: hp('18%'),
                width: wp('85%'),
                // justifyContent: 'center',
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

            // paddingRight: wp('65%'),
          }}>
          <MessageInput
            style={{
              marginRight: messageText !== '' ? -10 : 60.5,
              height: heigth,
            }}
            autoCapitalize="sentences"
            autoCorrect={false}
            returnKeyType="send"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            iconBefore={isRecording && 'mic'}
            iconBeforeSize={25}
            placeholder={
              isRecording
                ? `${format(duration, 'm:ss')}`
                : 'Escreva sua mensagem'
            }
            isRecording={isRecording}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Button
              hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
              icon={
                !isRecording && (
                  <Icone
                    name="photo-camera"
                    size={hp('3.5%')}
                    color="#958FA3"
                  />
                )
              }
              onPress={chooseImage}
              buttonStyle={{
                position: 'absolute',
                left: messageText ? -40 : -110,
                bottom: -22,
                backgroundColor: 'transparent',
              }}
            />
          </View>
        </View>
        {messageText ? (
          <TouchableOpacity
            onPress={sendMessageText}
            hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
            <Icon source={send} />
          </TouchableOpacity>
        ) : (
          <Animated.View style={[styles.button, animatedStyle]}>
            <SendingAudio
              sendAudio={sendAudio}
              setSendingAudioRecord={setIsRecording}
              sendingAudioRecord={isRecording}
              resetAudioTimeAndRecording={resetAudioTimeAndRecording}
              duration={duration}
            />
          </Animated.View>
        )}
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