/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import { View, FlatList, Text, Image, SafeAreaView, Alert } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  getListChat,
  setActiveChat,
  clearActiveChat,
  clearActiveMessage,
} from '../../store/modules/chat/action';

import ChatListItem from '../../components/ChatListItem';

export default function ChatList({ navigation, isMessage }) {
  const dispatch = useDispatch();

  const chats = useSelector(state => state.chat.chats);
  const uid = useSelector(state => state.auth.uid);

  useEffect(() => {
    navigation.addListener('didFocus', () => {
      dispatch(clearActiveChat(''));
      dispatch(clearActiveMessage(''));
    });
  }, []);

  function handleChat(data) {
    dispatch(setActiveChat(data.key, data));
  }

  if (chats === '') {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
          width: wp('80%'),
        }}>
        <View>
        </View>
        <Text
          style={{
            marginTop: hp('7%'),
            fontFamily: 'Avenir Next',
            textAlign: 'center',
            fontSize: hp('2.7%'),
            color: '#958FA3',
          }}
        />
      </View>
    );
  }

  if (isMessage && chats.length === 0) {
    return (
      <Text
        style={{
          color: '#958FA3',
          fontSize: RFValue(12, 580),
          marginTop: 20,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        Você não possui nenhum registro de mensagem.
      </Text>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={ chats }
        renderItem={({ item }) => (
          <ChatListItem data={item} onPress={handleChat} />
        )}
      />
    </SafeAreaView>
  );
}