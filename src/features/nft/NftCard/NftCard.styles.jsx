import styled, { css } from 'styled-components';

const CardInner = styled.div`
  transition: transform 0.4s;
  transform-style: preserve-3d;
`;

const CardWrapper = styled.div`
  width: 200px;
  position: relative;
  //perspective: 1000px;
  user-select: none;

  .MuiCard-root {
    background: rgba(255, 255, 255, 0.01);
    border-radius: 10px;
    user-select: none;
  }

  ${(props) => !props.isLocked && css`
    &:hover ${CardInner} {
      transform: rotateY(180deg);
    }
  `}
`;

const CardSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
`;

const CardFront = styled(CardSide)`
  position: relative;

  .MuiCardContent-root {
    padding: 10px 14px 10px;
    position: relative;

    ${(props) => css`
      background: ${props.theme.palette.grey[100]};
    `}
    .MuiTypography-root {
      color: #000;
      font-weight: 700;
    }
  }

  img {
    pointer-events: none;
  }
`;

const CardBack = styled(CardSide)`
  transform: rotateY(180deg);
  height: 100%;
  width: 100%;

  .MuiCard-root {
    height: 100%;
    background: linear-gradient(155.3deg, #F86BDF 1.57%, #ECD6FC 26.7%, #6B6BF8 59.53%, #6B6BF8 100%);

    .MuiTypography-root {
      font-weight: 700;
    }

    &:after {
      content: '';
      position: absolute;
      top: 17px;
      left: 17px;
      width: calc(100% - 40px);
      height: calc(100% - 40px);
      border: 3px solid;
      border-image-source: linear-gradient(159.06deg,#FFFFFF -42.08%, rgba(255, 255, 255, 0) 85.89%);
      border-image-slice: 20;
    }
  }

  .MuiCardContent-root {
    height: 100%;
    z-index: 1;
    position: relative;
  }
`;

const CardIsLockedOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;;
`;

export {
  CardWrapper,
  CardInner,
  CardFront,
  CardBack,
  CardIsLockedOverlay,
};
