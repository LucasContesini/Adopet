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
import Welcome from './pages/Welcome';
import { createStackNavigator } from 'react-navigation-stack';

const WelcomeStack = createStackNavigator({
  Welcome: {
    screen: Welcome,
  }
});

const AuthenticationSwitch = createSwitchNavigator({
  SignIn,
  SignUp,
});

export default () =>
  createAppContainer(
    createSwitchNavigator(
      {
        AuthenticationSwitch,
        WelcomeStack,
      },
      {
        initialRouteName: 'AuthenticationSwitch',
      },
    ),
  );
