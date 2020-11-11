import { useEffect, useCallback } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import { authRequestValidate, logoutRequest } from './store/actions';

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const validateUser = useCallback(() => dispatch(authRequestValidate()), [
    dispatch,
  ]);
  const logoutUser = useCallback(() => dispatch(logoutRequest()), [dispatch]);

  useEffect(() => {
    validateUser();
  }, [validateUser]);

  return (
    <>
      <Navbar isLoggedIn={!!auth.token} logout={logoutUser} />
      <Switch>
        <Route
          exact
          path="/register"
          render={(props) =>
            !auth.token ? <Register {...props} /> : <Redirect to="/console" />
          }
        />
        <Route
          exact
          path="/login"
          render={(props) =>
            !auth.token ? <Login {...props} /> : <Redirect to="/console" />
          }
        />
        <Route
          exact
          path="/"
          render={(props) =>
            !auth.token ? <Home {...props} /> : <Redirect to="/console" />
          }
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;
