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
    token_id: 2,
    proof: [
      "0x3b58162c643b300dcda504a76143ce39ce819f78798e247f8fed2d72783cf3c",
      "0x63edeac7f0773edfa49f70380c79c18c72fc065a398b813c4c658812c16b3c6",
      "0x2df262d0827ea289ff0ae82047e8c99bc35d7e3deb383b8b28bae51f38efec3",
    ],
    // token_metadata: [1, 0x4c315032, 20, 11000, 2, 6, 120000],
    token_metadata: {
      type: "struct",
      task_id: 1,
      name: 0x4c315032,
      rank: 20,
      score: 11000,
      percentile: 2,
      level: 6,
      total_eligible_users: 120000,
    },
  };

  const { contract } = useContract({
    address:
      "0x060058bde1e565cfdbebb8cb100eb732dfcd8f3cedac6311e22c38e884e5ea83",
    abi: NFTContest_ABI,
  });

  const compiledDta = stark.compileCalldata(data);

  const calls = useMemo(() => {
    const tx = {
      contractAddress:
        "0x060058bde1e565cfdbebb8cb100eb732dfcd8f3cedac6311e22c38e884e5ea83",
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
