import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { backdropClasses, Box, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container, SvgIcon } from '@material-ui/core';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import backIcon from '../../resources/icons/back.svg';
import { Link } from 'react-router-dom';
import MintCard from '../../components/MintCard/MintCard';
import nft from '../../resources/images/L1P1-min.png';
import { AllQuests } from './QuestPage.styles';

const QuestPage = () => {
  let { id } = useParams();
  const bodyContent = (
    <Container style={{display: 'flex', justifyContent: 'center'}}>
      <div>
      <Link to="/home" style={{display: 'flex', color: '#fff'}}>
        <div style={{marginRight: '10px'}}>
          <SvgIcon component={backIcon} />
        </div>
        <AllQuests>
          All quests
        </AllQuests>
      </Link>
      <MintCard 
        title="Rise of the first LPs"
        description="Based on your ranking in LP contest,
        you’re eligible for NFT - L1P1"
        address="0x00ccc18Ccd99b3Bb86bf0349ba0aa6BcD7cdF70a502a0D7CB9820C9922C5B744"
        nftImg={nft}
      />
      </div>
    </Container>
  )
  return (
    <MainLayout bodyContent={bodyContent} disableSidebar />
  );
}

export default QuestPage;