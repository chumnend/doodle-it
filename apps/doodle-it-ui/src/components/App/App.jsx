import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';

import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from '../Landing';
import Designer from '../Designer';
import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import Logout from '../Logout';
import NotFound from '../NotFound';

import { path } from '../../helpers/constants';
import { authRequestValidate } from '../../helpers/store/actions';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validateUser = useCallback(
    () => dispatch(authRequestValidate()),
    [dispatch],
  );

  useEffect(() => {
    validateUser();
    setIsLoading(false);
  }, [validateUser]);

  return (
    <>
      <Navigation isLoggedIn={!!auth.token} />
      {!isLoading && (
          <Routes>
            {/* Authenticated Routes */}
            <Route path={path.home} element={
              <ProtectedRoute
                condition={!!auth.token}
                redirect={path.login}
                element={<Home />}
              />
            }/>
            <Route path={path.designer} element={
              <ProtectedRoute
                condition={!!auth.token}
                redirect={path.login}
                element={<Designer />}
              />
            }/>
            {/* Unauthenticated Routes */}
            <Route path={path.register} element={
              <ProtectedRoute
                condition={!auth.token}
                redirect={path.home}
                element={<Register />}
              />
            }/>
            <Route path={path.login} element={
              <ProtectedRoute
                condition={!auth.token}
                redirect={path.home}
                element={<Login />}
              />
            }/>
            <Route path={path.landing} element={
              <ProtectedRoute
                condition={!auth.token}
                redirect={path.home}
                element={<Landing />}
              />
            }/>     
            {/* Public Routes */}
            <Route path={path.logout} element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      )}
    </>
  );
};

export default App
