import styled, { css } from 'styled-components';
import Box from '@mui/material/Box';

import { cardHeaderCover, gradientBorderMixin, widgetBoxMixin } from '../../../resources/styles/mixins';
import GradientButton from '../../../components/GradientButton/GradientButton';

const ModalInner = styled(Box)``;

const NextStepButton = styled(GradientButton)`
  width: 100%;
  max-width: 390px;
  height: 64px;
`;

const SliderNavigationArrow = styled.div`
  color: ${({ theme }) => theme.palette.common.white};
  display: inline-flex;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
  z-index: 1;
  user-select: none;

  svg {
    fill: ${({ theme }) => theme.palette.common.white};
  }

  &.swiper-button-disabled {
    opacity: 0.5;
  }
`;
const SliderNavigationArrowPrev = styled(SliderNavigationArrow)`
  left: 0;

  svg {
    transform: rotate(180deg);
  }
`;
const SliderNavigationArrowNext = styled(SliderNavigationArrow)`
  right: 0;
`;

const Cover = styled.div`
  ${(props) => css`
    ${cardHeaderCover({ ...(props.height ? { height: props.height } : {}) })}
  `}
`;

const StepContainerInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
`;

const SelectProfilePictureFormContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const IntroductionStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroductionStepContainerInner = styled(StepContainerInner)`
  padding-top: 0;
`;

const IntroductionStepAvatarGroups = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -60px;
  margin-bottom: 45px;

  & .avatar {
    position: relative;
    z-index: 1;
  }

  & .avatar:first-child {
    z-index: 0;
    margin-right: -15px;
  }

  & .avatar:last-child {
    z-index: 0;
    margin-left: -15px;
  }
`;

const IntroductionStepTitles = styled.div`
  text-align: center;
  max-width: 280px;
  margin-bottom: 30px;
`;

const SelectNftStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectNftStepContainerInner = styled(StepContainerInner)``;

const SelectNftStepTitle = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
`;

const SelectNftStepSlider = styled.div`
  width: 100%;
  max-width: 350px;
  margin-bottom: 40px;
  position: relative;

  .swiper {
    width: 100%;
  }

  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide {
    text-align: center;
    user-select: none;

    .image-wrapper {
      display: inline-block;
      padding: 10px;
    }

    img {
      max-width: 220px;
      width: 100%;
      display: block;
      cursor: pointer;
    }
  }

  .swiper-slide-active.is-selected {
    .image-wrapper {
      ${gradientBorderMixin({})}
    }
  }

`;

const SelectNftStepSliderCounter = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const FinalStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FinalStepContainerInner = styled(StepContainerInner)`
  padding-top: 0;
`;

const FinalStepAvatar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -100px;
  margin-bottom: 30px;

  & .avatar {
    position: relative;
    z-index: 1;
  }

  & .avatar:first-child {
    z-index: 0;
    margin-right: -15px;
  }

  & .avatar:last-child {
    z-index: 0;
    margin-left: -15px;
  }
`;

const FinalStepDescription = styled.div`
  text-align: center;
  max-width: 280px;
  margin-bottom: 30px;
`;

export {
  ModalInner,
  Cover,
  NextStepButton,
  SliderNavigationArrowPrev,
  SliderNavigationArrowNext,
  SelectProfilePictureFormContainer,
  IntroductionStepContainer,
  IntroductionStepContainerInner,
  IntroductionStepAvatarGroups,
  IntroductionStepTitles,
  SelectNftStepContainer,
  SelectNftStepContainerInner,
  SelectNftStepTitle,
  SelectNftStepSlider,
  SelectNftStepSliderCounter,
  FinalStepContainer,
  FinalStepContainerInner,
  FinalStepAvatar,
  FinalStepDescription,
};
