import { Platform } from 'react-native';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Input from '../../components/Input';
import Button from '../../components/Button';

export const Container = styled.SafeAreaView.attrs({})`
  flex: 1;
  background-color: #e5e5e5;
`;

export const MessageArea = styled.FlatList`
  flex: 1;
  padding-right: 10;
`;

export const SendArea = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
  keyboardVerticalOffset: 140,
})`
  flex-direction: row;
  align-items: center;
  margin-top: ${hp('1%')};
  justify-content: space-around;
  margin-bottom: ${hp('1%')};
`;

export const MessageInput = styled(Input).attrs({
  placeholder: 'Escreva sua mensagem',
  placeholderTextColor: '#CCC',
})`
  font-family: Avenir Next;
  margin-left: ${wp('1%')};
  width: ${wp('80%')};
  background-color: #fff;
  border-radius: ${wp('9%')};
  border-color: transparent;
`;

export const SendButton = styled.TouchableOpacity``;

export const Icon = styled.Image`
  width: ${wp('13%')};
  height: ${wp('13%')};
`;

export const ButtonClose = styled(Button).attrs({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: hp('5%'),
    marginBottom: hp('5%'),
    height: hp('7%'),
    width: wp('41%'),
    borderRadius: hp('4%'),
    borderWidth: 1,
    borderColor: '#A51C60',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: hp('2.5%'),
    color: '#A51C60',
  },
})``;

export const Title = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('3.5%')};
  font-weight:bold;
  text-align: center;
  color: #625C70;
  /* margin-bottom: ${hp('4%')};
  margin-top: ${hp('4%')}; */

`;

export const Description = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('2.4%')};
  align-self: center;
  color: #625C70;
  /* margin-bottom: ${hp('4%')};
  margin-top: ${hp('4%')}; */
 
`;
