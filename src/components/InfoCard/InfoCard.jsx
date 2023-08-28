import React from 'react';
import { SvgIcon } from '@mui/material';
import Box from '@mui/material/Box';

import { InfoLabel, InfoBox } from './InfoCard.styles';
import icon from '../../resources/icons/infoicon.svg';

const InfoCard = () => (
  <InfoBox>
    <Box style={{ textAlign: 'end', paddingRight: '10px', paddingTop: '10px' }}>
      <SvgIcon component={icon} inheritViewBox style={{ width: 'unset', height: 'unset' }} />
    </Box>
    <InfoLabel>
      Your one stop space for all JediSwap quests.
    </InfoLabel>
  </InfoBox>
);

export default InfoCard;
