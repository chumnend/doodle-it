import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../../services';
import './Register.scss';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password1, setPassword1] = React.useState('');
  const [password2, setPassword2] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  const validateForm = () => {
    return (
      email.length > 0 &&
      username.length > 0 &&
      password1.length > 0 &&
      password2.length > 0 &&
      password1 === password2
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const user = await Auth.register(email, username, password1);
      props.setUser(user);
      props.hasLoggedIn(true);
      props.history.push('/');
    } catch (error) {
      setErrors([error.message]);
      setLoading(false);
    }
  };

  return (
    <main className="Register container">
      <form className="auth-form" onSubmit={handleSubmit}>
        {errors.length > 0 && (
          <div className="auth-errors">
            {errors.map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
        )}
        <h2>Get started with DoodleIt</h2>
        <div className="auth-form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            id="password1"
            name="password1"
            placeholder="Enter Password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div className="auth-form-group">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="Enter Password Again"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button className="auth-submit" disabled={isLoading || !validateForm()}>
          Register
        </button>
        <p>
          Already have an account?{' '}
          <Link className="link" to="/login">
            Log in now
          </Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
