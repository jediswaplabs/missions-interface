import React, { useCallback, useState } from 'react';
import { UnsupportedChainIdError, useStarknetReact } from '@web3-starknet-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { InfoLabel, InfoBox } from './InfoCard.styles';
import icon from '../../resources/images/infoicon.png';

const InfoCard = () => {

  return (
    <InfoBox>
      <Box style={{textAlign: 'end', paddingRight: '10px', paddingTop: '10px'}}>
        <img src={icon} />
      </Box>
      <InfoLabel>
        Your one stop space for all JediSwap quests.
      </InfoLabel>
    </InfoBox>
  )
};

export default InfoCard;

