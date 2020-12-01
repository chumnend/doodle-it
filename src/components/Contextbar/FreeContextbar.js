import { useState } from 'react';
import PropTypes from 'prop-types';
import { BlockPicker as ColorPicker } from 'react-color';
import Slider from 'react-input-slider';
import * as Styles from './styles';

const FreeContextbar = (props) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPenSlider, setShowPenSlider] = useState(false);

  return (
    <Styles.Container>
      <Styles.InnerContainer>
        <Styles.Item>
          <Styles.ColorSquare
            color={props.color}
            onClick={() => setShowPicker(!showPicker)}
          />
          <Styles.ColorCode>{props.color.toUpperCase()}</Styles.ColorCode>
          {showPicker && (
            <Styles.ColorPicker>
              <ColorPicker color={props.color} onChange={props.changeColor} />
            </Styles.ColorPicker>
          )}
        </Styles.Item>
      </Styles.InnerContainer>
      <Styles.InnerContainer>
        <Styles.Item>
          <Styles.Button onClick={() => setShowPenSlider(!showPenSlider)}>
            <i className="material-icons">line_weight</i>
          </Styles.Button>
          {showPenSlider && (
            <Styles.PenSlider>
              <Slider
                styles={{ active: { background: props.color } }}
                x={props.penWidth}
                xmin={1}
                xmax={10}
                onChange={({ x }) => props.changePenWidth(x)}
              />
            </Styles.PenSlider>
          )}
        </Styles.Item>
      </Styles.InnerContainer>
    </Styles.Container>
  );
};

FreeContextbar.propTypes = {
  color: PropTypes.string,
  changColor: PropTypes.func,
  penWidth: PropTypes.number,
  changePenWidth: PropTypes.func,
};

export default FreeContextbar;
