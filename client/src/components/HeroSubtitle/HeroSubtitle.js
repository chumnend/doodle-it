import React from 'react';
import PropTypes from 'prop-types';
import * as Styles from './styles';

const HeroSubtitle = (props) => {
  return <Styles.HeroSubtitle>{props.children}</Styles.HeroSubtitle>;
};

HeroSubtitle.propTypes = {
  children: PropTypes.node,
};

export default HeroSubtitle;
