import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, TouchableOpacity, Linking } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome'; 
import LoveIcon from 'react-native-vector-icons/AntDesign';

import { signOutAnimal } from '../../store/modules/animal/action';
import { signOutAuth } from '../../store/modules/auth/action';
import { signOutChat } from '../../store/modules/chat/action';

import { Container, Button, Text } from './styles';

export default function More({ navigation }) {
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);

  function handleLogout() {
    dispatch(signOutAuth());
    dispatch(signOutAnimal());
    dispatch(signOutChat());
  }

  return (
    <Container>
      {token !== ''? (
        <Button onPress={handleLogout}>
        <Icon
          name="exit-to-app"
          size={hp('4.5%')}
          color="#625c70"
          style={{ marginLeft: wp(`5`) }}
        />
        <Text>Sair</Text>
      </Button>
      ) : (
        <Button onPress={() => navigation.navigate('AuthenticationSwitch')}>
        <AwesomeIcon
          name="user"
          size={hp('5%')}
          color="#625c70"
          style={{ marginLeft: wp(`5`) }}
        />
        <Text>Fazer login</Text>
      </Button>
      )}
      
      <Button onPress={() => navigation.navigate('InterestedAnimalList')}>
        <LoveIcon
          name="heart"
          size={hp('4.5%')}
          color="#625c70"
          style={{ marginLeft: wp(`5`) }}
        />
        <Text>Animais interessados</Text>
      </Button>
      <Button onPress={() => navigation.navigate('DonatedAnimalList')}>
        <AwesomeIcon
          name="paw"
          size={hp('4.5%')}
          color="#625c70"
          style={{ marginLeft: wp(`5`) }}
        />
        <Text>Meus animais doados</Text>
      </Button>
    </Container>
  );
}
