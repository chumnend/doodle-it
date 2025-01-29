import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from './Modal';

import { color, layout } from '../../../helpers/themes';

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const StyledButton = styled.button`
  width: ${layout.buttonSize};
  height: ${layout.buttonSize};
  font-size: 12px;
  font-family: inherit;
  color: ${color.ebony};
  background: ${color.white};
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${color.white};
    background: ${color.ebony};
  }
`;

export const StyledLineIcon = styled.span`
  width: 2px;
  height: calc(${layout.buttonSize} / 2);
  transform: rotate(45deg);
  background: ${color.ebony};

  ${StyledButton}:hover & {
    background: ${color.white};
  }
`;

export const StyledCircleIcon = styled.span`
  height: calc(${layout.buttonSize} / 2.5);
  width: calc(${layout.buttonSize} / 2.5);
  border-radius: 50%;
  background: ${color.ebony};

  ${StyledButton}:hover & {
    background: ${color.white};
  }
`;

export const StyledRectangleIcon = styled.span`
  height: calc(${layout.buttonSize} / 2.5);
  width: calc(${layout.buttonSize} / 2.5);
  background: ${color.ebony};

  ${StyledButton}:hover & {
    background: ${color.white};
  }
`;

export const StyledTriangleIcon = styled.span`
  width: 0;
  height: 0;
  border-left: calc(${layout.buttonSize} / 5) solid transparent;
  border-right: calc(${layout.buttonSize} / 5) solid transparent;
  border-bottom: calc(${layout.buttonSize} / 2.5) solid ${color.ebony};

  ${StyledButton}:hover & {
    border-bottom-color: ${color.white};
  }
`;

const ModalShape = (props) => {
  return (
    <Modal show close={props.close}>
      <StyledContainer>
        <StyledButton onClick={props.addText} title="Add text element">
          <span className="material-icons">title</span>
        </StyledButton>
        <StyledButton onClick={props.addLine} title="Add a line element">
          <StyledLineIcon />
        </StyledButton>
        <StyledButton onClick={props.addCircle} title="Add a circle element">
          <StyledCircleIcon />
        </StyledButton>
        <StyledButton onClick={props.addRect} title="Add a rectangle element">
          <StyledRectangleIcon />
        </StyledButton>
        <StyledButton
          onClick={props.addTriangle}
          title="Add a triangle element"
        >
          <StyledTriangleIcon />
        </StyledButton>
      </StyledContainer>
    </Modal>
  );
};

ModalShape.propTypes = {
  close: PropTypes.func,
  addLine: PropTypes.func,
  addCircle: PropTypes.func,
  addRect: PropTypes.func,
  addTriangle: PropTypes.func,
  addText: PropTypes.func,
};

export default ModalShape;