import React from 'react';
import './App.css';

import Router from '../Router';

function App() {
  const [loggedIn, hasLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const user = window.localStorage.getItem('dUser');
    if (user !== null) {
      hasLoggedIn(true);
      setUser(user);
    }
  }, []);

  return (
    <div className="App">
      <Router appProps={{ loggedIn, hasLoggedIn, user, setUser }} />
    </div>
  );
}

export default App;
