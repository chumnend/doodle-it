import * as Styles from './styles';

const CanvasArea = (props) => {
  return (
    <Styles.CanvasArea>
      <Styles.Container>{props.children}</Styles.Container>
    </Styles.CanvasArea>
  );
};

export default CanvasArea;
