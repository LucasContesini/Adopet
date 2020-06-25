import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-left: ${wp('12%')};
`;

export const Title = styled.Text`
  color: #000;
  font-size: ${hp('2.5%')};
  font-weight: bold;
  font-family: Avenir Next;
`;