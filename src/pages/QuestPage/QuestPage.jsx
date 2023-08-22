/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, SvgIcon } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useContract,
  useContractRead,
  useContractWrite } from '@starknet-react/core';
import { CallData } from 'starknet';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import backIcon from '../../resources/icons/back.svg';
import MintCard from '../../components/MintCard/MintCard';
import questImage from '../../resources/images/L1P1-L1P2.png';
import noneligibleImg from '../../resources/images/noneligible.png';
import { AllQuests } from './QuestPage.styles';
import { useAccountDetails,
  useWalletActionHandlers } from '../../hooks/index.ts';
import { useQuestActionHandlers } from './hooks.ts';
import { fetchNFTContestData,
  setAccountDetailsForNFTAction,
  setIsWalletClaimedAnyNFT,
  setUserEligibleNFTAction,
  setUserNonEligibleNFTAction } from './questSlice';
import { feltArrToStr } from '../../utils/index.ts';
import NFTContestABI from '../../constants/abis/nft-contest.json';
import { imageBasedOnNFTType } from '../../common/getImageBasedOnNFTType';
import { getLastCharacterOfAString } from '../../utils/getLastCharacterOfAString';

const QuestPage = () => {
  const [isEligibiltyStatusBeforeCheck, setEligibiltyStatusBeforeCheck] = useState(true);
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

  const isWalletClaimedAnyNFT = useSelector(
    (state) => state.quest.isWalletClaimedAnyNFT,
  );

  const [mintData, setMintData] = useState({});
  const { contract } = useContract({
    address:
      '0x06c4f71c1c4a14bba747b4d18dfb73b486aa2ba921dd0de4f64dc415536b8ba6',
    abi: NFTContestABI,
  });

  const compiledDta = CallData.compile(mintData);

  const calls = {
    // contractAddress:
    //   '0x04cc759cd01bd973f8a98edd04339e8077c98cb744c90d3de46045d560ea1bae',
    contractAddress:
      '0x06c4f71c1c4a14bba747b4d18dfb73b486aa2ba921dd0de4f64dc415536b8ba6',
    entrypoint: 'mint_whitelist',
    calldata: compiledDta,
  };

  const { writeAsync } = useContractWrite({ calls });

  const { data: response } = useContractRead({
    address: contract.address,
    abi: contract.abi,
    functionName: 'is_completed',
    args: [1, address],
    watch: true,
  });

  useEffect(() => {
    if (response) {
      dispatch(setIsWalletClaimedAnyNFT(response));
      setNFTClaimedByUser(true);
    }
  }, [response]);

  const dispatch = useDispatch();

  const checkEligibility = () => {
    if (!address) {
      setWalletModalOpen(true);

      if (response) {
        dispatch(setIsWalletClaimedAnyNFT(response));
        setNFTClaimedByUser(true);
      }
    } else {
      setEligibiltyStatusBeforeCheck(false);
      setWalletAddress(address);
      const addressLastChar = getLastCharacterOfAString(address);
      dispatch(fetchNFTContestData(addressLastChar)).then((res) => {
        const found = res?.payload?.data?.find(
          (resData) => resData.wallet_address === address,
        );
        if (found) {
          setStateForAccountDetailsForNFT(found);
          dispatch(setUserEligibleNFTAction(true));
          setMintData({
            token_id: found?.calldata[0],
            // proof: [
            //   '0x7aafb266518806486b3d98b4aa4ae938d8b0ec2d190b3350c5d4edbf666b36e',
            //   '0x2f946b3a9f2a0603b30b63c09110d82f151ed01442dae4208dc0366b52288ec',
            //   '0x5d32dd94548b77404420815161d866380fcdac237adea94f114dadb3e793b7d',
            // ],
            proof: found?.proof,
            token_metadata: {
              type: 'struct',
              task_id: found?.calldata[1],
              name: found?.calldata[2],
              rank: found?.calldata[3],
              score: found?.calldata[4],
              level: found?.calldata[5],
              total_eligible_users: found?.calldata[6],
            },
          });
        } else {
          dispatch(setUserNonEligibleNFTAction(true));
        }
      });
    }
  };

  useEffect(() => {
    if (status === 'connected') {
      setWalletAddress(address);
    }
  }, [status]);

  const setStateForAccountDetailsForNFT = (nftData) => {
    const nftName = feltArrToStr([nftData?.calldata[2]]);
    dispatch(
      setAccountDetailsForNFTAction({
        address: nftData?.wallet_address,
        token_id: nftData?.calldata[0],
        task_id: nftData?.calldata[1],
        name: nftName,
        rank: nftData?.calldata[3],
        score: nftData?.calldata[4],
        level: nftData?.calldata[5],
        total_eligible_users: nftData?.calldata[6],
      }),
    );
  };

  useEffect(() => {
    if (address) {
      if (response) {
        dispatch(setIsWalletClaimedAnyNFT(response));
        setNFTClaimedByUser(true);
      }
      const addressLastChar = getLastCharacterOfAString(address);
      dispatch(fetchNFTContestData(addressLastChar)).then((res) => {
        const found = res?.payload?.data?.find(
          (resData) => resData.wallet_address === address,
        );
        if (found) {
          setStateForAccountDetailsForNFT(found);
        }
      });
    } else {
      setNFTClaimedByUser(false);
      setEligibiltyStatusBeforeCheck(true);
    }
  }, [address]);

  const claimNft = () => {
    setUserClaimingNFT(true);
    if (Object.keys(mintData).length) {
      writeAsync()
        .then((tx) => {
          setUserClaimingNFT(false);
          if (tx.transaction_hash) {
            if (response) {
              dispatch(setIsWalletClaimedAnyNFT(response));
              setNFTClaimedByUser(true);
            }
          }
        })
        .catch((err) => {
          setUserClaimingNFT(false);
          console.log(err);
        });
    }
  };

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
          onCheck={() => checkEligibility()}
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
          onCheck={() => checkEligibility()}
        />
      );
    }
    if (isUserEligibleForNFT && !isUserClaimingNFT && !isNFTClaimedByUser) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description={`Based on your ranking in LP contest,
          you’re eligible for NFT - ${accountDetailsForNFT?.name}.`}
          address={address}
          nftImg={imageBasedOnNFTType(accountDetailsForNFT?.name)}
          status="isUserEligibleForNFT"
          onCheck={() => checkEligibility()}
          onClaim={() => claimNft()}
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
          onCheck={() => checkEligibility()}
        />
      );
    }
    if (isUserClaimingNFT) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description={`Based on your ranking in LP contest,
          you’re eligible for NFT - ${accountDetailsForNFT?.name}.`}
          address={address}
          nftImg={imageBasedOnNFTType(accountDetailsForNFT?.name)}
          status="isUserClaimingNFT"
          onCheck={() => checkEligibility()}
          onClaim={() => claimNft()}
        />
      );
    }
    if (isNFTClaimedByUser && isWalletClaimedAnyNFT) {
      return (
        <MintCard
          title="Rise of the first LPs"
          description={`Based on your ranking in LP contest,
          you’re eligible for NFT - ${accountDetailsForNFT?.name}.`}
          address={address}
          nftImg={imageBasedOnNFTType(accountDetailsForNFT?.name)}
          status="isNFTClaimedByUser"
          onCheck={() => checkEligibility()}
          onClaim={() => claimNft()}
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
        {address ? (
          getMintCardContent()
        ) : (
          <MintCard
            title="Rise of the first LPs"
            description="Become a part of the first LPs to earn exclusiveNFT as a reward for the liquidity contribution inseveral pools. You can check your eligibility for NFT by clicking the button below."
            nftImg={questImage}
            status="isEligibiltyStatusBeforeCheck"
            onCheck={() => checkEligibility()}
          />
        )}
      </div>
    </Container>
  );
  return <MainLayout bodyContent={bodyContent} disableSidebar />;
};

export default QuestPage;
