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
import { getShortenAddress } from '../../common/addressHelper';
import GradientButton from '../GradientButton/GradientButton';
import claimed from '../../resources/icons/claimed.svg';
import claimed_mark from '../../resources/icons/claimed_mark.svg';

const MintCard = ({ title, description, address, nftImg }) => {
  const [isClaimed, setIsClaimed] = useState(false);

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
      {!isClaimed &&
        <QuestCardBtn onClick={() => setIsClaimed(!isClaimed)}>
          Claim NFT
        </QuestCardBtn>
      }
      {isClaimed &&
        <QuestBox style={{ width: '314px', height: 'unset', padding: '6px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <div style={{ marginRight: '5px' }}>
            <SvgIcon component={claimed_mark} inheritViewBox style={{ width: 'unset', height: 'unset'}} />
          </div>
          NFT Claimed!
        </QuestBox>
      }
    </div>
    <div style={{ position: 'relative' }}>
      {isClaimed &&
        <SvgIcon component={claimed} inheritViewBox style={{ width: 'unset', height: 'unset', position: 'absolute', bottom: '30px', left: '-40px' }} />
      }
      <img src={nftImg} />
    </div>
  </QuestBox>)
}

export default MintCard;
