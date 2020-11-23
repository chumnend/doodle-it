import PropTypes from 'prop-types';
import * as Styles from './styles';

const FreeContextbar = (props) => {
  return (
    <Styles.Container>
      <Styles.InnerContainer>
        <Styles.Item>
          <Styles.Color
            color={props.color}
            onClick={() => alert('select color')}
          />
          <div>{props.color.toUpperCase()}</div>
        </Styles.Item>
      </Styles.InnerContainer>
      <Styles.InnerContainer>
        <Styles.Item>
          <Styles.Button onClick={() => alert('select pen width')}>
            <i className="material-icons">line_weight</i>
          </Styles.Button>
        </Styles.Item>
      </Styles.InnerContainer>
    </Styles.Container>
  );
};

FreeContextbar.propTypes = {
  color: PropTypes.string,
};

export default FreeContextbar;
