import styled from 'styled-components';
import { color } from '../../themes';

export const GalleryCard = styled.div`
  width: 200px;
  height: auto;
  background: ${color.white};
  box-shadow: 0px 0px 3px 1px rgb(204, 204, 204);
  border-radius: 10px;
`;

export const Content = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.p`
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: 700;
`;

export const Icons = styled.div`
  display: flex;
  gap: 0.3rem;
`;

export const Icon = styled.i`
  cursor: pointer;
  color: ${color.black};
  &:hover {
    color: ${color.darkgrey};
  }
`;
