import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../../services';
import './Login.scss';

function Login(props) {
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  const validateForm = () => {
    return login.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const user = await Auth.login(login, password);
      props.setUser(user);
      props.hasLoggedIn(true);
      props.history.push('/');
    } catch (error) {
      setErrors([error.message]);
      setLoading(false);
    }
  };

  return (
    <main className="Login container view">
      <form className="auth-form" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="auth-errors">
            {errors.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
        )}
        <h2>Log in to your account</h2>
        <div className="auth-form-group">
          <label htmlFor="login">Username or Email</label>
          <input
            type="text"
            id="login"
            name="login"
            placeholder="Enter Username/Email"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="auth-submit" disabled={isLoading || !validateForm()}>
          Login
        </button>
        <p>
          Need an account?{' '}
          <Link className="link" to="/register">
            Sign up now
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
