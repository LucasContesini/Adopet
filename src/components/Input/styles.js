import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  border-radius: 4px;
  height: ${hp('6%')};
  padding: 0 2px;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${props => (props.error ? 'red' : '#958fa3')};
`;

export const TInput = styled.TextInput`
  flex: 1;
  color: #958fa3;
  font-size: 15px;
  margin-left: ${wp('2%')};
`;
