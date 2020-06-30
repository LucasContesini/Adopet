/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import colors from '../../config/color';

import Button from '../../components/Button';
import Input from '../../components/Input';

export const Container = styled.SafeAreaView.attrs({})`
  margin-top: ${hp('-5%')};
`;

export const Body = styled.View.attrs({})`
  flex: 1;
  padding-left: ${wp('11%')};
  padding-right: ${wp('11%')};
`;

export const Title = styled.Text`
  width: ${wp('100%')};
  height: ${hp('21%')};
  padding-top: ${hp('8%')};
  font-family: Avenir Next;
  font-size: ${wp('5%')};
  color: ${colors.primary};
`;

export const AddPhotoButton = styled(Button).attrs({
  containerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStyle: {
    marginTop: hp('4%'),
    height: hp('8%'),
    width: wp('70%'),
    backgroundColor: colors.primary,
    borderRadius: hp('4%'),
  },
  titleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: hp('3%'),
  },
})``;

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

export const ImageRow = styled.View`
  flex-direction: row;
`;

export const AnimalImage = styled.Image`
  width: ${wp('25%')};
  height: ${hp('20%')};
  margin: 5px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-top: ${hp('4%')};
`;