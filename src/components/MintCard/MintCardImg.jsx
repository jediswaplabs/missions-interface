import React from 'react';
import { SvgIcon } from '@mui/material';

import claimed from '../../resources/icons/claimed.svg';
import noneligibleImg from '../../resources/icons/noneligible.svg';

const MintCardImg = ({
  nftImg,
  status,
  statuses
}) => (
  <div style={{ position: 'relative' }}>
    {status === statuses.claimed && (
      <SvgIcon
        component={claimed}
        inheritViewBox
        style={{
          width: 'unset',
          height: 'unset',
          position: 'absolute',
          bottom: '30px',
          left: '-40px',
        }}
      />
    )}
    {status === statuses.noneligible && (
      <SvgIcon
        component={noneligibleImg}
        inheritViewBox
        style={{ width: 'unset', height: '240px' }}
      />
    )}
    {status !== statuses.noneligible
      && status !== statuses.beforeCheck
      && status !== statuses.checking && (
        <img src={nftImg} style={{ width: '200px', borderRadius: '5px' }} />
      )}
    {(status === statuses.beforeCheck || status === statuses.checking) && (
      <img src={nftImg} />
    )}
  </div>
);

export default MintCardImg;