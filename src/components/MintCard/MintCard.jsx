import React, { useCallback, useState } from 'react';
import { UnsupportedChainIdError, useStarknetReact } from '@web3-starknet-react/core';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SvgIcon } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { QuestBox, QuestCardTitle, QuestCardType, QuestCardDescription, QuestCardAddress, QuestCardBtn } from '../QuestCard/QuestCard.styles';
import { MintCardStatus } from './MintCard.styels';
import { getShortenAddress } from '../../common/addressHelper';
import GradientButton from '../GradientButton/GradientButton';
import claimed from '../../resources/icons/claimed.svg';
import claimedMark from '../../resources/icons/claimed_mark.svg';
import noneligibleImg from '../../resources/icons/noneligible.svg';

const statuses = {
  beforeCheck: 'beforeCheck',
  checking: 'checking', 
  eligible: 'eligible',
  noneligible: 'noneligible',
  claiming: 'claiming',
  claimed: 'claimed'
};

const MintCard = ({ title, description, address, nftImg, status, onCheck, onClaim }) => {

  return (<QuestBox style={{ width: '700px', height: 'unset', padding: '30px', marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <QuestCardTitle>
        {title}
      </QuestCardTitle>
      <QuestCardAddress>
        {getShortenAddress(address)}
      </QuestCardAddress>
      <QuestCardDescription style={{ maxWidth: '314px' }}>
        {description}
      </QuestCardDescription>
      {status === statuses.beforeCheck &&
        <QuestCardBtn onClick={onCheck}>
          Check Eligibility
        </QuestCardBtn>
      }
      {status === statuses.checking &&
        <MintCardStatus>
          Checking...
        </MintCardStatus>
      }
      {status === statuses.noneligible &&
        <MintCardStatus>
          Not Eligible
        </MintCardStatus>
      }
      {status === statuses.eligible &&
        <QuestCardBtn onClick={onClaim}>
          Claim NFT
        </QuestCardBtn>
      }
      {status === statuses.claiming &&
        <MintCardStatus>
          Claiming...
        </MintCardStatus>
      }
      {status === statuses.claimed &&
        <QuestBox style={{ width: '314px', height: 'unset', padding: '10px', display: 'flex', justifyContent: 'center', alignContent: 'center', fontSize: '20px', fontWeight: 750 }}>
          <div style={{ marginRight: '5px' }}>
            <SvgIcon component={claimedMark} inheritViewBox style={{ width: 'unset', height: 'unset'}} />
          </div>
          NFT Claimed!
        </QuestBox>
      }
    </div>
    <div style={{ position: 'relative' }}>
      {status === statuses.claimed  &&
        <SvgIcon component={claimed} inheritViewBox style={{ width: 'unset', height: 'unset', position: 'absolute', bottom: '30px', left: '-40px' }} />
      }
      {status === statuses.noneligible &&
        <SvgIcon component={noneligibleImg} inheritViewBox style={{ width: 'unset', height: '240px'}} />
      }
      {status !== statuses.noneligible &&
        <img src={nftImg} />
      }
    </div>
  </QuestBox>)
}

export {
  statuses
};
export default MintCard;
