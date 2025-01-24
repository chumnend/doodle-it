import { Routes, Route } from 'react-router';

import Landing from '../Landing';
import Designer from '../Designer';
import Home from '../Home';
import Register from '../Register';
import Login from '../Login';
import Logout from '../Logout';
import NotFound from '../NotFound';

import * as PATH from '../../helpers/constants';

const App = () => {
  return (
    <Routes>
      <Route path={PATH.HOME} element={< Home />} />
      <Route path={PATH.DESIGNER} element={<Designer />} />
      <Route path={PATH.REGISTER} element={<Register />} />
      <Route path={PATH.LOGIN} element={<Login />} />
      <Route path={PATH.LOGOUT} element={<Logout />} />
      <Route index element={<Landing />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App
