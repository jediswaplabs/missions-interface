import styled from 'styled-components';

const ProfilePopoutTriangle = styled.div`
  position: relative;
  left: 52px;
  bottom: -4px;
`;

const ProfilePopoutContainer = styled.div`
  position: absolute;
  right: ${(props) => (props.status === 'connected' ? '172px' : '-8px')};
  top: 32px;
`;

const ProfilePopoutRect = styled.div`
  border-radius: 16px;
  background: var(--jedi-gradient, linear-gradient(151deg, #29AAFD 0%, #FF00E9 100%));
  width: 268px;
  height: 102px;
  padding: 20px;
  // position: absolute;
  display: flex;
  // justify-content: center;
  align-items: center;
  color: var(--jedi-white, #FFF);
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: DM Sans, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24.5px; /* 153.125% */
`;

const ProfilePopoutText = styled.div`
  max-width: 208px;
`;

const ProfilePopoutClose = styled.div`
  position: absolute;
  right: 20px;
  top: 30px;
`;

export {
  ProfilePopoutContainer,
  ProfilePopoutTriangle,
  ProfilePopoutRect,
  ProfilePopoutText,
  ProfilePopoutClose,
};
