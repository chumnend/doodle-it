import PropTypes from 'prop-types';
import * as Styles from './styles';

const Modal = (props) => {
  return (
    <Styles.Modal show={props.show} onClick={props.close}>
      <Styles.Container onClick={(event) => event.stopPropagation()}>
        {props.children}
      </Styles.Container>
    </Styles.Modal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func,
  show: PropTypes.bool,
};

export default Modal;
