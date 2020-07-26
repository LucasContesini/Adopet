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
import RegionChoose from './pages/RegionChoose';
import AnimalSignUp from './pages/AnimalSignUp';
import AnimalImageSignUp from './pages/AnimalImageSignUp';
import AnimalEdit from './pages/AnimalEdit';
import AnimalImageEdit from './pages/AnimalImageEdit';
import AnimalList from './pages/AnimalList';
import ChatList from './pages/ChatList';
import Chat from './pages/Chat';
import AnimalOwnerList from './pages/AnimalOwnerList';
import AnimalInfo from './pages/AnimalInfo';
import SearchAnimal from './pages/SearchAnimal';
import Icon from 'react-native-vector-icons/AntDesign';
import ArrowIcon from 'react-native-vector-icons/MaterialIcons';
import NavIcon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from './config/color';

import { createStackNavigator } from 'react-navigation-stack';
import HeaderTabs from './components/HeaderTabs';
import Header from './components/Header';

const AuthenticationSwitch = createSwitchNavigator({
  SignIn,
  SignUp
});
const RegionChooseStack = createStackNavigator({
RegionChoose
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
          <TouchableOpacity onPress={() => navigation.navigate('SearchAnimal')}>
            <Icon style={{paddingRight: hp('2%')}} name="search1" size={50}/>
          </TouchableOpacity>
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
  },
  SearchAnimal: {
    screen: SearchAnimal,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: (
          <HeaderTabs title="Buscar por um animal" />
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
  ChatList: {
    screen: ChatList,
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
  Chat: {
    screen: Chat,
    navigationOptions: ({ navigation }) => {
      const data = navigation.getParam('data');
      const { animalName, animalPhoto, nickname } = data;
      return {
        headerStyle: {
          height: hp('10%'),
        },
        headerBackground: <Header />,
        headerTitle: () => (
          <>
            {/* <TouchableOpacity */}
              {/* hitSlop={{ top: 25, left: 25, right: 25, bottom: 25 }}> */}
              <Image
                source={{
                  uri: `${animalPhoto}`,
                }}
                style={{
                  width: hp('7%'),
                  height: hp('7%'),
                  borderRadius: hp('3.5%'),
                  marginRight: wp('-8%'),
                }}
              />
            {/* </TouchableOpacity> */}

            <HeaderTabs title={animalName} chatHeader />
            <HeaderTabs title={nickname} chatHeader />
          </>
        ),
        headerRightContainerStyle: {
          // marginRight: wp('2%'),
          width: wp('15%'),
        },
        headerTitleContainerStyle: {
          flex: 1,
          flexDirection: 'row',
          width: wp('80%'),
        },

        headerLeftContainerStyle: {
          marginLeft: wp('2%'),
          height: 'auto',
          width: wp('25%'),
        },
      };
    },
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

export default token =>
  createAppContainer(
    createSwitchNavigator(
      {
        RegionChooseStack,
        TabNavigator,
        AuthenticationSwitch,
      },
      {
        initialRouteName: token == "" ? 'RegionChooseStack' : 'TabNavigator',
      },
    ),
  );
