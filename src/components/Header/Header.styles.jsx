import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const ActiveLink = styled(Link)`
  p {
    font-family: 'Avenir LT Std';
    font-style: normal;
    font-weight: 750;
    font-size: 16px;
    line-height: 100%; 
    text-align: center;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; text-fill-color: transparent;
    text-shadow: 0px 0px 18.9113px rgba(49, 255, 156, 0.7), 0px 0px 73.2115px rgba(49, 255, 156, 0.5);
  }
`;
const HeaderContainer = styled(Box)`
`;

const HeaderInnerContainer = styled.div`

`;

const HeaderWallet = styled.div`
  display: flex;
`;

const HeaderLogo = styled(RouterLink)`
  display: inline-block;
  font-size: 0;
`;

const AccountElement = styled.div`
  display: flex;
  flex: 0;
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`;

const Web3StatusConnected = styled.div`
  //display: flex;
  //flex: 0;
  //flex-direction: row;
  //align-items: center;
  //border-radius: 12px;
  //white-space: nowrap;
  //width: 100%;
  //cursor: pointer;

  //svg {
  //  margin-bottom: 4px;
  //}
`;

const Web3StatusError = styled.div`
  background-color: red;
`;

const Web3StatusConnect = styled.div`

`;

export {
  ActiveLink,
  HeaderContainer,
  HeaderInnerContainer,
  HeaderLogo,
  HeaderWallet,
  AccountElement,
  Web3StatusConnected,
  Web3StatusError,
  Web3StatusConnect,
};
