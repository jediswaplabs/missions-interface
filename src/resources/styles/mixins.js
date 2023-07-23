import { css } from 'styled-components';

import { boxBackground1, boxBackground2, boxBoxShadow1, boxBoxShadow2, linearGradient1 } from './constants';
import { getLinearGradientProperty } from './functions';

export const widgetBoxMixin = ({ borderRadius = '8px' }) => css`
  background: ${boxBackground1};
  box-shadow: ${boxBoxShadow1};
  border-radius: ${borderRadius};
  overflow: hidden;
`;

export const cardHeaderCover = ({ height = '95px' }) => css`
  width: 100%;
  height: ${height};
  background: ${getLinearGradientProperty({ angle: 240, baseColor1: '#1E075F', baseColor2: '#FF00E9' })};
  border-image-slice: 1;
  border-bottom: 2px solid;
  border-image-source: ${getLinearGradientProperty({
    angle: 95,
    baseColor1: '#29AAFD',
    baseColor1Start: '8%',
    baseColor2: '#FF00E9',
    baseColor2Start: '105%',
  })};
`;

export const gradientBorderMixin = ({ ignoreRelative = false, borderWidth = '2px', borderRadius = '8px', gradient = linearGradient1 }) => css`
  ${!ignoreRelative && css`position: relative;`}

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: ${borderRadius};
    padding: ${borderWidth};
    background: ${gradient};
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

export const glassEffectMixin = ({ blur = '3rem' }) => css`
  background: ${boxBackground2};
  box-shadow: ${boxBoxShadow2};
  backdrop-filter: blur(${blur});
`;
