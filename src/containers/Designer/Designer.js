import { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import Contextbar from '../../components/Contextbar';
import CanvasArea from '../../components/CanvasArea';
// import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
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

// globally accessible fabricCanvas instance
const fabricCanvas = new fabric.Canvas();

const Designer = () => {
  const canvasRef = useRef();
  const [showModal, setShowModal] = useState(true);

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
          <Modal show={showModal} close={() => setShowModal(false)}>
            <p>test</p>
          </Modal>
        </Workspace>
      </PageView>
    </>
  );
};

export default Designer;
