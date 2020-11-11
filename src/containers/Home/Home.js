import Hero from '../../components/Hero';
import HeroTitle from '../../components/Hero/HeroTitle';
import HeroSubtitle from '../../components/Hero/HeroSubtitle';

const Home = () => {
  return (
    <>
      <Hero>
        <HeroTitle>Make Something Wonderful!</HeroTitle>
        <HeroSubtitle>Create simple designs with DoodleIt.</HeroSubtitle>
      </Hero>
    </>
  );
};

export default Home;
