import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';
import Canvas from '../Canvas';
import * as Styles from './styles';

const fabricCanvas = new fabric.StaticCanvas();

const GalleryCard = (props) => {
  const canvasRef = useRef();

  useEffect(() => {
    // load doodle content
    fabricCanvas.initialize(canvasRef.current, {
      width: props.width,
      height: props.height,
    });
    fabricCanvas.loadFromJSON(props.content);

    // scale down the doodle
    const zoom = 200 / props.width;

    fabricCanvas.setZoom(zoom);
    fabricCanvas.setWidth(200);
    fabricCanvas.setHeight(zoom * props.height);
    fabricCanvas.renderAll();
  }, [props]);

  return (
    <Styles.GalleryCard>
      <Canvas ref={canvasRef} />
      <Styles.Content>
        <Styles.Title>{props.title}</Styles.Title>
        <Styles.Icons>
          <Styles.Icon className="material-icons" onClick={props.edit}>
            edit
          </Styles.Icon>
          <Styles.Icon className="material-icons" onClick={props.delete}>
            delete
          </Styles.Icon>
        </Styles.Icons>
      </Styles.Content>
    </Styles.GalleryCard>
  );
};

GalleryCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  edit: PropTypes.func,
  delete: PropTypes.func,
};

export default GalleryCard;
