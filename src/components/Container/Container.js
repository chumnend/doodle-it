import PropTypes from 'prop-types';
import * as Styles from './styles';

const Container = (props) => {
  return (
    <Styles.Container>
      <Styles.InnerContainer>{props.children}</Styles.InnerContainer>
    </Styles.Container>
  );
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
