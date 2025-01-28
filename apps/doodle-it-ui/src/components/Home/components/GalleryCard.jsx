import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Canvas from './Canvas';

import { color, layout } from '../../../helpers/themes';

export const Card = styled.div`
  width: ${layout.cardSize};
  height: auto;
  background: ${color.white};
  box-shadow: 0px 0px 3px 1px rgb(204, 204, 204);
  border-radius: 10px;
`;

export const Content = styled.div`
  width: ${layout.cardSize};
  height: ${layout.cardSize};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Details = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: 700;
`;

export const Icons = styled.div`
  display: flex;
  gap: 0.3rem;
`;

export const Icon = styled.i`
  cursor: pointer;
  color: ${color.black};
  &:hover {
    color: ${color.darkgrey};
  }
`;

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
    <Card>
      <Content>
        <Canvas ref={canvasRef} />
      </Content>
      <Details>
        <Title>{props.title}</Title>
        <Icons>
          <Icon className="material-icons" onClick={props.edit}>
            edit
          </Icon>
          <Icon className="material-icons" onClick={props.delete}>
            delete
          </Icon>
        </Icons>
      </Details>
    </Card>
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