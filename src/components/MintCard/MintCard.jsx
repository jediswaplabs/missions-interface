import React from 'react';
import { SvgIcon, Box } from '@mui/material';

import {
  QuestCardTitle,
  QuestCardDescription,
  QuestCardAddress,
  QuestCardBtn
} from '../QuestCard/QuestCard.styles';
import { MintCardStatus, MintCardClaimed, MintBox } from './MintCard.styles';
import { getShortenAddress } from '../../common/addressHelper';
import claimedMark from '../../resources/icons/claimed_mark.svg';
import MintCardImg from './MintCardImg';

const statuses = {
  beforeCheck: 'isEligibiltyStatusBeforeCheck',
  checking: 'isUserCheckingForEligibility',
  eligible: 'isUserEligibleForNFT',
  noneligible: 'isUserNonEligibleForNFT',
  claiming: 'isUserClaimingNFT',
  claimed: 'isNFTClaimedByUser',
};

const MintCard = ({
  title,
  description,
  address,
  nftImg,
  status,
  onCheck,
  onClaim,
  isDisabled,
}) => (
  <MintBox>
    <div>
      <QuestCardTitle>{title}</QuestCardTitle>
      <QuestCardAddress>{getShortenAddress(address)}</QuestCardAddress>
      <QuestCardDescription style={{ maxWidth: '314px' }}>
        {description}
      </QuestCardDescription>
      <Box sx={{ display: { xs: 'block', md: 'none' }, mb: '20px' }}>
        <MintCardImg nftImg={nftImg} status={status} statuses={statuses} />
      </Box>
      {status === statuses.beforeCheck && (
        <QuestCardBtn onClick={onCheck}>Check Eligibility</QuestCardBtn>
      )}
      {status === statuses.checking && (
        <MintCardStatus>Checking...</MintCardStatus>
      )}
      {status === statuses.noneligible && (
        <MintCardStatus>Not Eligible</MintCardStatus>
      )}
      {status === statuses.eligible && (
        <QuestCardBtn disabled={isDisabled} onClick={onClaim}>Claim NFT</QuestCardBtn>
      )}
      {status === statuses.claiming && (
        <MintCardStatus>Claiming...</MintCardStatus>
      )}
      {status === statuses.claimed && (
        <MintCardClaimed>
          <div style={{ marginRight: '5px' }}>
            <SvgIcon
              component={claimedMark}
              inheritViewBox
              style={{ width: 'unset', height: 'unset' }}
            />
          </div>
          NFT Claimed!
        </MintCardClaimed>
      )}
    </div>
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
      <MintCardImg nftImg={nftImg} status={status} statuses={statuses} />
    </Box>
  </MintBox>
);

export {
  statuses,
};
export default MintCard;
