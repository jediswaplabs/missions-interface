import styled from 'styled-components';

import { cardHeaderCover, gradientBorderMixin, widgetBoxMixin } from '../../../resources/styles/mixins';
import { getLinearGradientProperty } from '../../../resources/styles/functions';

const BoxContainer = styled.div`
  ${widgetBoxMixin({ borderRadius: '16px' })}
  ${gradientBorderMixin({ borderRadius: '16px' })}
`;

const Cover = styled.div`
  ${cardHeaderCover({})}
`;

const AccountInfoContainer = styled.div`
  padding: 0 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AccountAvatar = styled.div`
  margin-top: -50px;
  margin-bottom: 35px;
`;
const AccountAddress = styled.div`
  width: 100%;
  margin-bottom: 16px;
  text-align: center;
`;
const AccountControls = styled.div`
  margin-bottom: 18px;
  width: 100%;

  .account-controls-item {
    width: 50%;
    text-align: center;
  }
`;

const SwitchAccount = styled.div`
  width: 100%;
  //max-width: 200px;
  margin-bottom: 20px;
`;

const WalletContainer = styled.div`
  padding: 20px 32px;

  border-image-slice: 1;
  border-top: 2px solid;
  border-image-source: ${getLinearGradientProperty({
    angle: 95,
    baseColor1: '#29AAFD',
    baseColor1Start: '8%',
    baseColor2: '#FF00E9',
    baseColor2Start: '105%',
  })};
`;

export {
  BoxContainer,
  Cover,
  AccountInfoContainer,
  WalletContainer,
  AccountAvatar,
  AccountAddress,
  AccountControls,
  SwitchAccount,
};
