import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../config/color';
// import { Container } from './styles';

export default function Header() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
}
