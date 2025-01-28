import { forwardRef } from 'react';

const Canvas = (props, ref) => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <canvas ref={ref}>Not supported by browser.</canvas>
    </div>
  );
};

export default forwardRef(Canvas);
