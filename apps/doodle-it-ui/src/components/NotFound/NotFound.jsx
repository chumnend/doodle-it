import { NavLink } from 'react-router';

import Hero from './components/Hero';
import HeroTitle from './components/HeroTitle';
import HeroSubtitle from './components/HeroSubtitle';

import { path } from '../../helpers/constants';

const NotFound = () => {
  return (
    <>
      <Hero>
        <HeroTitle>Sorry, this page does not exist</HeroTitle>
        <HeroSubtitle>
          <NavLink to={path.landing}>Return to Home</NavLink>
        </HeroSubtitle>
      </Hero>
    </>
  );
};
export default NotFound
