import PropTypes from 'prop-types';
import * as Styles from './styles';

const PageView = (props) => {
  return <Styles.PageView>{props.children}</Styles.PageView>;
};

PageView.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageView;
