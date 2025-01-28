import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { path } from '../../helpers/constants';
import { authRequestLogout } from '../../helpers/store/actions';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = useCallback(
    () => dispatch(authRequestLogout()),
    [dispatch],
  );

  useEffect(() => {
    logoutUser();
    navigate(path.landing);
  }, [logoutUser, navigate]);

  return <></>
};

export default Logout;
