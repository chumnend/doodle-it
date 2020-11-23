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
const DEFAULT_COLOR = '#000002';
const DEFAULT_PEN_THICKNESS = 2;
const DEFAULT_BACKGROUND_COLOR = '#f2f2f2';

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

  // const [loading, setLoading] = useState(true);
  const [fabricData, setFabricData] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  // const [title, setTitle] = useState('Untitled');
  // const [width, setWidth] = useState(DEFAULT_WIDTH);
  // const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [freeMode, setFreeMode] = useState(false);
  const [color, setColor] = useState(DEFAULT_COLOR);
  // const [showPicker, setShowPicker] = useState(false);
  const [penWidth, setPenWidth] = useState(DEFAULT_PEN_THICKNESS);
  // const [showPenSlider, setShowPenSlider] = useState(false);
  const [modalType, setModalType] = useState(ModalTypes.NONE);
  // const [resizeWidth, setResizeWidth] = useState(DEFAULT_WIDTH);
  // const [resizeHeight, setResizeHeight] = useState(DEFAULT_HEIGHT);

  useEffect(() => {
    fabricCanvas.initialize(canvasRef.current, {
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      backgroundColor: DEFAULT_BACKGROUND_COLOR,
    });

    // set fabric event listeners
    fabricCanvas.on('mouse:up', (options) => {
      // on mouse up, update contents of the canvas
      setFabricData(fabricCanvas.toObject());
      setActiveObject(fabricCanvas.getActiveObject());
      // setShowPicker(false);
    });

    fabricCanvas.on('save', () => {
      // save the state of the canvas when prompted
      setFabricData(fabricCanvas.toObject());
      setActiveObject(fabricCanvas.getActiveObject());
      fabricCanvas.renderAll();
    });

    // initialize fabric
    setFabricData(fabricCanvas);

    return () => {
      canvasRef.current = false;
    };
  }, []);

  const toggleFreeMode = () => {
    // set canvas for free drawing or select mode
    if (!freeMode) {
      // deselect any active objects
      fabricCanvas.discardActiveObject();
      fabricCanvas.renderAll();
      setActiveObject(null);

      // turn free drawing mode on
      fabricCanvas.isDrawingMode = true;
      fabricCanvas.freeDrawingBrush.color = color;
      fabricCanvas.freeDrawingBrush.width = penWidth;
      setFreeMode(true);
    } else {
      fabricCanvas.isDrawingMode = false;
      setFreeMode(false);
    }
  };

  const changeColor = (color) => {
    if (freeMode) {
      // change pen color
      fabricCanvas.freeDrawingBrush.color = color.hex;
    } else {
      // change active object color
      if (activeObject.type === 'path' || activeObject.type === 'line') {
        fabricCanvas.getActiveObject().set('stroke', color.hex);
      } else {
        fabricCanvas.getActiveObject().set('fill', color.hex);
      }
    }

    // save color change
    setColor(color.hex);
    fabricCanvas.fire('save');
  };

  return (
    <>
      <PageView>
        <Toolbar
          freeMode={freeMode}
          toggleFreeMode={toggleFreeMode}
          openShapesModal={() => setModalType(ModalTypes.SHAPES)}
          openClearModal={() => setModalType(ModalTypes.CLEAR)}
          openSaveModal={() => setModalType(ModalTypes.SAVE)}
          openSettingsModal={() => setModalType(ModalTypes.SETTINGS)}
        />
        <Workspace>
          <Contextbar
            freeMode={freeMode}
            activeObject={activeObject}
            color={color}
            changeColor={changeColor}
          />
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
