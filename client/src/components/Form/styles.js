import styled from 'styled-components';
import { device, color } from '../../themes';

export const Form = styled.form`
  width: 90%;
  max-width: 480px;
  margin: 2rem auto;
  padding: 2rem 1rem;
  background: ${color.ebony};
  color: ${color.white};
  border-radius: 10px;

  p {
    text-align: center;
  }

  @media all and (min-width: ${device.md}) {
    padding: 2rem;
    margin: 4rem auto;
  }
`;
