import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import HeroTitle from '../../components/Hero/HeroTitle';
import HeroSubtitle from '../../components/Hero/HeroSubtitle';

const Console = () => {
  return (
    <>
      <Hero>
        <HeroTitle>Create without limits.</HeroTitle>
        <HeroSubtitle>
          <Link to="/design">Go to Designer</Link>
        </HeroSubtitle>
      </Hero>
    </>
  );
};

export default Console;
