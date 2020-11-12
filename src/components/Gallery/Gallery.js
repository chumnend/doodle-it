import PropTypes from 'prop-types';
import GalleryCard from './GalleryCard';
import * as Styles from './styles';

const Gallery = (props) => {
  return (
    <Styles.Gallery>
      <Styles.Container>
        {props.items.map((el) => (
          <GalleryCard key={el.id} name={el.name} image={el.image} />
        ))}
      </Styles.Container>
    </Styles.Gallery>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf(Object),
};

export default Gallery;
