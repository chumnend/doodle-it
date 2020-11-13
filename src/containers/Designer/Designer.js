import { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Contextbar from '../../components/Contextbar';
import CanvasArea from '../../components/CanvasArea';
// import Loader from '../../components/Loader';
import ModalSelector from '../../components/ModalSelector';
import PageView from '../../components/PageView';
import Toolbar from '../../components/Toolbar';
import Workspace from '../../components/Workspace';

// calculate starting canvas size based on screen size
let calcSize;
const { innerWidth, innerHeight } = window;
if (innerWidth > innerHeight) {
  calcSize = innerHeight > 500 ? 500 : innerHeight * 0.8;
} else {
  calcSize = innerWidth > 500 ? 500 : innerWidth * 0.8;
}

// default canvas values
const DEFAULT_WIDTH = calcSize;
const DEFAULT_HEIGHT = calcSize;
// const DEFAULT_COLOR = '#000002';
// const DEFAULT_PEN_THICKNESS = 2;
const DEFAULT_BACK_COLOR = '#f2f2f2';

// enumeration for Modal
const ModalTypes = {
  NONE: 0,
  SHAPES: 1,
  CLEAR: 2,
  SAVE: 3,
  SETTINGS: 4,
};

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.Canvas();

const Designer = () => {
  const canvasRef = useRef();

  // const [fabricData, setFabricData] = useState(null);
  // const [activeObject, setActiveObject] = useState(null);
  // const [title, setTitle] = useState('Untitled');
  // const [width, setWidth] = useState(DEFAULT_WIDTH);
  // const [height, setHeight] = useState(DEFAULT_HEIGHT);
  // const [freeMode, setFreeMode] = useState(false);
  // const [color, setColor] = useState(DEFAULT_COLOR);
  // const [showPicker, setShowPicker] = useState(false);
  // const [penWidth, setPenWidth] = useState(DEFAULT_PEN_THICKNESS);
  // const [showPenSlider, setShowPenSlider] = useState(false);
  const [modalType, setModalType] = useState(ModalTypes.NONE);
  // const [resizeWidth, setResizeWidth] = useState(DEFAULT_WIDTH);
  // const [resizeHeight, setResizeHeight] = useState(DEFAULT_HEIGHT);

  useEffect(() => {
    fabricCanvas.initialize(canvasRef.current, {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      backgroundColor: DEFAULT_BACK_COLOR,
    });

    return () => {
      canvasRef.current = false;
    };
  }, []);

  return (
    <>
      <PageView>
        <Toolbar />
        <Workspace>
          <Contextbar />
          <CanvasArea>
            <canvas ref={canvasRef}>Not supported by browser.</canvas>
          </CanvasArea>
        </Workspace>
      </PageView>
      <ModalSelector type={modalType} action={(type) => setModalType(type)} />
    </>
  );
};

export default Designer;
