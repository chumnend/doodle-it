import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import Designer from './containers/Designer';
import Home from './containers/Home';
import Register from './containers/Register';
import Landing from './containers/Landing';
import Login from './containers/Login';
import Logout from './containers/Logout';
import NotFound from './containers/NotFound';
import * as ROUTES from './constants/routes';
import * as actions from './store/actions';

const App = () => {
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validateUser = useCallback(
    () => dispatch(actions.authRequestValidate()),
    [dispatch],
  );

  useEffect(() => {
    validateUser();
    setLoading(false);
  }, [validateUser]);

  return (
    <>
      <Nav isLoggedIn={!!auth.token} />
      {!loading && (
        <Switch>
          <ProtectedRoute
            exact
            path={ROUTES.HOME}
            condition={!!auth.token}
            redirect={ROUTES.LOGIN}
            component={Home}
          />
          <ProtectedRoute
            exact
            path={ROUTES.DESIGNER}
            condition={!!auth.token}
            redirect={ROUTES.LOGIN}
            component={Designer}
          />
          <ProtectedRoute
            exact
            path={ROUTES.LANDING}
            condition={!auth.token}
            redirect={ROUTES.HOME}
            component={Landing}
          />
          <ProtectedRoute
            exact
            path={ROUTES.REGISTER}
            condition={!auth.token}
            redirect={ROUTES.HOME}
            component={Register}
          />
          <ProtectedRoute
            exact
            path={ROUTES.LOGIN}
            condition={!auth.token}
            redirect={ROUTES.HOME}
            component={Login}
          />
          <Route exact path={ROUTES.LOGOUT} component={Logout} />
          <Route component={NotFound} />
        </Switch>
      )}
    </>
  );
};

export default App;
