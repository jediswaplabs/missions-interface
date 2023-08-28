import React, { useRef } from 'react';
import { SvgIcon } from '@mui/material';
import { useDispatch } from 'react-redux';

import { ProfilePopoutContainer,
  ProfilePopoutRect,
  ProfilePopoutTriangle,
  ProfilePopoutText,
  ProfilePopoutClose } from './ProfilePopout.styles';
import closeIcon from '../../resources/icons/close.svg';
import triangleIcon from '../../resources/icons/triangle.svg';
import { setCloseProfilePopout } from '../../pages/ProfilePage/profileSlice';

const ProfilePopout = () => {
  const ref = useRef(null);

  const dispatch = useDispatch();

  const hideProfilePopout = () => {
    ref.current.style.display = 'none';
    dispatch(setCloseProfilePopout(true));
  };

  return (
    <ProfilePopoutContainer ref={ref}>
      <ProfilePopoutTriangle>
        <SvgIcon
          component={triangleIcon}
          inheritViewBox
          style={{ width: 'unset', height: 'unset' }}
        />
      </ProfilePopoutTriangle>
      <ProfilePopoutRect>
        <ProfilePopoutText>
          Your claimed NFTs can be found here
        </ProfilePopoutText>
        <ProfilePopoutClose onClick={(e) => {
          e.preventDefault();
          hideProfilePopout();
        }}
        >
          <SvgIcon
            component={closeIcon}
            inheritViewBox
            style={{ width: 'unset', height: 'unset' }}
          />
        </ProfilePopoutClose>
      </ProfilePopoutRect>
    </ProfilePopoutContainer>
  );
};

export default ProfilePopout;
