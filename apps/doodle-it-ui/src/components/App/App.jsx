import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';

import Navigation from './components/Navigation';
import Landing from '../Landing';
import Designer from '../Designer';
import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import Logout from '../Logout';
import NotFound from '../NotFound';

import { path } from '../../helpers/constants';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Navigation isLoggedIn={true} />
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
