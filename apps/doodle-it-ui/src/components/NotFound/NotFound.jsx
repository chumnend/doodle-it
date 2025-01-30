import { NavLink } from 'react-router';

import Hero from './components/Hero';
import HeroTitle from './components/HeroTitle';
import HeroSubtitle from './components/HeroSubtitle';

import { path } from '../../helpers/constants';

const NotFound = () => {
  return (
    <div data-testid="notFound">
      <Hero>
        <HeroTitle>Sorry, this page does not exist</HeroTitle>
        <HeroSubtitle>
          <NavLink to={path.landing}>Return to Home</NavLink>
        </HeroSubtitle>
      </Hero>
    </div>
  );
};
export default NotFound
