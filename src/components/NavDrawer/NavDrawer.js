import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';
import * as Styles from './styles';

const NavDrawer = (props) => {
  return (
    <Styles.Drawer show={props.show}>
      <Styles.CloseContainer show={props.show}>
        <Styles.CloseIcon className="material-icons" onClick={props.close}>
          close
        </Styles.CloseIcon>
      </Styles.CloseContainer>
      {!props.isLoggedIn && (
        <Styles.Ul>
          <Styles.Li>
            <Styles.NavItem to={ROUTES.REGISTER} onClick={props.close}>
              Register
            </Styles.NavItem>
          </Styles.Li>
          <Styles.Li>
            <Styles.NavItem to={ROUTES.LOGIN} onClick={props.close}>
              Login
            </Styles.NavItem>
          </Styles.Li>
        </Styles.Ul>
      )}
      {props.isLoggedIn && (
        <Styles.Ul>
          <Route path={ROUTES.DESIGNER}>
            <Styles.Li>
              <Styles.NavItem to={ROUTES.HOME} onClick={props.close}>
                Back to Home
              </Styles.NavItem>
            </Styles.Li>
          </Route>
          <Route path={ROUTES.HOME}>
            <Styles.Li>
              <Styles.NavItem to={ROUTES.DESIGNER_NEW} onClick={props.close}>
                New Doodle
              </Styles.NavItem>
            </Styles.Li>
          </Route>
          <Styles.Li>
            <Styles.NavItem to={ROUTES.LOGOUT} onClick={props.close}>
              Logout
            </Styles.NavItem>
          </Styles.Li>
        </Styles.Ul>
      )}
    </Styles.Drawer>
  );
};

NavDrawer.propTypes = {
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
  show: PropTypes.bool,
  close: PropTypes.func,

  match: PropTypes.any,
  location: PropTypes.any,
};

export default NavDrawer;
