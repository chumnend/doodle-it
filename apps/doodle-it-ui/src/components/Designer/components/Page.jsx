
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { device, layout } from '../../../helpers/themes';

export const StyledPage = styled.div`
  width: 100%;
  height: calc(100vh - ${layout.navHeight});
  display: flex;
  flex-direction: column;

  @media all and (min-width: ${device.md}) {
    flex-direction: row;
  }
`;

const Page = (props) => {
  return <StyledPage data-testid='page'>{props.children}</StyledPage>;
};

Page.propTypes = {
  children: PropTypes.node,
};

export default Page;
