/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, SvgIcon } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  useContract,
  useContractRead,
  useContractWrite
} from "@starknet-react/core";
import { CallData } from "starknet";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import backIcon from "../../resources/icons/back.svg";
import MintCard from "../../components/MintCard/MintCard";
import questImage from "../../resources/images/L1P1-L1P2.png";
import noneligibleImg from "../../resources/images/noneligible.png";
import { AllQuests } from "./QuestPage.styles";
import {
  useAccountDetails,
  useWalletActionHandlers
} from "../../hooks/index.ts";
import { useQuestActionHandlers } from "./hooks.ts";
import {
  fetchNFTContestData,
  setAccountDetailsForNFTAction,
  setIsWalletClaimedAnyNFT,
  setUserEligibleNFTAction,
  setUserNonEligibleNFTAction
} from "./questSlice";
import { feltArrToStr } from "../../utils/index.ts";
import { imageBasedOnNFTType } from "../../common/getImageBasedOnNFTType";
import { getLastCharacterOfAString } from "../../utils/getLastCharacterOfAString";
import TransactionConfirmationModal from "../../components/TransactionModal/index.tsx";
import { config } from "../../config";
import { isFakeContract } from "../../common/constants";

const QuestPage = () => {
  const [isEligibiltyStatusBeforeCheck, setEligibiltyStatusBeforeCheck] =
    useState(true);
  const [transactionError, setTransactionError] = useState("");
  const [hash, setHash] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [nftContestABI, setNftContestABI] = useState(null);
  const { address, status, chainId } = useAccountDetails();
  const { setWalletModalOpen } = useWalletActionHandlers();
  const { setUserClaimingNFT, setNFTClaimedByUser, setWalletAddress } =
    useQuestActionHandlers();

  const isUserEligibleForNFT = useSelector(
    state => state.quest.isUserEligibleForNFT
  );
  const isUserCheckingForEligibility = useSelector(
    state => state.quest.isUserCheckingForEligibility
  );
  const isUserNonEligibleForNFT = useSelector(
    state => state.quest.isUserNonEligibleForNFT
  );
  const isUserClaimingNFT = useSelector(state => state.quest.isUserClaimingNFT);
  const isNFTClaimedByUser = useSelector(
    state => state.quest.isNFTClaimedByUser
  );

  const accountDetailsForNFT = useSelector(
    state => state.quest.accountDetailsForNFT
  );

  const isWalletClaimedAnyNFT = useSelector(
    state => state.quest.isWalletClaimedAnyNFT
  );

  useEffect(() => {
    if (status === "connected" && chainId) {
      const configResponse = config(chainId);
      setContractAddress(configResponse.contractAddress);
      setNftContestABI(configResponse.abi);
    }
  }, [status]);

  const [mintData, setMintData] = useState({});
  const { contract } = useContract({
    address: contractAddress,
    abi: nftContestABI
  });

  const compiledDta = CallData.compile(mintData);

  const calls = {
    contractAddress,
    entrypoint: "mint_whitelist",
    calldata: compiledDta
  };

  const { writeAsync } = useContractWrite({ calls });

  const { data: response } = useContractRead({
    address: contract?.address,
    abi: contract?.abi,
    functionName: "is_completed",
    args: [1, address],
    watch: true
  });

  useEffect(() => {
    if (response && !isFakeContract) {
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
      dispatch(fetchNFTContestData({ addressLastChar, chainId })).then(res => {
        const nftData = res?.payload?.data?.find(
          resData => resData.wallet_address === address
        );
        if (nftData && Object.keys(nftData).length) {
          setStateForAccountDetailsForNFT(nftData);
          dispatch(setUserEligibleNFTAction(true));
          if (isFakeContract) {
            const configResponse = config(chainId);
            setMintData(configResponse.data);
          } else {
            setMintData({
              token_id: 5,
              proof: [
                "0x1078f2c60e27233375aa6872407e437599947a9f063ae30f1abf54480b066c",
                "0x0",
                "0x4d109c9039ec0907cedea6b5215bed4f33c228b6dd9b7971be9315ba43739fe"
              ],
              token_metadata: {
                task_id: 1,
                name: 1278300209,
                rank: 520,
                score: 8000,
                level: 6,
                total_eligible_users: 120000
              }
            });
          }
        } else {
          dispatch(setUserNonEligibleNFTAction(true));
        }
      });
    }
  };

  useEffect(() => {
    if (status === "connected") {
      setWalletAddress(address);
    }
  }, [status]);

  const setStateForAccountDetailsForNFT = nftData => {
    const nftCalldata = nftData?.calldata || [];
    const [tokenId, taskId, rank, score, level, totalEligibleUsers] =
      nftCalldata;
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
        total_eligible_users: totalEligibleUsers
      })
    );
  };

  useEffect(() => {
    if (address) {
      if (response) {
        dispatch(setIsWalletClaimedAnyNFT(response));
        setNFTClaimedByUser(true);
      }
      const addressLastChar = getLastCharacterOfAString(address);
      dispatch(fetchNFTContestData({ addressLastChar, chainId })).then(res => {
        const nftData = res?.payload?.data?.find(
          resData => resData.wallet_address === address
        );
        if (nftData && Object.keys(nftData).length) {
          setStateForAccountDetailsForNFT(nftData);
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
        .then(tx => {
          if (tx.transaction_hash) {
            if (response) {
              dispatch(setIsWalletClaimedAnyNFT(response));
              setNFTClaimedByUser(true);
              setHash(tx.transaction_hash);
            }
          }
        })
        .catch(err => {
          setTransactionError(err.message);
        });
    }
  };

  const getMintCardContent = () => {
    if (
      isEligibiltyStatusBeforeCheck &&
      !isUserClaimingNFT &&
      !isNFTClaimedByUser
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
      isUserCheckingForEligibility &&
      !isUserClaimingNFT &&
      !isNFTClaimedByUser
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
          isDisabled={isWalletClaimedAnyNFT}
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
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Link to="/" style={{ display: "flex", color: "#fff" }}>
          <div style={{ marginRight: "10px" }}>
            <SvgIcon component={backIcon} />
          </div>
          <AllQuests>All Missions</AllQuests>
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
                message={transactionError ? "Transaction Rejected" : ""}
                hash={hash}
                onDismiss={() => {
                  setUserClaimingNFT(false);
                  setTransactionError("");
                  setHash("");
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
