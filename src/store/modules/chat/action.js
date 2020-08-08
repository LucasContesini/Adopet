import firestore from '@react-native-firebase/firestore';


export const createChat = (
    animalId,
    animalName,
    animalPhoto,
    adopterUserId,
    adopterNickname,
    adopterUid,
    donorUserId,
    donorNickname,
    donorUid,
  ) => {
    return dispatch => {  
      const newChat = firestore()
        .collection('chats')
        .doc();
  
      newChat
        .collection('members')
        .doc(adopterUid)
        .set({ id: adopterUid });
  
      newChat
        .collection('members')
        .doc(donorUid)
        .set({ id: donorUid });
  
      const chatId = newChat.id;
  
      const data = {
        animalId,
        animalName,
        animalPhoto,
        adopterUserId,
        adopterNickname,
        adopterUid,
        donorUserId,
        donorNickname,
        donorUid,
        key: chatId,
      };
  
      firestore()
        .collection('users')
        .doc(`${adopterUid}`)
        .collection('chats')
        .doc(chatId)
        .set({
            animalId,
            animalName,
            animalPhoto,
            userId: donorUserId,
            nickname: donorNickname,
            uid: donorUid,
            id: chatId,
            unReadMsg: 0,
        })
        .catch(err => console.tron.log(err));
  
      firestore()
        .collection('users')
        .doc(`${donorUid}`)
        .collection('chats')
        .doc(chatId)
        .set({
            animalId,
            animalName,
            animalPhoto,
            userId: adopterUserId,
            nickname: adopterNickname,
            uid: adopterUid,
            id: chatId,
            unReadMsg: 0,
        })
        .catch(err => console.tron.log(err));

        dispatch(setActiveChat(chatId, data));
  };
}


export const setActiveChat = (chatId, data) => {
    return dispatch => {
      dispatch({
        type: '@chat/SET_ACTIVE_CHAT',
        payload: {
          chatId,
          data,
        },
      });
    };
  };

  export const clearActiveChat = () => {
    return dispatch => {
      dispatch({
        type: '@chat/CLEAR_ACTIVE_CHAT',
        payload: {},
      });
    };
  };

  export const signOutChat = () => {
    return dispatch => {
      dispatch({
        type: '@chat/SIGN_OUT',
        payload: {},
      });
    };
  };

  export const clearActiveMessage = () => {
    return dispatch => {
      dispatch({
        type: '@chat/CLEAR_ACTIVE_MESSAGE',
        payload: {},
      });
    };
  };
  
  export const setActiveMessage = allMessages => {
    return dispatch => {
      dispatch({
        type: '@chat/ACTIVE_CHAT_MESSAGES',
        payload: {
          allMessages,
        },
      });
    };
  };

  
  export const getListChat = uid => {
    console.tron.log(uid);
    return dispatch => {
      firestore()
        .collection('users')
        .doc(uid)
        .collection('chats')
        // .orderBy('lastMsgTime', 'desc')
        .onSnapshot(snapshot => {  
            const chats = [];
            snapshot.forEach(doc => {
              chats.push({
                key: doc._data.id,
                animalId: doc._data.animalId,
                animalName: doc._data.animalName,
                animalPhoto: doc._data.animalPhoto,
                userId: doc._data.userId,
                uid: doc._data.uid,
                nickname: doc._data.nickname,
                unReadMsg: doc._data.unReadMsg,
                lastMsg: doc._data.lastMsg,
              });
            });
  
            dispatch({
              type: '@chat/GET_LIST_CHAT_SUCCESS',
              payload: {
                chats,
              },
            });
        });
    };
  };

  export const sendMessage = (
    messageContent,
    uid,
    activeChat,
    uid2,
  ) => {
    return dispatch => {
      const currentDate = new Date();
      const date = `${currentDate.getDate()}/${currentDate.getMonth() +
        1}/${currentDate.getFullYear()}`;
  
      let hours = `${currentDate.getHours()}`;
  
      if (hours < 10) {
        hours = `0${hours}`;
      } else {
        hours = `${hours} `;
      }
  
      let minutes = `${currentDate.getMinutes()}`;
  
      if (minutes < 10) {
        minutes = `0${minutes}`;
      } else {
        minutes = `${minutes} `;
      }
  
      const time = `${hours}:${minutes}`;
  
      const messageId = firestore()
        .collection('chats')
        .doc(activeChat)
        .collection('messages')
        .doc();
  
      // Ultima mensagem para usuario 1
  
      const lastMsg1 = firestore()
        .collection('users')
        .doc(`${uid}`)
        .collection('chats')
        .doc(activeChat);
  
      // Ultima mensagem para usuario 2
  
      const lastMsg2 = firestore()
        .collection('users')
        .doc(`${uid2}`)
        .collection('chats')
        .doc(activeChat);
  
      const unReadMessage = firestore()
        .collection('users')
        .doc(`${uid2}`)
        .collection('chats')
        .doc(activeChat);
  
      firestore()
        .collection('users')
        .doc(`${uid2}`)
        .collection('chats')
        .doc(activeChat)
        .get()
        .then(doc => {
          let qtdUnreadMsgOld = doc._data.unReadMsg;
          const qtdUnreadMsgActual = ++qtdUnreadMsgOld;
          unReadMessage.update({
            unReadMsg: qtdUnreadMsgActual,
          });
        });

        messageId.set({
          id: messageId.id,
          date,
          time,
          messageContent,
          uid,
          send: true,
          read: false,
          createdAt: firestore.Timestamp.now(),
        });

        lastMsg1.update({
          lastMsg: {
            id: lastMsg1.id,
            date,
            time,
            messageContent,
            uid,
            send: true,
            read: false,
            createdAt: firestore.Timestamp.now(),
          },
        });

        lastMsg1.update({
          lastMsgTime: firestore.Timestamp.now(),
        });

        lastMsg2.update({
          lastMsg: {
            id: lastMsg2.id,
            date,
            time,
            messageContent,
            uid,
            send: true,
            read: false,
            createdAt: firestore.Timestamp.now(),
          },
        });

        lastMsg2.update({
          lastMsgTime: firestore.Timestamp.now(),
        });
    };
  };