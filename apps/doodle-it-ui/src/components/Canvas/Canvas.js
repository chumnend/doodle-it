import React, { forwardRef } from 'react';
import * as Styles from './styles';

const Canvas = (props, ref) => {
  return (
    <Styles.Canvas onClick={(e) => e.stopPropagation()}>
      <canvas ref={ref}>Not supported by browser.</canvas>
    </Styles.Canvas>
  );
};

export default forwardRef(Canvas);
