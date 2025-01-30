import PropTypes from 'prop-types';
import styled from 'styled-components';

import ToolbarButton from './ToolbarButton';

import { device, color, layout } from '../../../helpers/themes';

export const StyledToolbar = styled.div`
  width: 100%;
  height: ${layout.toolbarHeight};
  background: ${color.ebony};

  @media all and (min-width: ${device.md}) {
    width: ${layout.toolbarHeight};
    height: 100%;
  }
`;

export const StyledContainer = styled.div`
  display: flex;
  gap: 5px;
  width: 93%;
  height: 100%;
  margin: 0 auto;

  @media all and (min-width: ${device.md}) {
    flex-direction: column;
  }
`;

export const StyledToolbarIcon = styled.span`
  width: 100%;
`;

export const StyledToolbarName = styled.p`
  width: 100%;
`;

const Toolbar = (props) => {
  return (
    <StyledToolbar data-testid='toolbar'>
      <StyledContainer>
        <ToolbarButton
          toggable
          active={props.freeMode}
          clicked={props.toggleFreeMode}
          title="Activate the pen"
        >
          <StyledToolbarIcon className="material-icons">
            edit
          </StyledToolbarIcon>
          <StyledToolbarName>Draw</StyledToolbarName>
        </ToolbarButton>
        <ToolbarButton
          clicked={props.openShapesModal}
          title="Add a shape to the canvas"
        >
          <StyledToolbarIcon className="material-icons">
            extension
          </StyledToolbarIcon>
          <StyledToolbarName>Shapes</StyledToolbarName>
        </ToolbarButton>
        <ToolbarButton
          clicked={props.openBackgroundModal}
          title="Modify canvas color"
        >
          <StyledToolbarIcon className="material-icons">
            palette
          </StyledToolbarIcon>
          <StyledToolbarName>Color</StyledToolbarName>
        </ToolbarButton>
        <ToolbarButton clicked={props.zoomIn} title="Zoom into the canvas">
          <StyledToolbarIcon className="material-icons">
            zoom_in
          </StyledToolbarIcon>
          <StyledToolbarName>Zoom In</StyledToolbarName>
        </ToolbarButton>
        <ToolbarButton clicked={props.zoomOut} title="Zoom out of the canvas">
          <StyledToolbarIcon className="material-icons">
            zoom_out
          </StyledToolbarIcon>
          <StyledToolbarName>Zoom Out</StyledToolbarName>
        </ToolbarButton>
        <ToolbarButton
          clicked={props.openResizeModal}
          title="Modify canvas size"
        >
          <StyledToolbarIcon className="material-icons">
            aspect_ratio
          </StyledToolbarIcon>
          <StyledToolbarName>Resize</StyledToolbarName>
        </ToolbarButton>
        <ToolbarButton clicked={props.openClearModal} title="Clear the canvas">
          <StyledToolbarIcon className="material-icons">
            delete_forever
          </StyledToolbarIcon>
          <StyledToolbarName>Clear</StyledToolbarName>
        </ToolbarButton>
        <ToolbarButton clicked={props.openSaveModal} title="Save this doodle">
          <StyledToolbarIcon className="material-icons">
            save
          </StyledToolbarIcon>
          <StyledToolbarName>Save</StyledToolbarName>
        </ToolbarButton>
        <ToolbarButton clicked={props.download} title="Download this doodle">
          <StyledToolbarIcon className="material-icons">
            get_app
          </StyledToolbarIcon>
          <StyledToolbarName>Export</StyledToolbarName>
        </ToolbarButton>
      </StyledContainer>
    </StyledToolbar>
  );
};

Toolbar.propTypes = {
  freeMode: PropTypes.bool,
  toggleFreeMode: PropTypes.func,
  openShapesModal: PropTypes.func,
  openClearModal: PropTypes.func,
  openSaveModal: PropTypes.func,
  openBackgroundModal: PropTypes.func,
  openResizeModal: PropTypes.func,
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
  download: PropTypes.func,
};

export default Toolbar;