import PropTypes from 'prop-types';
import GalleryCard from '../GalleryCard';
import * as Styles from './styles';

const Gallery = (props) => {
  return (
    <Styles.Gallery>
      <Styles.Container>
        {props.items.map((el) => (
          <GalleryCard key={el._id} title={el.title} content={el.content} />
        ))}
      </Styles.Container>
    </Styles.Gallery>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf(Object),
};

export default Gallery;
