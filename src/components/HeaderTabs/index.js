import React from 'react';
import {} from 'react-native';
import PropTypes from 'prop-types';

import { Container, Title } from './styles';

export default function HeaderTabs({ title }) {
  return (
    <Container>
      <Title>
        {title}
      </Title>
    </Container>
  );
}

HeaderTabs.propTypes = {
  title: PropTypes.string,
};

HeaderTabs.defaultProps = {
  title: '',
};
