import styled, { createGlobalStyle, css } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  *:focus-visible {
    outline: none;
  }

  html {
    box-sizing: border-box;
    -ms-overflow-style: scrollbar;
    background: linear-gradient(108.58deg,#03001E 20.7%,#EC38BC 36.65%,#7303C0 57.02%,#2A3EF5 71.08%,#38742F 93.32%);
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 14px;
  }

  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(66.46deg,#03001E 24.27%,rgba(3,0,30,0.612102) 57.29%,rgba(3,0,30,0) 100%);
    background-repeat: no-repeat;
    background-size: cover;
  }

  img {
    max-width: 100%;
  }

  a {
    text-decoration: none;
  }
`;

const ApplicationContainer = styled.div`

`;

export {
  ApplicationContainer,
};

export default GlobalStyle;
