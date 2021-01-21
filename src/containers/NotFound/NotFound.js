import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero';
import HeroTitle from '../../components/HeroTitle';
import HeroSubtitle from '../../components/HeroSubtitle';
import * as ROUTES from '../../constants/routes';

const NotFound = () => {
  return (
    <>
      <Hero>
        <HeroTitle>Sorry, this page does not exist</HeroTitle>
        <HeroSubtitle>
          <Link to={ROUTES.LANDING}>Return to Home</Link>
        </HeroSubtitle>
      </Hero>
    </>
  );
};

export default NotFound;
