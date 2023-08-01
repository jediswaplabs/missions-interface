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
    background: black;
    font-size: 14px;
  }

  body {
    padding: 0;
    margin: 0;
    min-height: 100vh;
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
