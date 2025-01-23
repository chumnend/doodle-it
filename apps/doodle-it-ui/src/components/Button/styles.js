import styled from 'styled-components';
import { color } from '../../themes';

export const Button = styled.button`
  width: 100%;
  height: auto;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: ${color.blue};
  border: none;
  font-family: inherit;
  color: ${color.white};
  cursor: pointer;
  &:hover:not([disabled]) {
    background: ${color.white};
    color: ${color.black};
    font-weight: 700;
  }
  &:disabled {
    background: ${color.grey};
    color: ${color.white};
    cursor: not-allowed;
  }
`;
