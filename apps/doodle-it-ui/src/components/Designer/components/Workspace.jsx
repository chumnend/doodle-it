import PropTypes from 'prop-types';
import styled from 'styled-components';

import { device, layout } from '../../../helpers/themes';

export const StyledWorkspace = styled.div`
  width: 100%;
  height: calc(100% - ${layout.toolbarHeight});

  @media all and (min-width: ${device.md}) {
    width: calc(100% - ${layout.toolbarHeight});
    height: 100%;
  }
`;

const Workspace = (props) => {
  return <StyledWorkspace data-testid='workspace'>{props.children}</StyledWorkspace>;
};

Workspace.propTypes = {
  children: PropTypes.node,
};

export default Workspace;