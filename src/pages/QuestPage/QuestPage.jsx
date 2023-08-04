import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, SvgIcon } from '@material-ui/core';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import backIcon from '../../resources/icons/back.svg';
import MintCard, { statuses } from '../../components/MintCard/MintCard';
import nft from '../../resources/images/L1P1-min.png';
import questImage from '../../resources/images/L1P1-L1P2.png';
import { AllQuests } from './QuestPage.styles';
import { sleep } from '../../common/sleepHelper';
import { useAccountDetails, useWalletActionHandlers } from '../../hooks/index.ts';

const QuestPage = () => {
  const { id } = useParams();
  const [statusCheck, setStatus] = useState(statuses.beforeCheck);
  const [isWalletConnected, setWalletConnectivity] = useState();
  const { address, account, chainId, connector, status } = useAccountDetails();
  const { setWalletModalOpen } = useWalletActionHandlers();

  const checkEligibility = async (id) => {
    if (!isWalletConnected) {
      setWalletModalOpen(true);
    } else {
      console.log(`questid: ${id}`);
      setStatus(statuses.checking);
      await sleep(1500);
      if (Math.random() > 0.5) {
        setStatus(statuses.eligible);
      } else {
        setStatus(statuses.noneligible);
      }
    }
  };

  const claimNft = async (id) => {
    console.log(`questid: ${id}`);
    setStatus(statuses.claiming);
    await sleep(1500);
    setStatus(statuses.claimed);
  };

  useEffect(() => {
    if (status === 'connected') {
      setWalletConnectivity(true);
    }
  }, [status]);

  const bodyContent = (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <div>
        <Link to="/home" style={{ display: 'flex', color: '#fff' }}>
          <div style={{ marginRight: '10px' }}>
            <SvgIcon component={backIcon} />
          </div>
          <AllQuests>
            All quests
          </AllQuests>
        </Link>
        {isWalletConnected ? (
          <MintCard
            title="Rise of the first LPs"
            description="Based on your ranking in LP contest, you’re eligible for NFT - L1P1"
            address="0x00ccc18Ccd99b3Bb86bf0349ba0aa6BcD7cdF70a502a0D7CB9820C9922C5B744"
            nftImg={nft}
            status={statusCheck}
            onCheck={() => checkEligibility(id)}
            onClaim={() => claimNft(id)}
            isWalletConnected={isWalletConnected}
          />
        ) : (
          <MintCard
            title="Rise of the first LPs"
            description="Become a part of the first LPs to earn exclusiveNFT as a reward for the liquidity contribution inseveral pools. You can check your eligibility for NFT by clicking the button below."
            nftImg={questImage}
            status={statusCheck}
            onCheck={() => checkEligibility(id)}
          />
        )}

      </div>
    </Container>
  );
  return (
    <MainLayout bodyContent={bodyContent} disableSidebar />
  );
};

export default QuestPage;
