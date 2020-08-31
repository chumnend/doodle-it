import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../../services';
import './Login.scss';

function Login(props) {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);

  const validateForm = () => {
    return (
      login.length > 0 &&
      password.length > 0
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const user = await Auth.login(login, password);
      props.setUser(user);
      props.hasLoggedIn(true);
      window.localStorage.setItem('dUser', user);
      props.history.push('/');
    } catch(error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="Login container view">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login">Username or Email</label>
          <input
            type="text"
            id="login"
            name="login"
            placeholder="Username or Email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button disabled={isLoading || !validateForm()}>Login</button>
        <p>Need an account? <Link className="link" to="/register">Sign up now</Link></p>
      </form>
    </div>
  );
}

export default Login;
