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
import NFTContestABITestnet from '../../constants/abis/nft-contest-testnet.json';
import NFTContestABIMainnet from '../../constants/abis/nft-contest-mainnet.json';
import { imageBasedOnNFTType } from '../../common/getImageBasedOnNFTType';
import { getLastCharacterOfAString } from '../../utils/getLastCharacterOfAString';
import { mainnetContractAddress,
  testnetContractAddress } from '../../common/constants';
import { isProductionChainId,
  isTestnetChainId } from '../../common/connectors/index.ts';
import TransactionConfirmationModal, { TransactionErrorContent } from '../../components/TransactionModal/index.tsx';

const QuestPage = () => {
  const [isEligibiltyStatusBeforeCheck, setEligibiltyStatusBeforeCheck] = useState(true);
  const [transactionError, setTransactionError] = useState('');
  const [hash, setHash] = useState('');
  const [contractAddress, setContractAddress] = useState(
    testnetContractAddress,
  );
  const [nftContestABI, setNftContestABI] = useState(NFTContestABITestnet);
  const { address, status, chainId } = useAccountDetails();
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

  useEffect(() => {
    if (status === 'connected' && chainId) {
      if (isTestnetChainId(chainId)) {
        setContractAddress(testnetContractAddress);
        setNftContestABI(NFTContestABITestnet);
      } else if (isProductionChainId(chainId)) {
        setContractAddress(mainnetContractAddress);
        setNftContestABI(NFTContestABIMainnet);
      }
    }
  }, [status]);

  const [mintData, setMintData] = useState({});
  const { contract } = useContract({
    address: contractAddress,
    abi: nftContestABI,
  });

  const compiledDta = CallData.compile(mintData);

  const calls = {
    contractAddress,
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
      dispatch(fetchNFTContestData({ addressLastChar, chainId })).then(
        (res) => {
          const nftData = res?.payload?.data?.find(
            (resData) => resData.wallet_address === address,
          );
          if (nftData && Object.keys(nftData).length) {
            setStateForAccountDetailsForNFT(nftData);
            dispatch(setUserEligibleNFTAction(true));
            setMintData({
              token_id: nftData?.calldata[0],
              proof: nftData?.proof,
              token_metadata: {
                task_id: nftData?.calldata[1],
                name: nftData?.calldata[2],
                rank: nftData?.calldata[3],
                score: nftData?.calldata[4],
                level: nftData?.calldata[5],
                total_eligible_users: nftData?.calldata[6],
              },
            });
          } else {
            dispatch(setUserNonEligibleNFTAction(true));
          }
        },
      );
    }
  };

  useEffect(() => {
    if (status === 'connected') {
      setWalletAddress(address);
    }
  }, [status]);

  const setStateForAccountDetailsForNFT = (nftData) => {
    const nftCalldata = nftData?.calldata || [];
    const [tokenId, taskId, rank, score, level, totalEligibleUsers] = nftCalldata;
    const nftName = feltArrToStr([nftData?.calldata[2]]);
    dispatch(
      setAccountDetailsForNFTAction({
        address: nftData?.wallet_address,
        token_id: tokenId,
        task_id: taskId,
        name: nftName,
        rank,
        score,
        level,
        total_eligible_users: totalEligibleUsers,
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
      dispatch(fetchNFTContestData({ addressLastChar, chainId })).then(
        (res) => {
          const nftData = res?.payload?.data?.find(
            (resData) => resData.wallet_address === address,
          );
          if (nftData && Object.keys(nftData).length) {
            setStateForAccountDetailsForNFT(nftData);
          }
        },
      );
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
          if (tx.transaction_hash) {
            if (response) {
              dispatch(setIsWalletClaimedAnyNFT(response));
              setNFTClaimedByUser(true);
              setHash(tx.transaction_hash);
            }
          }
        })
        .catch((err) => {
          setTransactionError(err.message);
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
        <Link to="/" style={{ display: 'flex', color: '#fff' }}>
          <div style={{ marginRight: '10px' }}>
            <SvgIcon component={backIcon} />
          </div>
          <AllQuests>All quests</AllQuests>
        </Link>
        {address ? (
          <>
            {getMintCardContent()}
            {isUserClaimingNFT && (
              <TransactionConfirmationModal
                attemptingTxn={isUserClaimingNFT}
                isOpen={isUserClaimingNFT}
                pendingText={`Claiming NFT ${accountDetailsForNFT?.name}`}
                error={transactionError}
                message={transactionError ? 'Transaction Rejected' : ''}
                hash={hash}
                onDismiss={() => {
                  setUserClaimingNFT(false);
                  setTransactionError('');
                  setHash('');
                }}
              />
            )}
          </>
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
