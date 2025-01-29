import { useState } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker as ColorPicker } from 'react-color';
import Slider from 'react-input-slider';
import styled from 'styled-components';

import { color, device } from '../../../helpers/themes';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledInnerContainer = styled.div`
  display: flex;
`;

export const StyledItem = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  gap: 5px;
`;

export const StyledColorSquare = styled.div`
  height: 30px;
  width: 30px;
  background: ${(props) => props.color};
  cursor: pointer;
`;

export const StyledColorCode = styled.div`
  display: none;

  @media all and (min-width: ${device.lg}) {
    display: block;
  }
`;

export const StyledColorPicker = styled.div`
  position: absolute;
  z-index: 2;
  top: 45px;
`;

export const StyledButton = styled.button`
  color: ${color.ebony};
  font-family: inherit;
  background: none;
  border: none;
  padding: 0.5rem;
  margin: 0 0.25rem;
  outline: none;
  cursor: pointer;
  &:hover {
    background: ${color.ebony};
    color: ${color.white};
  }
`;

export const StyledPenSlider = styled.div`
  position: absolute;
  z-index: 2;
  top: 45px;
  right: 0;
  padding: 5px;
  margin-top: 5px;
  background: ${color.white};
`;

const FreeContextbar = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPenSlider, setShowPenSlider] = useState(false);

  const handleChange = (color) => {
    props.changeColor(color.hex);
  };

  return (
    <StyledContainer>
      <StyledInnerContainer>
        <StyledItem>
          <StyledColorSquare
            color={props.color}
            onClick={() => setShowPicker(!showPicker)}
            title="Select a color"
          />
          <StyledColorCode>{props.color.toUpperCase()}</StyledColorCode>
          {showPicker && (
            <StyledColorPicker>
              <ColorPicker color={props.color} onChange={handleChange} />
            </StyledColorPicker>
          )}
        </StyledItem>
      </StyledInnerContainer>
      <StyledInnerContainer>
        <StyledItem>
          <StyledButton
            title="Change Pen Width"
            onClick={() => setShowPenSlider(!showPenSlider)}
          >
            <i className="material-icons">line_weight</i>
          </StyledButton>
          {showPenSlider && (
            <StyledPenSlider>
              <Slider
                styles={{ active: { background: props.color } }}
                x={props.penWidth}
                xmin={1}
                xmax={10}
                onChange={({ x }) => props.changePenWidth(x)}
              />
            </StyledPenSlider>
          )}
        </StyledItem>
      </StyledInnerContainer>
    </StyledContainer>
  );
};

FreeContextbar.propTypes = {
  color: PropTypes.string,
  changeColor: PropTypes.func,
  penWidth: PropTypes.number,
  changePenWidth: PropTypes.func,
};

export default FreeContextbar;
