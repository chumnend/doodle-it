import PropType from 'prop-types';
import * as Styles from './styles';

const Navigation = (props) => {
  return (
    <Styles.Navigation>
      <Styles.Menu className="material-icons" onClick={props.open}>
        menu
      </Styles.Menu>
      <Styles.Ul>
        <Styles.Li>
          <Styles.NavItem to="/login">Log in</Styles.NavItem>
        </Styles.Li>
        <Styles.Li>
          <Styles.NavItem to="/register">Sign Up</Styles.NavItem>
        </Styles.Li>
      </Styles.Ul>
    </Styles.Navigation>
  );
};

Navigation.propTypes = {
  open: PropType.func,
};

export default Navigation;
