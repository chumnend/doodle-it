import { useEffect } from 'react';
import { useNavigate } from 'react-router';
//import { useDispatch } from 'react-redux';

import { path } from '../../helpers/constants';
// import * as actions from '../../store/actions';

const Logout = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const logoutUser = useCallback(
  //   () => dispatch(actions.authLogoutRequest()),
  //   [dispatch],
  // );

  useEffect(() => {
    // logoutUser();
    navigate(path.landing);
  }, [navigate]);

  return <></>
};

export default Logout;