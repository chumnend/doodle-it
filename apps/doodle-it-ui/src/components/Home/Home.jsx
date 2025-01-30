import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createSelector } from 'reselect';

import Fab from './components/Fab';
import Gallery from './components/Gallery';

import { path } from '../../helpers/constants';
import { doodlesRequestFetch, doodlesRequestDelete } from '../../helpers/store/actions';

const selectAuthAndDoodle = createSelector(
  (state) => state.auth,
  (state) => state.doodle,
  (auth, doodle) => [auth, doodle]
);

const Home = () => {
  const [auth, doodle] = useSelector(selectAuthAndDoodle);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchDoodles = useCallback(
    () => dispatch(doodlesRequestFetch(auth.id)),
    [dispatch, auth],
  );

  const editDoodle = useCallback(
    (id) => {
      navigate(path.designer_with_id(id));
    },
    [navigate],
  );

  const deleteDoodle = useCallback(
    (id) => dispatch(doodlesRequestDelete(auth.id, id)),
    [dispatch, auth],
  );

  const gotoDesigner = useCallback(
    () => navigate(path.designer_new),
    [navigate],
  );

  useEffect(() => {
    fetchDoodles();
  }, [fetchDoodles]);

  return (
    <div data-testid="home">
      <Gallery items={doodle.doodles} edit={editDoodle} delete={deleteDoodle} />
      <Fab onClick={gotoDesigner} />
    </div>
  );
};

export default Home;
