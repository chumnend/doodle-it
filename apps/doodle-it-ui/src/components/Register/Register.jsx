import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from './components/Button';
import Form from './components/Form';
import FormGroup from './components/FormGroup';
import FormError from './components/FormError';
import FormTitle from './components/FormTitle';
import Link from './components/Link';

import { path } from '../../helpers/constants';
import { authRequestRegister } from '../../helpers/store/actions';

const Register = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const registerUser = useCallback(
    (username, email, password) =>
      dispatch(authRequestRegister(username, email, password)),
    [dispatch],
  );

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const validateForm = () => {
    return (
      email.length > 0 &&
      username.length > 0 &&
      password1.length > 0 &&
      password2.length > 0 &&
      password1 === password2
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(username, email, password1);
  };

  return (
    <div data-testid="register">
      <Form submit={handleSubmit}>
        <FormTitle>{"Let's Get Started!"}</FormTitle>
        {auth.error && <FormError>{auth.error.message}</FormError>}
        <FormGroup
          label="Email"
          inputType="email"
          id="email"
          value={email}
          placeholder="Email"
          changed={(e) => setEmail(e.target.value)}
        />
        <FormGroup
          label="Username"
          inputType="text"
          id="username"
          value={username}
          placeholder="Username"
          changed={(e) => setUsername(e.target.value)}
        />
        <FormGroup
          label="Password"
          inputType="password"
          id="password1"
          value={password1}
          placeholder="Password"
          changed={(e) => setPassword1(e.target.value)}
        />
        <FormGroup
          label="Password"
          inputType="password"
          id="password2"
          value={password2}
          placeholder="Confirm Password"
          changed={(e) => setPassword2(e.target.value)}
        />
        <Button disabled={auth.authenticating || !validateForm()}>
          Register
        </Button>
        <p>
          Already have an account? <Link to={path.login}>Sign In</Link>
        </p>
      </Form>
    </div>
  );
};

export default Register;
