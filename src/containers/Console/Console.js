import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import HeroTitle from '../../components/Hero/HeroTitle';
import HeroSubtitle from '../../components/Hero/HeroSubtitle';
import Gallery from '../../components/Gallery';

const dummy_doodles = [
  { id: 1, name: 'Doodle 1', image: 'image' },
  { id: 2, name: 'Doodle 2', image: 'image' },
];

const Console = () => {
  return (
    <>
      <Hero>
        <HeroTitle>Create without limits.</HeroTitle>
        <HeroSubtitle>
          <Link to="/design">Go to Designer</Link>
        </HeroSubtitle>
      </Hero>
      <Gallery items={dummy_doodles} />
    </>
  );
};

export default Console;
