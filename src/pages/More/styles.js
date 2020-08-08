import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  width: ${wp('100')};
  align-items: center;
  height: ${hp('10')};
`;

export const Text = styled.Text`
  margin-left: ${hp('4')};
  font-family: Avenir Next;
  font-size: ${hp('3')};
  color: #625c70;
  font-weight: 500;
  width: ${wp('75')};
`;
