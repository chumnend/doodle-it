import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router';

import Navigation from './components/Navigation/Navigation';
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
            <Route path={path.home} element={< Home />} />
            <Route path={path.designer} element={<Designer />} />
            <Route path={path.register} element={<Register />} />
            <Route path={path.login} element={<Login />} />
            <Route path={path.logout} element={<Logout />} />
            <Route index element={<Landing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      )}
    </>
  );
};

export default App
