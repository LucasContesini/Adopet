/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import ParsedText from 'react-native-parsed-text';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StyleSheet,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Message,
  MessageImage,
  DurationView,
  DurationText,
  MessageDetailsText,
  CheckMessageSend,
  MessageDetails,
  HistoryCall,
  HistoryCallView,
} from './styles';

export default function ChatItem({ data, me }) {

  const WWW_URL_PATTERN = /^www\./i;

  function onUrlPress(url) {
    // When someone sends a message that includes a website address beginning with "www." (omitting the scheme),
    // react-native-parsed-text recognizes it as a valid url, but Linking fails to open due to the missing scheme.
    if (WWW_URL_PATTERN.test(url)) {
      onUrlPress(`http://${url}`);
    } else {
      Linking.canOpenURL(url).then(supported => {
        if (!supported) {
          console.error('No handler for URL:', url);
        } else {
          Linking.openURL(url);
        }
      });
    }
  }

  function onTelCall(phone) {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }
    Linking.openURL(phoneNumber);
  }

  return (
    <Container background={data.uid} me={me} type={data.messageType}>
      <View>
        <ParsedText
          selectable
          alignText={data.uid}
          parse={[
            {
              type: 'url',
              style: styles.url,
              onPress: onUrlPress,
            },
            { type: 'phone', style: styles.url, onPress: onTelCall },
            // { type: 'email', style: linkStyle, onPress: this.onEmailPress },
          ]}
          childrenProps={{ allowFontScaling: false }}>
          {data.messageContent}
        </ParsedText>

        <View>
          <MessageDetails>
            <MessageDetailsText alignText={data.uid}>
              {data.date} - {data.time}
            </MessageDetailsText>
            <CheckMessageSend>
              {data.read ? (
                <Icon name="done-all" size={15} color="#00bfff" />
              ) : (
                <Icon name="done-all" size={15} color="#7d7d7d" />
              )}
            </CheckMessageSend>
          </MessageDetails>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  url: {
    color: '#00bfff',
    textDecorationLine: 'underline',
  },

  email: {
    textDecorationLine: 'underline',
  },

  text: {
    color: 'black',
    fontSize: 15,
  },

  phone: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  name: {
    color: 'red',
  },

  username: {
    color: 'green',
    fontWeight: 'bold',
  },

  magicNumber: {
    fontSize: 42,
    color: 'pink',
  },

  hashTag: {
    fontStyle: 'italic',
  },
});
