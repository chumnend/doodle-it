import React, { useState } from 'react';
import Router from './Router';
import "./App.scss";

function App() {
  const [loggedIn, hasLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const appProps = { loggedIn, hasLoggedIn, user, setUser };
  return (
    <div className="App">
      <Router appProps={ appProps } />
    </div>
  );
}

export default App;
