import styled from 'styled-components';
import { color } from '../../../themes';

export const FormGroup = styled.div`
  margin: 0.5rem 0;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  color: ${color.white};
`;

export const Label = styled.label`
  margin-bottom: 0.3rem;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
`;

export const Input = styled.input`
  height: 2rem;
  padding: 0.7rem;
  background: transparent;
  font-size: 1rem;
  font-family: inherit;
  color: inherit;
  border: none;
  border-bottom: 1px solid ${color.white};
  &:focus {
    outline: none;
  }
`;
