import Hero from '../../components/Hero';
import HeroTitle from '../../components/Hero/HeroTitle';
import HeroSubtitle from '../../components/Hero/HeroSubtitle';

const Home = () => {
  return (
    <div>
      <Hero>
        <HeroTitle>Make Something Wonderful!</HeroTitle>
        <HeroSubtitle>Create simple designs with DoodleIt.</HeroSubtitle>
      </Hero>
    </div>
  );
};

export default Home;
