import { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Hero from '../../components/Hero';
import HeroTitle from '../../components/HeroTitle';
import HeroSubtitle from '../../components/HeroSubtitle';
import Gallery from '../../components/Gallery';
import * as actions from '../../store/actions';

const Console = () => {
  const [auth, doodle] = useSelector((state) => [state.auth, state.doodle]);
  const dispatch = useDispatch();
  const fetchDoodles = useCallback(
    () => dispatch(actions.doodlesRequestFetch(auth.id)),
    [dispatch, auth],
  );
  const editDoodle = (id) => alert('editing ' + id);
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
          <Link to="/design">Go to Designer</Link>
        </HeroSubtitle>
      </Hero>
      <Gallery items={doodle.doodles} edit={editDoodle} delete={deleteDoodle} />
    </>
  );
};

export default Console;
