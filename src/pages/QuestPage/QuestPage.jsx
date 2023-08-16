/* eslint-disable indent */
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, SvgIcon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useContractWrite } from '@starknet-react/core';
import { stark } from 'starknet';

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
import { useQuestActionHandlers } from './hooks.ts';
import { fetchNFTContestData } from './questSlice';
import { strToFeltArr } from '../../utils/index.ts';

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

  const mintData = {
    token_id: accountDetailsForNFT.token_id,
    proof: [
      '0x7aafb266518806486b3d98b4aa4ae938d8b0ec2d190b3350c5d4edbf666b36e',
      '0x2f946b3a9f2a0603b30b63c09110d82f151ed01442dae4208dc0366b52288ec',
      '0x5d32dd94548b77404420815161d866380fcdac237adea94f114dadb3e793b7d',
    ],
    token_metadata: {
      type: 'struct',
      task_id: accountDetailsForNFT.task_id,
      name: strToFeltArr(accountDetailsForNFT.name)[0],
      rank: accountDetailsForNFT.rank,
      score: accountDetailsForNFT.score,
      level: accountDetailsForNFT.level,
      total_eligible_users: accountDetailsForNFT.total_eligible_users,
    },
  };

  const compiledDta = stark.compileCalldata(mintData);

  const calls = useMemo(() => {
    const tx = {
      contractAddress:
        '0x04cc759cd01bd973f8a98edd04339e8077c98cb744c90d3de46045d560ea1bae',
      entrypoint: 'mint_whitelist',
      calldata: compiledDta,
    };
    return Array(1).fill(tx);
  }, [address]);

  const { write, isLoading, data } = useContractWrite({ calls });

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

  const claimNft = async (id) => {
    const x = await write();
    console.log('🚀 ~ file: QuestPage.jsx:112 ~ claimNft ~ x:', x);
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
