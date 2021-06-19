import React, { useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import * as actions from '../../store/actions';

const Logout = () => {
  const dispatch = useDispatch();

  const logoutUser = useCallback(() => dispatch(actions.authLogoutRequest()), [
    dispatch,
  ]);

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return <Redirect to={ROUTES.LANDING} />;
};

export default Logout;
