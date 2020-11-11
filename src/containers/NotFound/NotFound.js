import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import HeroTitle from '../../components/Hero/HeroTitle';
import HeroSubtitle from '../../components/Hero/HeroSubtitle';

const NotFound = () => {
  return (
    <div>
      <Hero>
        <HeroTitle>Sorry, this page does not exist</HeroTitle>
        <HeroSubtitle>
          <Link to="/">Return to Home</Link>
        </HeroSubtitle>
      </Hero>
    </div>
  );
};

export default NotFound;
