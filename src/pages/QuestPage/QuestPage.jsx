/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, SvgIcon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import backIcon from '../../resources/icons/back.svg';
import MintCard from '../../components/MintCard/MintCard';
import nft from '../../resources/images/L1P1-min.png';
import questImage from '../../resources/images/L1P1-L1P2.png';
import noneligibleImg from '../../resources/images/noneligible.png';
import claimed from '../../resources/icons/claimed.svg';
import { AllQuests } from './QuestPage.styles';
import { useAccountDetails,
  useWalletActionHandlers } from '../../hooks/index.ts';
import { useClaimNFT, useQuestActionHandlers } from './hooks.ts';
import { fetchNFTContestData } from './questSlice';

const QuestPage = () => {
  const { id } = useParams();
  const [isEligibiltyStatusBeforeCheck, setEligibiltyStatusBeforeCheck] = useState(true);
  const [isWalletConnected, setWalletConnectivity] = useState();
  const { address, status } = useAccountDetails();
  const { setWalletModalOpen } = useWalletActionHandlers();
  const { setUserClaimingNFT, setNFTClaimedByUser, setWalletAddress } = useQuestActionHandlers();

  const isUserEligibleForNFT = useSelector(
    (state) => state.quest.isUserEligibleForNFT,
  );
  const isUserCheckingForEligibility = useSelector(
    (state) => state.quest.isUserCheckingForEligibility,
  );
  const isUserNonEligibleForNFT = useSelector(
    (state) => state.quest.isUserNonEligibleForNFT,
  );
  const isUserClaimingNFT = useSelector(
    (state) => state.quest.isUserClaimingNFT,
  );
  const isNFTClaimedByUser = useSelector(
    (state) => state.quest.isNFTClaimedByUser,
  );

  const accountDetailsForNFT = useSelector(
    (state) => state.quest.accountDetailsForNFT,
  );

  const dispatch = useDispatch();

  const checkEligibility = (id) => {
    if (!isWalletConnected) {
      setWalletModalOpen(true);
    } else {
      console.log(`questid: ${id}`);
      setEligibiltyStatusBeforeCheck(false);
      setWalletAddress(address);
      dispatch(fetchNFTContestData());
      // setUserEligibilityForNFT(true);
    }
  };

  const claimNft = (id) => {
    console.log(`questid: ${id}`);
    // setUserClaimingNFT(true);
    setNFTClaimedByUser(true);
    dispatch(useClaimNFT(accountDetailsForNFT));
  };

  useEffect(() => {
    if (status === 'connected') {
      setWalletConnectivity(true);
    }
  }, [status]);

  const getMintCardContent = () => {
    if (
      isEligibiltyStatusBeforeCheck
      && !isUserClaimingNFT
      && !isNFTClaimedByUser
    ) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description="Become a part of the first LPs to earn exclusiveNFT as a reward for the liquidity contribution inseveral pools. You can check your eligibility for NFT by clicking the button below."
          address={address}
          nftImg={questImage}
          status="isEligibiltyStatusBeforeCheck"
          onCheck={() => checkEligibility(id)}
        />
      );
    }
    if (
      isUserCheckingForEligibility
      && !isUserClaimingNFT
      && !isNFTClaimedByUser
    ) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description="Become a part of the first LPs to earn exclusiveNFT as a reward for the liquidity contribution inseveral pools. You can check your eligibility for NFT by clicking the button below."
          address={address}
          nftImg={questImage}
          status="isUserCheckingForEligibility"
          onCheck={() => checkEligibility(id)}
        />
      );
    }
    if (isUserEligibleForNFT && !isUserClaimingNFT && !isNFTClaimedByUser) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description="Based on your ranking in LP contest,
          you’re eligible for NFT - L1P1."
          address={address}
          nftImg={nft}
          status="isUserEligibleForNFT"
          onCheck={() => checkEligibility(id)}
          onClaim={() => claimNft(id)}
        />
      );
    }
    if (isUserNonEligibleForNFT && !isUserClaimingNFT && !isNFTClaimedByUser) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description="Oops! sorry as per our criteria you
          are not eligible for any NFT"
          address={address}
          nftImg={noneligibleImg}
          status="isUserNonEligibleForNFT"
          onCheck={() => checkEligibility(id)}
        />
      );
    }
    if (isUserClaimingNFT) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description="Based on your ranking in LP contest,
          you’re eligible for NFT - L1P1."
          address={address}
          nftImg={nft}
          status="isUserClaimingNFT"
          onCheck={() => checkEligibility(id)}
          onClaim={() => claimNft(id)}
        />
      );
    }
    if (isNFTClaimedByUser) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description="Based on your ranking in LP contest,
          you’re eligible for NFT - L1P1"
          address={address}
          nftImg={claimed}
          status="isNFTClaimedByUser"
          onCheck={() => checkEligibility(id)}
          onClaim={() => claimNft(id)}
        />
      );
    }
  };

  const bodyContent = (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <Link to="/home" style={{ display: 'flex', color: '#fff' }}>
          <div style={{ marginRight: '10px' }}>
            <SvgIcon component={backIcon} />
          </div>
          <AllQuests>All quests</AllQuests>
        </Link>
        {isWalletConnected ? (
          getMintCardContent()
        ) : (
          <MintCard
            title="Rise of the first LPs"
            description="Become a part of the first LPs to earn exclusiveNFT as a reward for the liquidity contribution inseveral pools. You can check your eligibility for NFT by clicking the button below."
            nftImg={questImage}
            status="isEligibiltyStatusBeforeCheck"
            onCheck={() => checkEligibility(id)}
          />
        )}
      </div>
    </Container>
  );
  return <MainLayout bodyContent={bodyContent} disableSidebar />;
};

export default QuestPage;
