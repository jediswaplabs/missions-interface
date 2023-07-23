import styled from 'styled-components';

import { widgetBoxMixin } from '../../resources/styles/mixins';

const ProfileContainer = styled.div`
  ${widgetBoxMixin({ borderRadius: '16px' })};
  border: 2px solid #FFFFFF;
  box-shadow: inset 0px 30.0211px 43.1072px -27.7118px rgba(255, 255, 255, 0.5), inset 0px 5.38841px 8.46749px -3.07909px #FFFFFF, inset 0px -63.1213px 52.3445px -49.2654px rgba(96, 68, 145, 0.3), inset 0px 75.4377px 76.9772px -36.9491px rgba(202, 172, 255, 0.3), inset 0px 3.07909px 13.8559px rgba(154, 146, 210, 0.3), inset 0px 0.769772px 30.7909px rgba(227, 222, 255, 0.2);
  backdrop-filter: blur(38.4886px);
`;

const ProfileContainerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
`;

const ProfileContainerContent = styled.div`
  padding: 0 24px 45px;

  .swiper-wrapper {
    width: 200px;
  }
`;

export {
  ProfileContainer,
  ProfileContainerHeader,
  ProfileContainerContent,
};
