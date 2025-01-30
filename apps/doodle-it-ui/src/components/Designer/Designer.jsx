import { useState, useEffect, useCallback } from 'react';
import { fabric } from 'fabric';
import { useParams, useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

import Contextbar from './components/Contextbar';
import Canvas from './components/Canvas';
import CanvasArea from './components/CanvasArea';
import Loader from './components/Loader';
import ModalSelector from './components/ModalSelector';
import Page from './components/Page';
import Toolbar from './components/Toolbar';
import Workspace from './components/Workspace';

import {
  canvasSaveRequest,
  canvasLoadRequest,
  canvasClear,
} from '../../helpers/store/actions';

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
const DEFAULT_BACKGROUND_COLOR = '#f2f2f2';
const DEFAULT_PEN_THICKNESS = 2;
const DEFAULT_ZOOM_LEVEL = 1;

// enumeration for Modal
const ModalTypes = {
  NONE: 0,
  SHAPES: 1,
  CLEAR: 2,
  SAVE: 3,
  BACKGROUND: 4,
  RESIZE: 5,
};

// globally accessible fabricCanvas instance
const canvasId = 'fabricCanvas';
const fabricCanvas = new fabric.Canvas();

const selectAuthAndCanvas = createSelector(
  (state) => state.auth,
  (state) => state.canvas,
  (auth, canvas) => [auth, canvas]
);

const Designer = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [fabricData, setFabricData] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [title, setTitle] = useState('Untitled');
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const [freeMode, setFreeMode] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_BACKGROUND_COLOR,
  );
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [penWidth, setPenWidth] = useState(DEFAULT_PEN_THICKNESS);
  const [zoomLevel, setZoomLevel] = useState(DEFAULT_ZOOM_LEVEL);
  const [modalType, setModalType] = useState(ModalTypes.NONE);

  const [auth, canvas] = useSelector(selectAuthAndCanvas);
  const dispatch = useDispatch();

  const saveDoodle = useCallback(
    (doodleJSON, doodleId) =>
      dispatch(canvasSaveRequest(doodleJSON, auth.id, doodleId)),
    [dispatch, auth],
  );

  const loadDoodle = useCallback(
    (doodleId) => dispatch(canvasLoadRequest(auth.id, doodleId)),
    [dispatch, auth],
  );

  const clearCanvasState = useCallback(
    () => dispatch(canvasClear()),
    [dispatch],
  );

  useEffect(() => {
    if (params.id && !canvas.data) {
      // start loading doodle
      loadDoodle(params.id);
    } else if (!params.id && canvas.data) {
      // after saving a new doodle, redirect to proper address
      navigate(`/design/${canvas.data.id}`);
    } else if (params.id && canvas.data) {
      // intialize canvas with loaded doodle
      fabricCanvas.initialize(canvasId, {
        width: canvas.data.width,
        height: canvas.data.height,
        preserveObjectStacking: true,
      });

      setTitle(canvas.data.title);
      setWidth(canvas.data.width);
      setHeight(canvas.data.height);
      fabricCanvas.loadFromJSON(canvas.data.content);
    } else {
      // initialize default canvas
      fabricCanvas.initialize(canvasId, {
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        backgroundColor: DEFAULT_BACKGROUND_COLOR,
        preserveObjectStacking: true,
      });
    }

    // set fabric event listeners
    fabricCanvas.on('mouse:up', () => {
      // on mouse up, update contents of the canvas
      setFabricData(fabricCanvas.toObject());
      setActiveObject(fabricCanvas.getActiveObject());
    });

    fabricCanvas.on('save', () => {
      // save the state of the canvas when prompted
      setFabricData(fabricCanvas.toObject());
      setActiveObject(fabricCanvas.getActiveObject());
      fabricCanvas.renderAll();
    });

    // initialize fabric
    setFabricData(fabricCanvas);
  }, [params.id, navigate, canvas.data, loadDoodle, clearCanvasState]);

  // clear canvas redux on page change
  useEffect(() => {
    return () => {
      clearCanvasState();
    };
  }, [clearCanvasState]);

  // Toolbar Commands =========================================================
  const toggleFreeMode = () => {
    // set canvas for free drawing or select mode
    if (!freeMode) {
      // deselect any active objects
      deselectObjects();

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

  const addLine = () => {
    // add a line element to the canvas
    let coords = [0, 0, 100, 100];
    let line = new fabric.Line(coords, {
      fill: color,
      stroke: color,
      strokeWidth: 2,
    });

    fabricCanvas.add(line);
    fabricCanvas.fire('save');
    closeModal();
  };

  const addCircle = () => {
    // add a circle element to the canvas
    let circle = new fabric.Circle({
      radius: 20,
      fill: color,
    });

    fabricCanvas.add(circle);
    fabricCanvas.fire('save');
    closeModal();
  };

  const addRect = () => {
    // add a rectangle element to the canvas
    let rect = new fabric.Rect({
      width: 50,
      height: 50,
      fill: color,
    });

    fabricCanvas.add(rect);
    fabricCanvas.fire('save');
    closeModal();
  };

  const addTriangle = () => {
    // add a triangle to the canvas
    let triangle = new fabric.Triangle({
      width: 50,
      height: 50,
      fill: color,
    });

    fabricCanvas.add(triangle);
    fabricCanvas.fire('save');
    closeModal();
  };

  const addText = () => {
    // add text box to the page
    let text = new fabric.Textbox('Type here...', {
      fill: color,
      editable: true,
      fontSize: 20,
    });

    fabricCanvas.add(text);
    fabricCanvas.fire('save');
    closeModal();
  };

  const changeBackgroundColor = (color) => {
    // changes the background color
    fabricCanvas.setBackgroundColor(color);
    setBackgroundColor(color);
    fabricCanvas.fire('save');

    // close modal window
    closeModal();
  };

  const zoomIn = () => {
    setZoomLevel(prevZoomLevel => Math.max(prevZoomLevel + 0.1), 2.0);
  }

  const zoomOut = () => {
    setZoomLevel(prevZoomLevel => Math.min(prevZoomLevel - 0.1), 0.1);
  }

  const changeCanvasSize = (width, height) => {
    // change the size of the canvas
    fabricCanvas.setWidth(width);
    fabricCanvas.setHeight(height);
    setWidth(width);
    setHeight(height);
    fabricCanvas.fire('save');

    // with fabric canvas the outer canvas-container does not get resized, so need to do it manually
    const elements = document.getElementsByClassName('canvas-container');
    for(let i = 0; i < elements.length; i++) {
      elements[i].style.width = `${width}px`;
      elements[i].style.height = `${height}px`;
    }

    // close modal window
    closeModal();
  };

  const clearCanvas = () => {
    // clears contents of the canvas
    fabricCanvas.clear();
    fabricCanvas.setBackgroundColor(DEFAULT_BACKGROUND_COLOR);
    setBackgroundColor(DEFAULT_BACKGROUND_COLOR);
    fabricCanvas.fire('save');

    // close modal window
    closeModal();
  };

  const changeTitle = (event) => {
    setTitle(event.target.value);
  };

  const saveCanvas = () => {
    // prepare payload for saving
    const doodle = {
      title,
      content: JSON.stringify(fabricData),
      width,
      height,
    };

    // execute create or update of doodle
    if (canvas.data) {
      saveDoodle(doodle, canvas.data.id);
    } else {
      saveDoodle(doodle, null);
    }

    // close modal windows
    closeModal();
  };

  const download = () => {
    const img = fabricCanvas.toDataURL({ format: 'jpeg', quality: 0.8 });
    const link = document.createElement('a');
    link.setAttribute('href', img);
    link.setAttribute('download', `${title}.png`);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Context Bar Commands =====================================================
  const changeColor = (color) => {
    if (freeMode) {
      // change pen color
      fabricCanvas.freeDrawingBrush.color = color;
    } else {
      // change active object color
      if (activeObject.type === 'path' || activeObject.type === 'line') {
        fabricCanvas.getActiveObject().set('stroke', color);
      } else {
        fabricCanvas.getActiveObject().set('fill', color);
      }
    }

    // save color change
    setColor(color);
    fabricCanvas.fire('save');
  };

  const changePenWidth = (penWidth) => {
    // change pen width
    fabricCanvas.freeDrawingBrush.width = penWidth;
    setPenWidth(penWidth);
    fabricCanvas.fire('save');
  };

  const sendObjectToTop = () => {
    // move object to top of canvas
    fabricCanvas.bringToFront(activeObject);
    deselectObjects();
    fabricCanvas.fire('save');
  };

  const sendObjectToBottom = () => {
    // move object to bottom of canvas
    fabricCanvas.sendToBack(activeObject);
    deselectObjects();
    fabricCanvas.fire('save');
  };

  const sendObjectForward = () => {
    // move object up one level
    fabricCanvas.bringForward(activeObject);
    fabricCanvas.fire('save');
  };

  const sendObjectBackward = () => {
    // move object down one level
    fabricCanvas.sendBackwards(activeObject);
    fabricCanvas.fire('save');
  };

  const removeObject = () => {
    fabricCanvas.remove(fabricCanvas.getActiveObject());
    fabricCanvas.fire('save');
  };

  // Misc Commands ============================================================
  const deselectObjects = () => {
    // deselect any active objects
    fabricCanvas.discardActiveObject();
    fabricCanvas.renderAll();
    setActiveObject(null);
  };

  const closeModal = () => {
    setModalType(ModalTypes.NONE);
  };

  return (
    <>
      <Page>
        <Toolbar
          freeMode={freeMode}
          toggleFreeMode={toggleFreeMode}
          openShapesModal={() => setModalType(ModalTypes.SHAPES)}
          openClearModal={() => setModalType(ModalTypes.CLEAR)}
          openSaveModal={() => setModalType(ModalTypes.SAVE)}
          openBackgroundModal={() => setModalType(ModalTypes.BACKGROUND)}
          openResizeModal={() => setModalType(ModalTypes.RESIZE)}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          download={download}
        />
        {(canvas.saving || canvas.loading) && <Loader />}
        <Workspace>
          <Contextbar
            freeMode={freeMode}
            activeObject={activeObject}
            color={color}
            changeColor={changeColor}
            penWidth={penWidth}
            changePenWidth={changePenWidth}
            sendObjectToTop={sendObjectToTop}
            sendObjectToBottom={sendObjectToBottom}
            sendObjectForward={sendObjectForward}
            sendObjectBackward={sendObjectBackward}
            removeObject={removeObject}
          />
          <CanvasArea scale={zoomLevel} handleClick={deselectObjects}>
            <Canvas id={canvasId}>Not supported by browser.</Canvas>
          </CanvasArea>
        </Workspace>
      </Page>
      <ModalSelector
        options={ModalTypes}
        selected={modalType}
        close={closeModal}
        addLine={addLine}
        addCircle={addCircle}
        addRect={addRect}
        addTriangle={addTriangle}
        addText={addText}
        background={backgroundColor}
        changeBackgroundColor={changeBackgroundColor}
        width={width}
        height={height}
        changeCanvasSize={changeCanvasSize}
        clearCanvas={clearCanvas}
        title={title}
        changeTitle={changeTitle}
        saveCanvas={saveCanvas}
      />
    </>
  );
};

export default Designer;
