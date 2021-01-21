import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GalleryCard from '../GalleryCard';
import * as ROUTES from '../../constants/routes';
import * as Styles from './styles';

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
        Nothing here yet. <Link to={ROUTES.DESIGNER_NEW}>Create</Link> something
        now.
      </p>
    );
  }

  return (
    <Styles.Gallery>
      <Styles.Container>{cards}</Styles.Container>
    </Styles.Gallery>
  );
};

Gallery.propTypes = {
  items: PropTypes.arrayOf(Object),
  edit: PropTypes.func,
  delete: PropTypes.func,
};

export default Gallery;
