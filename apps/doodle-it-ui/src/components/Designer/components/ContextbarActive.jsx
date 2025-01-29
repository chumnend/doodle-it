import { useState } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker as ColorPicker } from 'react-color';
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

const ActiveContextbar = (props) => {
  const [showPicker, setShowPicker] = useState(false);

  const color =
    props.activeObject.get('fill') || props.activeObject.get('stroke');

  const handleChange = (color) => {
    props.changeColor(color.hex);
  };

  return (
    <StyledContainer>
      <StyledInnerContainer>
        <StyledItem>
          <StyledColorSquare
            color={color}
            onClick={() => setShowPicker(!showPicker)}
            title="Select a color"
          />
          <StyledColorCode>{color.toUpperCase()}</StyledColorCode>
          {showPicker && (
            <StyledColorPicker>
              <ColorPicker color={color} onChange={handleChange} />
            </StyledColorPicker>
          )}
        </StyledItem>
      </StyledInnerContainer>
      <StyledInnerContainer>
        <StyledItem>
          <StyledButton
            title="Move Object to Bottom Layer"
            onClick={() => props.sendObjectToBottom()}
          >
            <i className="material-icons">vertical_align_bottom</i>
          </StyledButton>
        </StyledItem>
        <StyledItem>
          <StyledButton
            title="Move Object Down One Layer"
            onClick={() => props.sendObjectBackward()}
          >
            <i className="material-icons">arrow_drop_down</i>
          </StyledButton>
        </StyledItem>
        <StyledItem>
          <StyledButton
            title="Move Object Up One Layer"
            onClick={() => props.sendObjectForward()}
          >
            <i className="material-icons">arrow_drop_up</i>
          </StyledButton>
        </StyledItem>
        <StyledItem>
          <StyledButton
            title="Move Object to Top Layer"
            onClick={() => props.sendObjectToTop()}
          >
            <i className="material-icons">vertical_align_top</i>
          </StyledButton>
        </StyledItem>
        <StyledItem>
          <StyledButton
            title="Delete Selected Object"
            onClick={() => props.removeObject()}
          >
            <i className="material-icons">delete</i>
          </StyledButton>
        </StyledItem>
      </StyledInnerContainer>
    </StyledContainer>
  );
};

ActiveContextbar.propTypes = {
  activeObject: PropTypes.object,
  changeColor: PropTypes.func,
  sendObjectToTop: PropTypes.func,
  sendObjectToBottom: PropTypes.func,
  sendObjectForward: PropTypes.func,
  sendObjectBackward: PropTypes.func,
  removeObject: PropTypes.func,
};

export default ActiveContextbar;
