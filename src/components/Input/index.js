/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { Container, TInput } from './styles';

export default function Input({ style, icon, icon2, error, size, ...rest }) {
  return (
    <Container style={style} error={error}>
      <TInput {...rest} />
      {icon && (
        <View>
          <Icon
            name={icon}
            size={size}
            color="#C6BDDB"
            style={{ marginRight: 10, marginLeft: 10 }}
          />
        </View>
      )}
      {icon2 && (
        <TouchableOpacity>
          <Icon
            name={icon2}
            size={size}
            color="#C6BDDB"
            style={{ marginRight: 5 }}
          />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Input.propTypes = {
  icon: PropTypes.string,
  icon2: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  size: PropTypes.number,
  error: PropTypes.bool,
};

Input.defaultProps = {
  icon: null,
  icon2: null,
  size: 20,
  style: {},
  error: false,
};
