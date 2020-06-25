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
  padding-top: ${wp('10%')};
  padding-left: ${wp('5%')};
  padding-right: ${wp('5%')};
`;

export const Title = styled.Text`
  height: ${hp('21%')};
  padding-top: ${hp('8%')};
  font-family: Avenir Next;
  font-size: ${wp('5%')};
  color: ${colors.primary};
`;

export const Description = styled.Text`
  font-family: Avenir Next;
  padding-bottom: ${hp('1%')};
  font-size: ${wp('4%')};
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
    backgroundColor: colors.accept,
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

export const Header = styled.View`
  flex-direction: row;
  padding-top: ${hp('6%')};
  padding-left: ${hp('2%')};
  padding-right: ${hp('2%')};
  justify-content: space-between;
`;

export const InfoCard = styled.View`
  border-width: 1;
  padding-top: ${hp('1%')};
  padding-left: ${hp('1%')};
  padding-right: ${hp('1%')};
  padding-bottom: ${hp('1%')};
  border-color: #303030;
  justify-content: space-between;
`;

export const AnimalImage = styled.Image`
  height: ${hp('50%')};
  margin-top: 5px;
`;

export const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin-top: ${hp('4%')};
`;