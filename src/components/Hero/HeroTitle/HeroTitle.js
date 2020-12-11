import PropTypes from 'prop-types';
import * as Styles from './styles';

const HeroTitle = (props) => {
  return <Styles.HeroTitle>{props.children}</Styles.HeroTitle>;
};

HeroTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeroTitle;
