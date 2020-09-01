import React from 'react';
import { setTokenHeader } from '../../services/axios';
import Navbar from '../Navbar';
import Router from '../Router';
import Footer from '../Footer';

function App() {
  const [loggedIn, hasLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});

  const appProps = { loggedIn, hasLoggedIn, user, setUser };

  React.useEffect(() => {
    const id = window.localStorage.getItem('id');
    const username = window.localStorage.getItem('username');
    const token = window.localStorage.getItem('token');
    if (token !== null) {
      hasLoggedIn(true);
      setUser({ id, username, token });
      setTokenHeader(token);
    }
  }, []);

  return (
    <div className="App">
      <Navbar appProps={appProps} />
      <Router appProps={appProps} />
      <Footer />
    </div>
  );
}

export default App;
