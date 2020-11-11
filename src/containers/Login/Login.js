import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { authRequestLogin } from '../../store/actions';
import Form from '../../components/Form';
import FormTitle from '../../components/Form/FormTitle';
import FormGroup from '../../components/Form/FormGroup';
import FormError from '../../components/Form/FormError';
import Button from '../../components/Button';

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
    <>
      {!!auth.token && <Redirect to="/console" />}
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
      </Form>
    </>
  );
};

export default Login;
