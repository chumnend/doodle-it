import PropTypes from 'prop-types';
import GalleryCard from '../GalleryCard';
import * as Styles from './styles';

const Gallery = (props) => {
  return (
    <Styles.Gallery>
      <Styles.Container>
        {props.items.map((el) => (
          <GalleryCard
            key={el._id}
            title={el.title}
            content={el.content}
            width={el.width}
            height={el.height}
            edit={() => props.edit(el._id)}
            delete={() => props.delete(el._id)}
          />
        ))}
      </Styles.Container>
    </Styles.Gallery>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf(Object),
  edit: PropTypes.func,
  delete: PropTypes.func,
};

export default Gallery;
