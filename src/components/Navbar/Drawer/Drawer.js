import PropTypes from 'prop-types';
import * as Styles from './styles';

const Drawer = (props) => {
  return (
    <Styles.Drawer show={props.show}>
      <Styles.CloseContainer show={props.show}>
        <Styles.CloseIcon className="material-icons" onClick={props.close}>
          close
        </Styles.CloseIcon>
      </Styles.CloseContainer>
      <Styles.Ul>
        <Styles.Li>
          <Styles.NavItem to="/login" onClick={props.close}>
            Log in
          </Styles.NavItem>
        </Styles.Li>
        <Styles.Li>
          <Styles.NavItem to="/register" onClick={props.close}>
            Sign Up
          </Styles.NavItem>
        </Styles.Li>
      </Styles.Ul>
    </Styles.Drawer>
  );
};

Drawer.propTypes = {
  show: PropTypes.bool,
  close: PropTypes.func,
};

export default Drawer;
