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
    }

    onLoad();
  }, [props.user.id, props.location.search]);

  return (
    <main className="Editor">
      <section className="Editor-options">
        <button>
          <span className="material-icons">edit</span>
          Draw
        </button>
        <button>
          <span className="material-icons">extension</span>
          Shapes
        </button>
        <button>
          <span className="material-icons">delete_forever</span>
          Clear
        </button>
        <button>
          <span className="material-icons">save</span>
          Save
        </button>
        <button>
          <span className="material-icons">settings</span>
          Settings
        </button>
      </section>
      {isLoading && <div className="Editor-loader" />}
      <div className="Editor-workspace">
        <section className="Editor-context">

        </section>
        <section className="Editor-canvas-background">
          <div className="Editor-canvas">
            <canvas ref={cRef}>Not supported by browser.</canvas>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Editor;
