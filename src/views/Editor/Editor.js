import React from 'react';
import { fabric } from 'fabric';
import queryString from 'query-string';
import { SketchPicker as ColorPicker } from 'react-color';
import { Loader, Modal } from '../../components';
import { Doodle } from '../../services';
import './Editor.scss';

// calulate starting canvas size based on screen size
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
const DEFAULT_BACK_COLOR = '#f2f2f2';

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.Canvas();

// enumeration for Modal
const ModalTypes = {
  NONE: 0,
  SHAPES: 1,
  CLEAR: 2,
  SAVE: 3,
  SETTINGS: 4,
};

function Editor(props) {
  const [fabricData, setFabricData] = React.useState(null);
  const [activeObject, setActiveObject] = React.useState(null);
  const [title, setTitle] = React.useState('Untitled');
  const [width, setWidth] = React.useState(DEFAULT_WIDTH);
  const [height, setHeight] = React.useState(DEFAULT_HEIGHT);
  const [freeMode, setFreeMode] = React.useState(false);
  const [color, setColor] = React.useState(DEFAULT_COLOR);
  const [showPicker, setShowPicker] = React.useState(false);
  const [penWidth, setPenWidth] = React.useState(DEFAULT_PEN_THICKNESS);
  const [showPenSlider, setShowPenSlider] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const [modalType, setModal] = React.useState(ModalTypes.NONE);
  const [resizeWidth, setResizeWidth] = React.useState(DEFAULT_WIDTH);
  const [resizeHeight, setResizeHeight] = React.useState(DEFAULT_HEIGHT);
  const cRef = React.useRef();

  React.useEffect(() => {
    // initialize fabric canvas
    const onLoad = async () => {
      const params = queryString.parse(props.location.search);
      if (params.id !== undefined) {
        // load doodle from doodle API
        let loaded;

        try {
          loaded = await Doodle.getOne(props.user.id, params.id);

          // load content to the fabric canvas
          fabricCanvas.initialize(cRef.current, {
            width: loaded.width,
            height: loaded.height,
            backgroundColor: DEFAULT_BACK_COLOR,
          });

          setTitle(loaded.title);
          setWidth(loaded.width);
          setHeight(loaded.height);
          fabricCanvas.loadFromJSON(loaded.content);
        } catch (error) {
          alert(error);
        }
      } else {
        // initialize fabric canvas
        fabricCanvas.initialize(cRef.current, {
          width: DEFAULT_WIDTH,
          height: DEFAULT_HEIGHT,
          backgroundColor: DEFAULT_BACK_COLOR,
        });
      }

      // set fabric event listeners
      fabricCanvas.on('mouse:up', (options) => {
        // on mouse up, update contents of the canvas
        setFabricData(fabricCanvas.toObject());
        setActiveObject(fabricCanvas.getActiveObject());
        setShowPicker(false);
      });

      fabricCanvas.on('save', () => {
        // save the state of the canvas when prompted
        setFabricData(fabricCanvas.toObject());
        setActiveObject(fabricCanvas.getActiveObject());
        fabricCanvas.renderAll();
      });

      // save initial canvas
      setFabricData(fabricCanvas);
      setLoading(false);
    };

    onLoad();

    return () => {
      cRef.current = false;
    };
  }, [props.user.id, props.location.search]);

  /* =========== OPTIONS BAR =========== */
  const toggleMode = () => {
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

  const openModal = (value) => {
    setModal(value);
  };

  const closeModal = () => {
    setModal(ModalTypes.NONE);
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
    let text = new fabric.Text('Hello', {
      fill: color,
    });

    fabricCanvas.add(text);
    fabricCanvas.fire('save');
    closeModal();
  };

  const clearCanvas = () => {
    // clears contents of the canvas
    fabricCanvas.clear();
    fabricCanvas.setBackgroundColor(DEFAULT_BACK_COLOR);
    fabricCanvas.fire('save');

    // close modal window
    closeModal();
  };

  const saveCanvas = async () => {
    closeModal();
    setLoading(true);

    let params = queryString.parse(props.location.search);
    let payload = {
      title,
      content: JSON.stringify(fabricData),
      width,
      height,
    };

    try {
      if (params.id !== undefined) {
        // update doodle
        await Doodle.update(props.user.id, params.id, payload);
      } else {
        // save new doodle
        await Doodle.create(props.user.id, payload);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const resizeCanvas = () => {
    // set new size for the canvas
    fabricCanvas.setWidth(resizeWidth);
    fabricCanvas.setHeight(resizeHeight);
    setWidth(resizeWidth);
    setHeight(resizeHeight);
    fabricCanvas.fire('save');
    closeModal();
  };

  /* =========== CONTEXT BAR =========== */
  const handleColorChange = (color) => {
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

  const handleBringForward = () => {
    fabricCanvas.bringForward(activeObject);
    fabricCanvas.fire('save');
  };

  const handleSendToFront = () => {
    fabricCanvas.bringToFront(activeObject);
    fabricCanvas.discardActiveObject();
    setActiveObject(null);
    fabricCanvas.fire('save');
  };

  const handleSendBackwards = () => {
    fabricCanvas.sendBackwards(activeObject);
    fabricCanvas.fire('save');
  };

  const handleSendToBack = () => {
    fabricCanvas.sendToBack(activeObject);
    fabricCanvas.discardActiveObject();
    setActiveObject(null);
    fabricCanvas.fire('save');
  };

  const handlePenWidthChange = (event) => {
    const newPenWidth = parseInt(event.target.value); // convert string to number
    fabricCanvas.freeDrawingBrush.width = newPenWidth;
    setPenWidth(newPenWidth);
    fabricCanvas.fire('save');
  };

  const removeObject = () => {
    // remove current active object from the canvas
    fabricCanvas.remove(fabricCanvas.getActiveObject());
    fabricCanvas.fire('save');
  };

  return (
    <main className="Editor">
      <section className="Editor-options">
        <button
          className={freeMode ? 'active' : 'inactive'}
          onClick={toggleMode}
          title="Activate the pen"
        >
          <span className="material-icons">edit</span>
          <p>Draw</p>
        </button>
        <button
          onClick={() => openModal(ModalTypes.SHAPES)}
          title="Add a shape to the canvas"
        >
          <span className="material-icons">extension</span>
          <p>Shapes</p>
        </button>
        <div style={{ flexGrow: 1 }} />
        <button
          onClick={() => openModal(ModalTypes.CLEAR)}
          title="Clear the canvas"
        >
          <span className="material-icons">delete_forever</span>
          <p>Clear</p>
        </button>
        <button
          onClick={() => openModal(ModalTypes.SAVE)}
          title="Save this doodle"
        >
          <span className="material-icons">save</span>
          <p>Save</p>
        </button>
        <button
          onClick={() => openModal(ModalTypes.SETTINGS)}
          title="Modify canvas settings"
        >
          <span className="material-icons">settings</span>
          <p>Settings</p>
        </button>
      </section>

      {isLoading && <Loader />}
      <div className="Editor-workspace">
        <section className="Editor-context">
          {activeObject && (
            <div className="Editor-context-container">
              <div className="Editor-context-left">
                <div className="Editor-context-item">
                  <div
                    style={{
                      height: 30,
                      width: 30,
                      background:
                        activeObject.get('fill') || activeObject.get('stroke'),
                      cursor: 'pointer',
                    }}
                    onClick={() => setShowPicker(!showPicker)}
                  />
                  <div>
                    {activeObject.get('fill') !== null
                      ? activeObject.get('fill').toUpperCase()
                      : activeObject.get('stroke').toUpperCase()}
                  </div>
                  {showPicker && (
                    <div style={{ position: 'absolute', zIndex: 2, top: 45 }}>
                      <ColorPicker color={color} onChange={handleColorChange} />
                    </div>
                  )}
                </div>
                <div className="Editor-context-item">
                  <button onClick={handleBringForward}>
                    <i className="material-icons">keyboard_arrow_up</i>
                  </button>
                </div>
                <div className="Editor-context-item">
                  <button onClick={handleSendToFront}>
                    <i className="material-icons">flip_to_front</i>
                  </button>
                </div>
                <div className="Editor-context-item">
                  <button onClick={handleSendBackwards}>
                    <i className="material-icons">keyboard_arrow_down</i>
                  </button>
                </div>
                <div className="Editor-context-item">
                  <button onClick={handleSendToBack}>
                    <i className="material-icons">flip_to_back</i>
                  </button>
                </div>
              </div>
              <div className="Editor-context-right">
                <div className="Editor-context-item">
                  <button onClick={removeObject}>
                    <i className="material-icons">delete</i>
                  </button>
                </div>
              </div>
            </div>
          )}
          {freeMode && (
            <div className="Editor-context-container">
              <div className="Editor-context-item">
                <div
                  style={{
                    height: 30,
                    width: 30,
                    background: fabricCanvas.freeDrawingBrush.color,
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowPicker(!showPicker)}
                />
                <div>{fabricCanvas.freeDrawingBrush.color.toUpperCase()}</div>
                {showPicker && (
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: 2,
                      top: 45,
                    }}
                  >
                    <ColorPicker color={color} onChange={handleColorChange} />
                  </div>
                )}
              </div>
              <div className="Editor-context-item">
                <button onClick={() => setShowPenSlider(!showPenSlider)}>
                  <i className="material-icons">line_weight</i>
                </button>
                {showPenSlider && (
                  <div
                    style={{
                      position: 'absolute',
                      zIndex: 2,
                      top: 45,
                      right: 0,
                      background: 'white',
                      padding: '5px',
                      fontSize: '14px',
                    }}
                  >
                    <div>Pen Size: {penWidth}</div>
                    <input
                      type="range"
                      id="penSlider"
                      min={1}
                      max={10}
                      step={1}
                      value={penWidth}
                      onChange={handlePenWidthChange}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        <section className="Editor-canvas">
          <div className="Editor-canvas-container">
            <canvas ref={cRef}>Not supported by browser.</canvas>
          </div>
        </section>
      </div>

      <Modal show={modalType} close={closeModal}>
        {modalType === ModalTypes.SHAPES && (
          <div className="Editor-ShapeModal">
            <button onClick={addLine} title="Add a line element">
              <span className="line" />
            </button>
            <button onClick={addCircle} title="Add a circle element">
              <span className="circle" />
            </button>
            <button onClick={addRect} title="Add a rectangle element">
              <span className="rectangle" />
            </button>
            <button onClick={addTriangle} title="Add a triangle element">
              <span className="triangle" />
            </button>
            <button onClick={addText} title="Add a text element">
              <span className="material-icons">title</span>
            </button>
          </div>
        )}
        {modalType === ModalTypes.CLEAR && (
          <div className="Editor-ClearModal">
            <h2>
              WARNING: This will clear all items on the canvas. Are you sure?
            </h2>
            <div>
              <button onClick={clearCanvas}>Clear All</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )}
        {modalType === ModalTypes.SAVE && (
          <div className="Editor-SaveModal">
            <div className="form-group">
              <label htmlFor="title">Doodle Name</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="Enter title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <button onClick={saveCanvas}>Save</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        )}
        {modalType === ModalTypes.SETTINGS && (
          <div className="Editor-SettingsModal">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                value={title}
                placeholder="Enter title"
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="resizeWidth">New Width</label>
              <input
                type="number"
                id="resizeWidth"
                name="resizeWidth"
                placeholder="Enter new width..."
                value={resizeWidth}
                onChange={(event) => setResizeWidth(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resizeHeight">New Height</label>
              <input
                type="number"
                id="resizeHeight"
                name="resizeHeight"
                placeholder="Enter new height..."
                value={resizeHeight}
                onChange={(event) => setResizeHeight(event.target.value)}
              />
            </div>
            <button
              disabled={resizeWidth <= 0 || resizeHeight <= 0}
              onClick={resizeCanvas}
            >
              Resize
            </button>

            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </main>
  );
}

export default Editor;
