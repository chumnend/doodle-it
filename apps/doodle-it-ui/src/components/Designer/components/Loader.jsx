import styled from 'styled-components';

import { color } from '../../../helpers/themes';

export const StyledLoader = styled.div`
  width: 50px;
  height: 50px;
  border: 8px solid ${color.darkgrey};
  border-top: 8px solid ${color.ebony};
  border-radius: 50%;
  animation: spin 2s linear infinite;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = () => {
  return <StyledLoader />;
};

export default Loader;
