import PageView from '../../components/PageView';

const Designer = () => {
  return (
    <>
      <PageView>
        <div className="Toolbar"></div>
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
