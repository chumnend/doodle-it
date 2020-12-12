import styled from 'styled-components';
import { color } from '../../themes';

export const Header = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  width: 80%;
  margin: 0.5rem auto;
  padding: 0.5rem;
  text-transform: capitalize;
  text-align: center;
  color: ${color.black};
  background: transparent;
  border: 1px solid ${color.black};
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;

  &:hover {
    color: ${color.white};
    background: ${color.black};
  }
`;
