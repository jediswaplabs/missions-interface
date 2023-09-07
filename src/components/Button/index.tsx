import styled from 'styled-components'
import { darken } from 'polished'

import { Button as RebassButton } from 'rebass/styled-components'

const Base = styled(RebassButton)`
  padding: ${({ padding }) => (padding ? padding : '22px 10px')};
  width: ${({ width }) => (width ? width : '100%')};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '24px')};
  line-height: 20px;
  font-weight: 800;
  text-align: center;
  border-radius: 8px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  /* border: 1px solid transparent; */
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.jediBlue};
  background: linear-gradient(95.64deg, #29aafd 8.08%, #ff00e9 105.91%);
  color: ${({ theme }) => theme.jediWhite};
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  :hover,
  :focus,
  :active {
    background: linear-gradient(95.64deg, #ff00e9 8.08%, #29aafd 105.91%);
  }
  /* &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  } */
  &:disabled {
    background: ${({ theme }) => theme.jediNavyBlue};
    mix-blend-mode: normal;
    box-shadow: inset 0px 75.4377px 76.9772px -36.9491px rgba(202, 172, 255, 0.3),
      inset 0px 3.07909px 13.8559px rgba(154, 146, 210, 0.3), inset 0px 0.769772px 30.7909px rgba(227, 222, 255, 0.2);
    border-radius: 8px;
  }
`

export const ButtonGradient = styled(ButtonPrimary)``


