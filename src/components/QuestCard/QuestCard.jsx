import React, { useCallback, useState } from 'react';
import { UnsupportedChainIdError, useStarknetReact } from '@web3-starknet-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { Link, NavLink, useLocation } from 'react-router-dom';


import { QuestBox, QuestCardBtn, QuestCardTitle, QuestCardType, QuestCardDescription, QuestCardCalend } from './QuestCard.styles';
import GradientButton from '../GradientButton/GradientButton';
import calend from '../../resources/images/calend.png';
import medal from '../../resources/images/medal.png';

const QuestCard = ({ questType, title, description, duration, nftAmount, campaignImg }) => {

  return (
    <QuestBox>
      <div>
        <QuestCardType>{questType}</QuestCardType>
        <QuestCardTitle>
          {title}
        </QuestCardTitle>
        <QuestCardDescription>
          {description}
        </QuestCardDescription>
        <div style={{display: 'flex'}}>
        {duration &&
          <QuestCardCalend>
            <div style={{ marginRight: '10px' }}>
              <img src={calend} />
            </div>
            <div style={{ marginRight: '20px' }}>
              <div style={{ marginBottom: '5px' }}>
                CONTEST DURATION
              </div>
              <div>
                {duration}
              </div>
            </div>
          </QuestCardCalend>
        }
        {!duration && <div>Launching Soon!</div>}
        {nftAmount &&
          <div style={{display: 'flex'}}>
            <div>
              <img src={medal} style={{ position: 'relative', top: '-5px' }} />
            </div>
            <div>
              <div>NFTs</div>
              <div>{nftAmount}</div>
            </div>
          </div>}

          </div>

        <Link  to="/quest/3">
          {duration && <GradientButton size="large">Check Eliglibility</GradientButton>}
        </Link>

      </div>
      {campaignImg && <div>
        <img src={campaignImg} alt="alt" />
      </div>}
    </QuestBox>


  )
};

export default QuestCard;

