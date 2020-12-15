import { useState } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker as ColorPicker } from 'react-color';
import * as Styles from './styles';

const ActiveContextbar = (props) => {
  const [showPicker, setShowPicker] = useState(false);

  const color =
    props.activeObject.get('fill') || props.activeObject.get('stroke');

  const handleChange = (color) => {
    props.changeColor(color.hex);
  };

  return (
    <Styles.Container>
      <Styles.InnerContainer>
        <Styles.Item>
          <Styles.ColorSquare
            color={color}
            onClick={() => setShowPicker(!showPicker)}
          />
          <Styles.ColorCode>{color.toUpperCase()}</Styles.ColorCode>
          {showPicker && (
            <Styles.ColorPicker>
              <ColorPicker color={color} onChange={handleChange} />
            </Styles.ColorPicker>
          )}
        </Styles.Item>
      </Styles.InnerContainer>
      <Styles.InnerContainer>
        <Styles.Item>
          <Styles.Button onClick={() => props.sendObjectToBottom()}>
            <i className="material-icons">vertical_align_bottom</i>
          </Styles.Button>
        </Styles.Item>
        <Styles.Item>
          <Styles.Button onClick={() => props.sendObjectBackward()}>
            <i className="material-icons">arrow_drop_down</i>
          </Styles.Button>
        </Styles.Item>
        <Styles.Item>
          <Styles.Button onClick={() => props.sendObjectForward()}>
            <i className="material-icons">arrow_drop_up</i>
          </Styles.Button>
        </Styles.Item>
        <Styles.Item>
          <Styles.Button onClick={() => props.sendObjectToTop()}>
            <i className="material-icons">vertical_align_top</i>
          </Styles.Button>
        </Styles.Item>
        <Styles.Item>
          <Styles.Button onClick={() => props.removeObject()}>
            <i className="material-icons">delete</i>
          </Styles.Button>
        </Styles.Item>
      </Styles.InnerContainer>
    </Styles.Container>
  );
};

ActiveContextbar.propTypes = {
  activeObject: PropTypes.object,
  changeColor: PropTypes.func,
  sendObjectToTop: PropTypes.func,
  sendObjectToBottom: PropTypes.func,
  sendObjectForward: PropTypes.func,
  sendObjectBackward: PropTypes.func,
  removeObject: PropTypes.func,
};

export default ActiveContextbar;
