import PageView from '../../components/PageView';
import Toolbar from '../../components/Toolbar';
// import Loader from '../../components/Loader';

const Designer = () => {
  return (
    <>
      <PageView>
        <Toolbar />
        <div className="Workspace">
          <div className="Contextbar"></div>
          <div className="CanvasContainer">
            <canvas />
          </div>
        </div>
      </PageView>
    </>
  );
};

export default Designer;
