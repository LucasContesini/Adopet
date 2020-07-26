/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ParsedText from 'react-native-parsed-text';
import colors from '../../config/color';

export const Container = styled.View.attrs({})`
  background-color: ${props =>
    // eslint-disable-next-line eqeqeq
    props.type === 'canceledCall'
      ? '#e1f2fb'
      : props.background == props.me
      ? colors.primaryLight
      : '#fff'};
  padding-top: 10;
  /* padding-bottom: 10; */
  padding-left: 10;
  padding-right: 10;

  margin-top: 10;
  margin-bottom: 10;
  margin-left: 10;
  margin-right: 10;

  max-width: ${wp('80%')};

  border-radius: ${hp('1%')};
  justify-content: flex-start;
  align-items: center;
  align-self: ${props =>
    // eslint-disable-next-line eqeqeq

    props.type === 'canceledCall'
      ? 'center'
      : props.background == props.me
      ? 'flex-end'
      : 'flex-start'};
`;

export const Message = styled(ParsedText)`
  text-align: ${props =>
    // eslint-disable-next-line eqeqeq
    props.type === 'canceledCall'
      ? 'center'
      : props.alignText == !props.me
      ? 'right'
      : 'left'};
  font-family: Avenir Next;
  font-size: 16;
  color: #625c70;
`;

export const MessageDetailsText = styled.Text`
  text-align: ${props =>
    // eslint-disable-next-line eqeqeq
    props.alignText == !props.me ? 'right' : 'left'};
  font-family: Avenir Next;
  font-size: 10;
  color: #333;
  opacity: 0.4;
`;

export const MessageImage = styled.Image`
  margin-top: 0;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 0;
  width: ${wp('45%')};
  height: ${wp('36%')};
`;

export const DurationView = styled.View`
  background-color: #e48abf;
  border-radius: 6;
  height: ${hp('8%')};
  width: ${hp('8%')};
  align-items: center;
  justify-content: center;
  margin-bottom: 10;
`;
export const DurationText = styled.Text`
  color: #fff;
  font-size: 16;
`;

export const CheckMessageSend = styled.View`
  margin-bottom: ${hp('0.5%')};
`;

export const MessageDetails = styled.View`
  flex-direction: row;

  align-items: center;
  align-self: ${props =>
    // eslint-disable-next-line eqeqeq
    props.background !== props.me ? 'flex-start' : 'flex-end'};
`;

export const HistoryCallView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const HistoryCall = styled.Text`
  text-align: center;
  font-family: Avenir Next;
  font-size: 14;
  color: #625c70;
`;
