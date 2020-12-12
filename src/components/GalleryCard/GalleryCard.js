import PropTypes from 'prop-types';
import * as Styles from './styles';

const GalleryCard = (props) => {
  return (
    <Styles.GalleryCard>
      <Styles.Image src={''} alt={props.title} />
      <Styles.Content>
        <Styles.Title>{props.title}</Styles.Title>
        <Styles.Icons>
          <Styles.Icon className="material-icons" onClick={props.edit}>
            edit
          </Styles.Icon>
          <Styles.Icon className="material-icons" onClick={props.delete}>
            delete
          </Styles.Icon>
        </Styles.Icons>
      </Styles.Content>
    </Styles.GalleryCard>
  );
};

GalleryCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  edit: PropTypes.func,
  delete: PropTypes.func,
};

export default GalleryCard;
