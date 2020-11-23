import PropTypes from 'prop-types';
import * as Styles from './styles';

const ActiveContextbar = (props) => {
  return (
    <Styles.Container>
      <Styles.InnerContainer>
        <Styles.Item>
          <Styles.Color
            color={
              props.activeObject.get('fill') || props.activeObject.get('stroke')
            }
            onClick={() => alert('select color')}
          />
          <div>
            {props.activeObject.get('fill') || props.activeObject.get('stroke')}
          </div>
        </Styles.Item>
      </Styles.InnerContainer>
      <Styles.InnerContainer>
        <Styles.Item>
          <Styles.Button onClick={() => alert('remove object')}>
            <i className="material-icons">delete</i>
          </Styles.Button>
        </Styles.Item>
      </Styles.InnerContainer>
    </Styles.Container>
  );
};

ActiveContextbar.propTypes = {
  activeObject: PropTypes.object,
};

export default ActiveContextbar;
