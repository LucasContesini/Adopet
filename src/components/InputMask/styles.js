import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.View`
  border-radius: 4px;
  height: ${hp('6%')};
  padding: 0 15px;
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${props => (props.error ? '#958fa3' : 'red')};
`;

export const TInput = styled(TextInputMask)`
  flex: 1;
  color: #958fa3;
  font-size: 15px;
  margin-left: ${wp('2%')};
`;
