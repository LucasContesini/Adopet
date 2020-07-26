import styled from 'styled-components/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const Container = styled.TouchableOpacity`
  border-bottom-width: 1;
  border-bottom-color: rgba(98, 92, 112, 0.1);
`;

export const Left = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: ${hp('6%')};
  height: ${hp('6%')};
  border-radius: ${hp('3.5%')};
`;

export const Infos = styled.View`
  flex-direction: column;
  margin-left: ${wp('3%')};
  width: ${wp('65%')};
`;

export const Name = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('2.5%')};

  font-weight: 600;
  color: #615375;
`;

export const Especialty = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('1.8%')};
  color: #c6bddb;
`;

export const Rating = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-right: ${wp('5%')};
  margin-top: ${hp('-2.5%')};
`;

export const Value = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('1.8%')};
  color: #febc00;
`;

export const Professional = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: ${hp('12%')};
  align-items: center;
  margin-left: ${wp('3%')};
  margin-top: ${hp('-1%')};
  margin-bottom: ${hp('-1%')};
`;

export const Right = styled.View`
  margin-right: 30;
  align-items: center;
`;

export const Badge = styled.View`
  width: ${hp('3%')};
  height: ${hp('3%')};
  border-radius: ${hp('1.5%')};
  background-color: #a51c60;
  align-items: center;
  justify-content: center;
  margin-top: 5;
`;

export const BadgeText = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('1.8%')};
  color: white;
`;

export const Time = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('1.8%')};
  color: #c6bddb;
`;

export const LastMsgText = styled.Text`
  font-family: Avenir Next;
  font-size: ${hp('2%')};
  color: #c6bddb;
  margin-left: 3;
  max-width: ${wp('55%')};
`;

export const LastMsgView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 2;
`;
