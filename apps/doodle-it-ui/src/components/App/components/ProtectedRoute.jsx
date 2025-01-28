import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router';

const ProtectedRoute = (props) => {
  const location = useLocation();
  return !props.condition ? (
    <Navigate to={props.redirect} state={{ from: location }} replace />
  ) : (
    props.element
  );
};

ProtectedRoute.propTypes = {
  condition: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired,
  element: PropTypes.node,
};

export default ProtectedRoute;
