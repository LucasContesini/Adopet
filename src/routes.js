import React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AnimalSignUp from './pages/AnimalSignUp';
import AnimalImageSignUp from './pages/AnimalImageSignUp';
import AnimalEdit from './pages/AnimalEdit';
import AnimalImageEdit from './pages/AnimalImageEdit';
import AnimalList from './pages/AnimalList';
import AnimalOwnerList from './pages/AnimalOwnerList';
import AnimalInfo from './pages/AnimalInfo';
import Icon from 'react-native-vector-icons/AntDesign';
import NavIcon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from './config/color';

import { createStackNavigator } from 'react-navigation-stack';
import HeaderTabs from './components/HeaderTabs';

const AuthenticationSwitch = createSwitchNavigator({
  SignIn,
  SignUp,
});

const AnimalListStack = createStackNavigator({
  Adote: {
    screen: AnimalList,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <NavIcon style={{paddingLeft: hp('2%')}} name="navicon" size={50}/>
        ),
        headerRight: (
          <Icon style={{paddingRight: hp('2%')}} name="search1" size={50}/>
        ),
        headerTitle: (
          <HeaderTabs title="Adote um animal" />
        ),
      }
    } 
  },
  AnimalInfo: {
    screen: AnimalInfo,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: (
          <HeaderTabs title="Informações do animal" />
        ),
      }
    }
  }
});

AnimalListStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let swipeEnabled = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    swipeEnabled = false;
  }

  return {
    swipeEnabled,
    tabBarVisible,
    tabBarLabel: 'Adote um animal',
  }
}


const AnimalStack = createStackNavigator({
  AnimalOwnerList: {
    screen: AnimalOwnerList,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <NavIcon style={{paddingLeft: hp('2%')}} name="navicon" size={50}/>
        ),
        headerTitle: (
          <HeaderTabs title="Doe seu animal" />
        ),
      }
    }
  },
  AnimalSignUp: {
    screen: AnimalSignUp,
  },
  AnimalImageSignUp : {
    screen: AnimalImageSignUp
  },
  AnimalEdit: {
    screen: AnimalEdit,
  },
  AnimalImageEdit : {
    screen: AnimalImageEdit
  }
});

AnimalStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let swipeEnabled = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    swipeEnabled = false;
  }

  return {
    swipeEnabled,
    tabBarVisible,
    tabBarLabel: 'Doe seu animal',
  }
}

const ChatStack = createStackNavigator({
  Chat: {
    screen: AnimalList,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <NavIcon style={{paddingLeft: hp('2%')}} name="navicon" size={50}/>
        ),
        headerTitle: (
          <HeaderTabs title="Conversas" />
        ),
      }
    }
  },
});

ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  let swipeEnabled = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
    swipeEnabled = false;
  }

  return {
    swipeEnabled,
    tabBarVisible,
    tabBarLabel: 'Conversas',
  }
}

const TabNavigator = createMaterialTopTabNavigator({
  AnimalListStack,
  AnimalStack,
  ChatStack,
},
{
  tabBarPosition: 'bottom',
  tabBarOptions: {
    indicatorStyle: {
      opacity: 0,
    },
    keyboardHidesTabBar: true,
    activeTintColor: colors.primary,
    inactiveTintColor: '#958FA3',
    style: { backgroundColor: 'white' },
    upperCaseLabel: false,
      labelStyle: {
        fontSize: 14,
      },
      tabStyle: {
        justifyContent: 'space-between',
        alignItems: "center",
      }, 
    },  
  }
);

export default isSigned =>
  createAppContainer(
    createSwitchNavigator(
      {
        AuthenticationSwitch,
        TabNavigator,
      },
      {
        initialRouteName: isSigned ? 'TabNavigator' : 'TabNavigator',
      },
    ),
  );
