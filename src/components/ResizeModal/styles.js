import styled from 'styled-components';
import { color } from '../../themes';

export const Header = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const Body = styled.div`
  text-align: center;
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

export const InputGroup = styled.div`
  margin: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  color: ${color.black};
`;

export const Label = styled.label`
  text-transform: capitalize;
  font-size: 0.9rem;
  font-family: inherit;
`;

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  padding: 0.4rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${color.black};
  color: inherit;
  font-size: 1rem;
`;

