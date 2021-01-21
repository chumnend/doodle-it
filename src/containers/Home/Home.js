import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Fab from '../../components/Fab';
import Gallery from '../../components/Gallery';
import * as ROUTES from '../../constants/routes';
import * as actions from '../../store/actions';

const Home = () => {
  const history = useHistory();

  const [auth, doodle] = useSelector((state) => [state.auth, state.doodle]);
  const dispatch = useDispatch();

  const fetchDoodles = useCallback(
    () => dispatch(actions.doodlesRequestFetch(auth.id)),
    [dispatch, auth],
  );

  const editDoodle = useCallback(
    (id) => {
      history.push(ROUTES.DESIGNER_WITH_ID(id));
    },
    [history],
  );

  const deleteDoodle = useCallback(
    (id) => dispatch(actions.doodlesRequestDelete(auth.id, id)),
    [dispatch, auth],
  );

  const gotoDesigner = useCallback(() => history.push(ROUTES.DESIGNER_NEW), [
    history,
  ]);

  useEffect(() => {
    fetchDoodles();
  }, [fetchDoodles]);

  return (
    <>
      <Gallery items={doodle.doodles} edit={editDoodle} delete={deleteDoodle} />
      <Fab onClick={gotoDesigner} />
    </>
  );
};

export default Home;
