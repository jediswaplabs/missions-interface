import * as React from 'react';
import { styled, css } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { getLinearGradientProperty } from '../../resources/styles/functions';
import { widgetBoxMixin } from '../../resources/styles/mixins';

const GradientTypeButton = styled(LoadingButton)`
  background: ${getLinearGradientProperty({
    angle: 95, baseColor1: '#29AAFD', baseColor1Start: '8%', baseColor2: '#FF00E9', baseColor2Start: '105%',
  })};
  color: ${({ theme }) => theme.palette.common.white};
  transition: background-position 0.1s;

  &:hover {
    background-position: 100%
  }

  &.Mui-disabled {
    ${widgetBoxMixin}
  }

  svg {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

const GradientButton = ({ children, ...props }) => (<GradientTypeButton {...props} variant="contained">{children}</GradientTypeButton>);

export default GradientButton;
