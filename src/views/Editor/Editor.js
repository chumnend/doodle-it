import React from 'react';
import { fabric } from 'fabric';
import './Editor.scss';

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.Canvas();

function Editor(props) {
  const cRef = React.useRef();

  React.useEffect(() => {
    const onLoad = async () => {
      fabricCanvas.initialize(cRef.current, {
        width: 500,
        height: 500,
        backgroundColor: '#f2f2f2',
      });
    }

    onLoad();
  }, []);


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
