import * as Styles from './styles';

const Hero = (props) => {
  return (
    <Styles.Hero>
      <Styles.Container>{props.children}</Styles.Container>
    </Styles.Hero>
  );
};

export default Hero;
