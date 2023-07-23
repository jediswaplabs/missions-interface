import styled, { css } from 'styled-components';

import { widgetBoxMixin } from '../../../resources/styles/mixins';

const NftCarouselContainer = styled.div`
  ${widgetBoxMixin};
`;

const NftCarouselHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 24px;
`;

const NftCarouselContent = styled.div`
  padding: 0 24px 45px;

  .swiper-wrapper {
    width: 200px;
  }
`;

export {
  NftCarouselContainer,
  NftCarouselHeader,
  NftCarouselContent,
};
