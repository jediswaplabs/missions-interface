import PropTypes from 'prop-types';
import React from 'react';
import Avatar from '@mui/material/Avatar';
import SvgIcon from '@mui/material/SvgIcon';
import Skeleton from '@mui/material/Skeleton';

import { AvatarWrapper } from './UserAvatar.styles';

const UserAvatar = ({ isMock = false, src = '', size = '' }) => {
  if (isMock) {
    return (
      <AvatarWrapper size={size} className="avatar" isMock>
        <MockAvatar />
      </AvatarWrapper>
    );
  }
  return (
    <AvatarWrapper size={size} className="avatar">
      <Avatar imgProps={{ draggable: false }} variant="rounded" src={src} sx={{ bgcolor: 'transparent' }}>
        <DefaultAvatar />
      </Avatar>
    </AvatarWrapper>
  );
};

UserAvatar.propTypes = {
  isMock: PropTypes.bool,
  src: PropTypes.string,
  size: PropTypes.string,
};

const MockAvatar = () => <Skeleton variant="rounded" width="100px" height="100px" data-testid="loading_avatar" />;

const DefaultAvatar = () => <PermIdentityOutlinedIcon sx={{ fontSize: '5rem' }} />;

const PermIdentityOutlinedIcon = (props) => (
  <SvgIcon {...props}>
    <linearGradient id="gradient" gradientTransform="rotate(70)">
      <stop offset="20%" stopColor="#CB5EEE" />
      <stop offset="99%" stopColor="#4BE1EC" />
    </linearGradient>
    <path strokeWidth="0.1" d="M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2m0 9c2.7 0 5.8 1.29 6 2v1H6v-.99c.2-.72 3.3-2.01 6-2.01m0-11C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z" fill="url(#gradient)" />
  </SvgIcon>
);

export default UserAvatar;
