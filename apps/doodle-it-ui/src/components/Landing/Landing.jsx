import { NavLink } from 'react-router';

import Container from './components/Container';
import Hero from './components/Hero';
import HeroTitle from './components/HeroTitle';
import HeroSubtitle from './components/HeroSubtitle';

import { path } from '../../helpers/constants';

const Landing = () => {
  return (
    <div data-testid="landing">
      <Hero>
        <HeroTitle>Make Something Wonderful!</HeroTitle>
        <HeroSubtitle>
          <NavLink to={path.register}>Get Started</NavLink>
        </HeroSubtitle>
      </Hero>
      <Container>
        <h2>What is this?</h2>
        <p>
          DoodleIt is a barebones graphic design application I made to
          experiment with how a graphic design tool could made and to practice
          working a larger codebase than a basic To-do app. Now it exists to be
          a living project that I return to occasionally to practice new
          concepts, I learned.
        </p>
        <br />
        <h2>How it works</h2>
        <p>
          Using DoodleIt is very simple. First, make an account. After
          registrating you will be taken to your home screen. From this page you
          can see previously saved works that you can edit or you can create
          something from scratch. From there you can go fun playing with the
          tools I implemented to create something cool. When you are done, you
          can save the image or even export it to a PNG file.
        </p>
        <br />
        <h2>How&apos;s it Built?</h2>
        <p>
          DoodleIt is made using React, Node.js and MongoDB. It is served on
          Heroku. The editor is powered using{' '}
          <a href="http://fabricjs.com/">Fabric.js</a>.
        </p>
        <br />
        <h2>Who am I?</h2>
        <p>
          My name is Nicholas Chumney. Check out my Github profile{' '}
          <a href="https://github.com/chumnend">chumnend</a>.
        </p>
      </Container>
    </div>
  )
};

export default Landing;
