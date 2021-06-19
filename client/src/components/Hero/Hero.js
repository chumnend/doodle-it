import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';

const Hero = (props) => {
  return (
    <Styles.Hero>
      <Styles.Container>{props.children}</Styles.Container>
    </Styles.Hero>
  );
};

Hero.propTypes = {
  children: PropTypes.node,
};

export default Hero;
