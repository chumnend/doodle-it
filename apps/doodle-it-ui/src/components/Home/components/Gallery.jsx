import PropTypes from 'prop-types';
import { NavLink } from 'react-router';
import styled from 'styled-components';

import GalleryCard from './GalleryCard';

import { path } from '../../../helpers/constants';

export const StyledGallery = styled.div`
  width: 100%;
  padding: 2rem;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 0.8rem;
  justify-content: center;
`;

const Gallery = (props) => {
  let cards = props.items.map((el) => (
    <GalleryCard
      key={el._id}
      title={el.title}
      content={el.content}
      width={el.width}
      height={el.height}
      edit={() => props.edit(el._id)}
      delete={() => props.delete(el._id)}
    />
  ));

  if (cards.length === 0) {
    cards = (
      <p>
        Nothing here yet. <NavLink to={path.designer_new}>Create</NavLink> something
        now.
      </p>
    );
  }

  return (
    <StyledGallery>
      <StyledContainer>{cards}</StyledContainer>
    </StyledGallery>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf(Object),
  edit: PropTypes.func,
  delete: PropTypes.func,
};

export default Gallery;
