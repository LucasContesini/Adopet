/* eslint-disable react/prop-types */
import React from 'react';
import { View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Avatar,
  Infos,
  Name,
  Especialty,
  Rating,
  Value,
  Left,
  Professional,
  Right,
  Badge,
  BadgeText,
  Time,
  LastMsgText,
  LastMsgView,
} from './styles';

export default function ChatListItem({ data, onPress }) {
  function handleClick() {
    onPress(data);
  }

  const dim = Dimensions.get('window');

  return (
    <Container onPress={handleClick}>
      <Professional>
        <Left>
          <Avatar
            source={{
              uri: `${data.animalPhoto}`,
            }}
          />
          <Infos>
            <Name numberOfLines={1}>{data.animalName}</Name>
              <View style={{ flexDirection: 'row' }}>
                {data?.lastMsg?.read ? (
                  <Icon name="done-all" size={20} color="#00bfff" />
                ) : (
                  <Icon name="done-all" size={20} color="#7d7d7d" />
                )}
                <LastMsgText numberOfLines={2}>
                  {data?.lastMsg?.messageContent
                    ? data.lastMsg.messageContent
                    : ''}
                </LastMsgText>
              </View>
          </Infos>
        </Left>
        <Right>
          <Time>{data.lastMsg ? data.lastMsg.time : ''}</Time>
          {data.unReadMsg ? (
            <Badge>
              <BadgeText>{data.unReadMsg}</BadgeText>
            </Badge>
          ) : (
            <View />
          )}
        </Right>
      </Professional>
    </Container>
  );
}
