/* eslint-disable indent */
import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, SvgIcon } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useContract, useContractWrite } from "@starknet-react/core";

import MainLayout from "../../layouts/MainLayout/MainLayout";
import backIcon from "../../resources/icons/back.svg";
import MintCard from "../../components/MintCard/MintCard";
import nft from "../../resources/images/L1P1-min.png";
import questImage from "../../resources/images/L1P1-L1P2.png";
import noneligibleImg from "../../resources/images/noneligible.png";
import claimed from "../../resources/icons/claimed.svg";
import { AllQuests } from "./QuestPage.styles";
import {
  useAccountDetails,
  useWalletActionHandlers,
} from "../../hooks/index.ts";
import { useClaimNFT, useQuestActionHandlers } from "./hooks.ts";
import { fetchNFTContestData } from "./questSlice";
import { stark } from "starknet";
import NFTContest_ABI from "../../constants/abis/nft-contest.json";

const QuestPage = () => {
  const { id } = useParams();
  const [isEligibiltyStatusBeforeCheck, setEligibiltyStatusBeforeCheck] =
    useState(true);
  const [isWalletConnected, setWalletConnectivity] = useState();
  const { address, status, account } = useAccountDetails();
  const { setWalletModalOpen } = useWalletActionHandlers();
  const { setUserClaimingNFT, setNFTClaimedByUser, setWalletAddress } =
    useQuestActionHandlers();

  const isUserEligibleForNFT = useSelector(
    (state) => state.quest.isUserEligibleForNFT
  );
  const isUserCheckingForEligibility = useSelector(
    (state) => state.quest.isUserCheckingForEligibility
  );
  const isUserNonEligibleForNFT = useSelector(
    (state) => state.quest.isUserNonEligibleForNFT
  );
  const isUserClaimingNFT = useSelector(
    (state) => state.quest.isUserClaimingNFT
  );
  const isNFTClaimedByUser = useSelector(
    (state) => state.quest.isNFTClaimedByUser
  );

  const accountDetailsForNFT = useSelector(
    (state) => state.quest.accountDetailsForNFT
  );

  const data = {
    token_id: 4,
    proof: [
      "0x784a1ed7c410f8709b94ad3a90e03dee5a0cdbc7ce738b7cd2c096ba886dbe9",
      "0x2768d075557adea6d7e2891700c648c3879627f5e2cf4f4c55d4c49e8d28e8e",
      "0x5d32dd94548b77404420815161d866380fcdac237adea94f114dadb3e793b7d",
    ],
    // token_metadata: [1, 1278300209, 420, 9000, 6, 120000],
    token_metadata: {
      type: "struct",
      task_id: 1,
      name: 1278300209,
      rank: 420,
      score: 9000,
      level: 6,
      total_eligible_users: 120000,
    },
    // token_metadata: "1,1278300209,420,9000,6,120000",
  };

  const { contract } = useContract({
    address:
      "0x04cc759cd01bd973f8a98edd04339e8077c98cb744c90d3de46045d560ea1bae",
    abi: NFTContest_ABI,
  });

  const compiledDta = stark.compileCalldata(data);

  const calls = useMemo(() => {
    const tx = {
      contractAddress:
        "0x04cc759cd01bd973f8a98edd04339e8077c98cb744c90d3de46045d560ea1bae",
      entrypoint: "mint_whitelist",
      calldata: compiledDta,
    };
    return Array(1).fill(tx);
  }, [address]);

  const { write } = useContractWrite({ calls });
  // console.log(write())
  // debugger

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
    // setNFTClaimedByUser(true);
    // dispatch(useClaimNFT(accountDetailsForNFT));
  };

  useEffect(() => {
    if (status === "connected") {
      setWalletConnectivity(true);
    }
  }, [status]);

  const handleMint = async () => {
    const x = await write();
    console.log("🚀 ~ file: QuestPage.jsx:112 ~ handleMint ~ x:", x);
  };

  useEffect(() => {
    if (address) {
      setTimeout(() => {
        handleMint();
      }, 5000);
    }
  }, [address]);

  // async function doSomething() {
  //   await account.execute([tx]);
  // }

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
          onCheck={() => checkEligibility(id)}
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
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <Link to="/home" style={{ display: "flex", color: "#fff" }}>
          <div style={{ marginRight: "10px" }}>
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
