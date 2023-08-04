import React, { useState } from 'react';
import { SvgIcon } from '@mui/material';

import { ProfilePopoutContainer, ProfilePopoutRect, ProfilePopoutTriangle, ProfilePopoutText, ProfilePopoutClose } from './ProfilePopout.styles';
import closeIcon from '../../resources/icons/close.svg';
import triangleIcon from '../../resources/icons/triangle.svg';

const ProfilePopout = () => {
  return (
    <ProfilePopoutContainer>
      <ProfilePopoutTriangle>
        <SvgIcon component={triangleIcon} inheritViewBox style={{ width: 'unset', height: 'unset' }} />
      </ProfilePopoutTriangle>
      <ProfilePopoutRect>
        <ProfilePopoutText>
          Your claimed NFTs can be found here
        </ProfilePopoutText>
        <ProfilePopoutClose onClick={e => e.preventDefault()}>
          <SvgIcon component={closeIcon} inheritViewBox style={{ width: 'unset', height: 'unset' }} />
        </ProfilePopoutClose>
      </ProfilePopoutRect>
    </ProfilePopoutContainer>
  )
}

export default ProfilePopout;