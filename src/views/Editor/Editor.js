import React from 'react';
import { fabric } from 'fabric';
import queryString from 'query-string';
import { BlockPicker as ColorPicker } from 'react-color';
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

  const clearCanvas = () => {
    // clears contents of the canvas
    fabricCanvas.clear();
    fabricCanvas.setBackgroundColor(DEFAULT_BACK_COLOR);
    fabricCanvas.fire('save');
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
  }

  const handlePenWidthChange = (event) => {
    const newPenWidth = parseInt(event.target.value); // convert string to number
    fabricCanvas.freeDrawingBrush.width = newPenWidth;
    setPenWidth(newPenWidth);
    fabricCanvas.fire('save');
  }

  const removeObject = () => {
    // remove current active object from the canvas
    fabricCanvas.remove(fabricCanvas.getActiveObject());
    fabricCanvas.fire('save');
  }

  return (
    <main className="Editor">
      <section className="Editor-options">
        <button
          className={freeMode ? 'active' : 'inactive'}
          onClick={toggleMode}
          title="Activate the pen"
        >
          <span className="material-icons">edit</span>
          Draw
        </button>
        <button title="Add a shape to the canvas">
          <span className="material-icons">extension</span>
          Shapes
        </button>
        <div style={{ flexGrow: 1 }} />
        <button onClick={clearCanvas} title="Clear the canvas">
          <span className="material-icons">delete_forever</span>
          Clear
        </button>
        <button title="Save this doodle">
          <span className="material-icons">save</span>
          Save
        </button>
        <button title="Modify canvas settings">
          <span className="material-icons">settings</span>
          Settings
        </button>
      </section>
      {isLoading && <div className="Editor-loader" />}
      <div className="Editor-workspace">
        <section className="Editor-context">
          {activeObject && (
            <div className="Editor-context-container">
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
                <button onClick={removeObject}>
                  <i className="material-icons">delete</i>
                </button>
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
                  <i class="material-icons">line_weight</i>
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
    </main>
  );
}

export default Editor;
