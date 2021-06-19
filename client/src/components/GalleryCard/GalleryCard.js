import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fabric } from 'fabric';
import Canvas from '../Canvas';
import * as Styles from './styles';

const CARD_SIZE = 200;

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
    let zoom, width, height;

    if (props.width > props.height) {
      zoom = CARD_SIZE / props.width;
      width = CARD_SIZE;
      height = zoom * props.height;
    } else {
      zoom = CARD_SIZE / props.height;
      height = CARD_SIZE;
      width = zoom * props.width;
    }

    fabricCanvas.setZoom(zoom);
    fabricCanvas.setWidth(width);
    fabricCanvas.setHeight(height);
    fabricCanvas.renderAll();
  }, [props]);

  return (
    <Styles.GalleryCard>
      <Styles.Content>
        <Canvas ref={canvasRef} />
      </Styles.Content>
      <Styles.Details>
        <Styles.Title>{props.title}</Styles.Title>
        <Styles.Icons>
          <Styles.Icon className="material-icons" onClick={props.edit}>
            edit
          </Styles.Icon>
          <Styles.Icon className="material-icons" onClick={props.delete}>
            delete
          </Styles.Icon>
        </Styles.Icons>
      </Styles.Details>
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
