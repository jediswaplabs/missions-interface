import styled, { css } from 'styled-components';

import { glassEffectMixin, gradientBorderMixin } from '../../../resources/styles/mixins';

const AvatarWrapper = styled.div`
  display: flex;
  width: 100px;
  height: 100px;

  ${(props) => !props.isMock && css`
    ${glassEffectMixin({})}
    ${gradientBorderMixin({})}
    padding: 8px;
    border-radius: 8px;
  `}

  ${(props) => props.size && css`
    width: ${props.size};
    height: ${props.size};
  `}

  .MuiAvatar-root {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;

export {
  AvatarWrapper,
};
