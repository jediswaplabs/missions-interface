import React, { useCallback, useState } from 'react';
import { UnsupportedChainIdError, useStarknetReact } from '@web3-starknet-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { Link, NavLink, useLocation } from 'react-router-dom';


import { QuestBox, QuestCardBtn, QuestCardTitle, QuestCardType, QuestCardDescription, QuestCardCalend, QuestCardNftNum, LaunchSoon } from './QuestCard.styles';
import GradientButton from '../GradientButton/GradientButton';
import calend from '../../resources/images/calend.png';
import medal from '../../resources/images/medal.png';

const QuestCard = ({ questId, questType, title, description, duration, nftAmount, campaignImg, status }) => {
  const styles = {};
  if (questType === 'FEATURED CONTEST') {
    styles.maxWidth = '430px';
  }
  return (
    <QuestBox>
      <div>
        <QuestCardType>{questType}</QuestCardType>
        <QuestCardTitle>
          {title}
        </QuestCardTitle>
        <QuestCardDescription style={styles}>
          {description}
        </QuestCardDescription>
        <div style={{display: 'flex'}}>
        {duration &&
          <QuestCardCalend>
            <div style={{ marginRight: '10px' }}>
              <img src={calend} />
            </div>
            <div style={{ marginRight: '20px' }}>
              <div style={{ marginBottom: '5px' }} className="duration_title">
                CONTEST DURATION
              </div>
              <div className="duration_text">
                {duration}
              </div>
            </div>
          </QuestCardCalend>
        }
        {!duration && <LaunchSoon>Launching Soon!</LaunchSoon>}
        {nftAmount &&
          <div style={{display: 'flex'}}>
            <div>
              <img src={medal} style={{ position: 'relative', top: '-5px' }} />
            </div>
            <QuestCardNftNum>
              <div className="title">NFTs</div>
              <div className="value">{nftAmount}</div>
            </QuestCardNftNum>
          </div>}

          </div>

        <Link  to={`/quest/${questId}`}>
          {duration && <QuestCardBtn>Enter</QuestCardBtn>}
        </Link>

      </div>
      {campaignImg && <div>
        <SvgIcon component={campaignImg} inheritViewBox style={{ width: 'unset', height: 'unset'}} />
      </div>}
    </QuestBox>


  )
};

export default QuestCard;

