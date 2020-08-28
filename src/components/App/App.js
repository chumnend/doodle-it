import React from 'react';
import Navbar from '../Navbar';
import Router from '../Router';
import Footer from '../Footer';

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
      <Navbar appProps={{ loggedIn, hasLoggedIn, user, setUser }} />
      <Router appProps={{ loggedIn, hasLoggedIn, user, setUser }} />
      <Footer />
    </div>
  );
}

export default App;
