import React from 'react';
import { SvgIcon } from '@mui/material';

import { QuestCardTitle, QuestCardDescription, QuestCardAddress, QuestCardBtn } from '../QuestCard/QuestCard.styles';
import { MintCardStatus, MintCardClaimed, MintBox } from './MintCard.styles';
import { getShortenAddress } from '../../common/addressHelper';
import claimed from '../../resources/icons/claimed.svg';
import claimedMark from '../../resources/icons/claimed_mark.svg';
import noneligibleImg from '../../resources/icons/noneligible.svg';

const statuses = {
  beforeCheck: 'beforeCheck',
  checking: 'checking',
  eligible: 'eligible',
  noneligible: 'noneligible',
  claiming: 'claiming',
  claimed: 'claimed',
};

const MintCard = ({ title, description, address, nftImg, status, onCheck, onClaim,isWalletConnected }) => (
  <MintBox>
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
      {status === statuses.beforeCheck
        && (
          <QuestCardBtn onClick={onCheck}>
            Check Eligibility
          </QuestCardBtn>
        )}
      {status === statuses.checking
        && (
          <MintCardStatus>
            Checking...
          </MintCardStatus>
        )}
      {status === statuses.noneligible
        && (
          <MintCardStatus>
            Not Eligible
          </MintCardStatus>
        )}
      {status === statuses.eligible
        && (
          <QuestCardBtn onClick={onClaim}>
            Claim NFT
          </QuestCardBtn>
        )}
      {status === statuses.claiming
        && (
          <MintCardStatus>
            Claiming...
          </MintCardStatus>
        )}
      {status === statuses.claimed
        && (
          <MintCardClaimed>
            <div style={{ marginRight: '5px' }}>
              <SvgIcon component={claimedMark} inheritViewBox style={{ width: 'unset', height: 'unset' }} />
            </div>
            NFT Claimed!
          </MintCardClaimed>
        )}
    </div>
    <div style={{ position: 'relative' }}>
      {status === statuses.claimed
        && <SvgIcon component={claimed} inheritViewBox style={{ width: 'unset', height: 'unset', position: 'absolute', bottom: '30px', left: '-40px' }} />}
      {status === statuses.noneligible
        && <SvgIcon component={noneligibleImg} inheritViewBox style={{ width: 'unset', height: '240px' }} />}
      {status !== statuses.noneligible
        && <img src={nftImg} />}
    </div>
  </MintBox>
);

export {
  statuses,
};
export default MintCard;
