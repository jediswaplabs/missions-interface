import styled from 'styled-components';
import Box from '@mui/material/Box';

const MainLayoutHeaderContainer = styled(Box)`
  .header {
    height: 75px;
    color: #fff;
    border-bottom: 1.25px solid rgba(149,149,149,0.25);
  }
`;

const MainLayoutBodyContainer = styled(Box)`
  width: 100%;
  color: #fff;
`;

const MainLayoutFooterContainer = styled(Box)`
  color: #fff;
  height: 85px;
`;

const MainLayoutContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex-wrap: nowrap;
  max-width: 1600px;
  margin: 0 auto;

  ${MainLayoutBodyContainer} {
    flex-grow: 1;
  }
`;

export {
  MainLayoutContainer,
  MainLayoutHeaderContainer,
  MainLayoutBodyContainer,
  MainLayoutFooterContainer,
};
