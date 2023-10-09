import React from 'react';
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
import { useAccountDetails } from '../../hooks/index.ts';

const ProfilePopout = () => {
  const { status } = useAccountDetails();

  const dispatch = useDispatch();

  const hideProfilePopout = () => {
    dispatch(setCloseProfilePopout(true));
  };

  return (
    <ProfilePopoutContainer
      status={status}
      onClick={(e) => {
        e.preventDefault();
        hideProfilePopout();
      }}
    >
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
        <ProfilePopoutClose>
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
