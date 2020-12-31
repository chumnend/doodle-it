import PropTypes from 'prop-types';
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
            <Styles.NavItem to="/register">Sign Up</Styles.NavItem>
          </Styles.Li>
          <Styles.Li>
            <Styles.NavItem to="/login">Log in</Styles.NavItem>
          </Styles.Li>
        </Styles.Ul>
      )}
      {props.isLoggedIn && (
        <Styles.Ul>
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
