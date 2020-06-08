import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import SignIn from './pages/SignIn';

const AuthenticationSwitch = createSwitchNavigator({
  SignIn,
  // SignUp,
});

export default () =>
  createAppContainer(
    createSwitchNavigator(
      {
        AuthenticationSwitch,
      },
      {
        initialRouteName: 'AuthenticationSwitch',
      },
    ),
  );
