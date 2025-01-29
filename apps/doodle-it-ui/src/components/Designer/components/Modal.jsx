import PropTypes from 'prop-types';
import styled from 'styled-components';

import { color, device } from '../../../helpers/themes';

export const StyledModal = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.display};
  flex-direction: column;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
`;

export const StyledContainer = styled.div`
  padding: 1rem;
  position: fixed;
  z-index: 999;
  background: ${color.white};
  width: 70%;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media all and (min-width: ${device.lg}) {
    width: auto;
  }
`;

const Modal = (props) => {
  return (
    <StyledModal display={props.show ? 'flex' : 'none'} onClick={props.close}>
      <StyledContainer onClick={(event) => event.stopPropagation()}>
        {props.children}
      </StyledContainer>
    </StyledModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func,
  show: PropTypes.bool,
};

export default Modal;
