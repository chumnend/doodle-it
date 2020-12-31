import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as ROUTES from '../../constants/routes';
import * as Styles from './styles';

const NavLinks = (props) => {
  return (
    <Styles.Navigation>
      <Styles.Menu className="material-icons" onClick={props.open}>
        menu
      </Styles.Menu>
      {!props.isLoggedIn && (
        <Styles.Ul>
          <Styles.Li>
            <Styles.NavItem to={ROUTES.REGISTER}>Register</Styles.NavItem>
          </Styles.Li>
          <Styles.Li>
            <Styles.NavItem to={ROUTES.LOGIN}>Login</Styles.NavItem>
          </Styles.Li>
        </Styles.Ul>
      )}
      {props.isLoggedIn && (
        <Styles.Ul>
          <Route path={ROUTES.DESIGNER}>
            <Styles.Li>
              <Styles.NavItem to={ROUTES.HOME}>Back to Home</Styles.NavItem>
            </Styles.Li>
          </Route>
          <Route path={ROUTES.HOME}>
            <Styles.Li>
              <Styles.NavItem to={ROUTES.DESIGNER_NEW}>
                New Doodle
              </Styles.NavItem>
            </Styles.Li>
          </Route>
          <Styles.Li>
            <Styles.Button onClick={props.logout}>Logout</Styles.Button>
          </Styles.Li>
        </Styles.Ul>
      )}
    </Styles.Navigation>
  );
};

NavLinks.propTypes = {
  isLoggedIn: PropTypes.bool,
  logout: PropTypes.func,
  open: PropTypes.func,
};

export default NavLinks;
