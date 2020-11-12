import PageView from '../../components/PageView';
import Toolbar from '../../components/Toolbar';
// import Loader from '../../components/Loader';
import Workspace from '../../components/Workspace';
import Contextbar from '../../components/Contextbar';

const Designer = () => {
  return (
    <>
      <PageView>
        <Toolbar />
        <Workspace>
          <Contextbar />
          <div className="CanvasContainer">
            <canvas />
          </div>
        </Workspace>
      </PageView>
    </>
  );
};

export default Designer;
