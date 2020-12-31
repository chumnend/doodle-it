import { useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Hero from '../../components/Hero';
import HeroTitle from '../../components/HeroTitle';
import HeroSubtitle from '../../components/HeroSubtitle';
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

  useEffect(() => {
    fetchDoodles();
  }, [fetchDoodles]);

  return (
    <>
      <Hero>
        <HeroTitle>Create without limits.</HeroTitle>
        <HeroSubtitle>
          <Link to={ROUTES.DESIGNER_NEW}>Go to Designer</Link>
        </HeroSubtitle>
      </Hero>
      <Gallery items={doodle.doodles} edit={editDoodle} delete={deleteDoodle} />
    </>
  );
};

export default Home;
