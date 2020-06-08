import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Text } from './styles';

export default function Button({ children, load, ...rest }) {
  return (
    <Container {...rest}>
      {load ? (
        <ActivityIndicator size="large" color="#CCC" />
      ) : (
        <Text>{children}</Text>
      )}
    </Container>
  );
}

Button.propTypes = {
  loading: PropTypes.bool,
};

Button.defaultProps = {
  loading: false,
};
