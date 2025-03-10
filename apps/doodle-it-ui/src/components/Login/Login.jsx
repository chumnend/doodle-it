import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Button from './components/Button';
import Form from './components/Form';
import FormGroup from './components/FormGroup';
import FormError from './components/FormError';
import FormTitle from './components/FormTitle';
import Link from './components/Link';

import { path } from '../../helpers/constants';
import { authRequestLogin } from '../../helpers/store/actions';

const Login = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loginUser = useCallback(
    (login, password) => dispatch(authRequestLogin(login, password)),
    [dispatch],
  );

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    return login.length > 0 && password.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(login, password);
  };

  return (
    <div data-testid="login">
      <Form submit={handleSubmit}>
        <FormTitle>Welcome Back!</FormTitle>
        {auth.error && <FormError>{auth.error.message}</FormError>}
        <FormGroup
          label="Username or Email"
          inputType="text"
          id="login"
          value={login}
          placeholder="Username or Email"
          changed={(e) => setLogin(e.target.value)}
        />
        <FormGroup
          label="Password"
          inputType="password"
          id="password"
          value={password}
          placeholder="Password"
          changed={(e) => setPassword(e.target.value)}
        />
        <Button disabled={auth.authenticating || !validateForm()}>Login</Button>
        <p>
          Need an account? <Link to={path.register}>Sign Up</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
