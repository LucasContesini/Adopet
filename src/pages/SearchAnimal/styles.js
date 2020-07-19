/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../config/color';

import Button from '../../components/Button';
import Input from '../../components/Input';
import InputMask from '../../components/InputMask';

export const Container = styled.SafeAreaView.attrs({})`
  margin-top: ${hp('-5%')};
`;

export const Body = styled.View.attrs({})`
  flex: 1;
  padding-left: ${wp('11%')};
  padding-right: ${wp('11%')};
`;

export const CheckBoxRow = styled.View.attrs({})`
  flex-direction: row;
  padding-top: ${wp('11%')};
`;

export const FormInputMask = styled(InputMask).attrs({})`
  width: ${wp('80%')};
  align-content: center;
  margin-bottom: ${hp('3%')};
`;

export const Title = styled.Text`
  width: ${wp('100%')};
  height: ${hp('21%')};
  padding-top: ${hp('8%')};
  font-family: Avenir Next;
  font-size: ${wp('5%')};
  color: ${colors.primary};
`;

export const FormInput = styled(Input)`
  margin-bottom: ${hp('3%')};
  width: ${wp('80%')};
`;

export const TextHolderInput = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('2%')};
  color: ${colors.grey};
  margin-bottom: ${hp('1%')};
  margin-top: ${hp('0%')};
`;

export const SubmitButton = styled(Button).attrs({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: hp('4%'),
    height: hp('8%'),
    width: wp('70%'),
    backgroundColor: colors.secondary,
    borderRadius: hp('4%'),
  },
  titleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: hp('3%'),
  },
})``;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-top: ${hp('8%')};
`;

export const TextFooter = styled.Text`
  font-size: ${wp('5%')};
  margin-right: ${wp('1%')};
  color: #958fa3;
`;

export const LinkFooter = styled.Text`
  font-size: ${wp('5%')};
  font-weight: bold;
  color: ${colors.primary};
  text-decoration: underline;
  text-decoration-color: ${colors.primary};
`;

export const InvalidEmail = styled.Text`
  font-family: Avenir Next;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: #a51c60;
  font-size: ${hp('2%')};
  color: #a51c60;
`;

export const TextAlert = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('1.8%')};
  margin-top: ${hp('-2%')};
  margin-bottom: ${hp('1.5%')};
  width: ${wp('80%')};
  color: red;
`;
