import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AnimalSignUp from './pages/AnimalSignUp';
import AnimalImageSignUp from './pages/AnimalImageSignUp';
import { createStackNavigator } from 'react-navigation-stack';

const AnimalSignUpStack = createStackNavigator({
  Cadastro: {
    screen: AnimalSignUp,
  },
  AnimalImageSignUp,
});

const AuthenticationSwitch = createSwitchNavigator({
  SignIn,
  SignUp,
});

export default isSigned =>
  createAppContainer(
    createSwitchNavigator(
      {
        AuthenticationSwitch,
        AnimalSignUpStack,
      },
      {
        initialRouteName: isSigned ? 'AnimalSignUpStack' : 'AuthenticationSwitch',
      },
    ),
  );
