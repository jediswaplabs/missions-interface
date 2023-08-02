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

const CircleLeft = styled.div`
  width: 769.363px;
  height: 743.717px;
  transform: rotate(-147.352deg);
  background: radial-gradient(158.99% 50% at 50.00% 50.00%, #8B78FF 0%, rgba(99, 73, 255, 0.37) 100%);
  mix-blend-mode: screen;
  filter: blur(284.8772277832031px);
  position: absolute;
  left: 0;
  z-index: -1;
`;

const CircleRight = styled.div`
  width: 448.03px;
  height: 427.97px;
  mix-blend-mode: color-dodge;
  background: radial-gradient(47.37% 47.34% at 30.18% 57.01%, #FF36C7 0%, rgba(255, 54, 199, 0.70) 100%);
  filter: blur(243.37158203125px);
  position: absolute;
  right: 200px;
  z-index: -1;
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

const HeaderLine = styled.div`
  height: 1px;
  width: 100%;
  position: absolute;
  top: 50px;
  background: linear-gradient(91deg, rgba(226, 0, 255, 0.30) 0%, rgba(75, 212, 255, 0.30) 100%);
`;

export {
  MainLayoutContainer,
  MainLayoutHeaderContainer,
  MainLayoutBodyContainer,
  MainLayoutFooterContainer,
  HeaderLine,
  CircleLeft,
  CircleRight,
};
