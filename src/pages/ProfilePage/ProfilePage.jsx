import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@material-ui/core';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import nft from '../../resources/images/L1P1-min.png';
import { RoundedRect, ProfileHeading } from './ProfilePage.styles';

const ProfilePage = () => {
  const imgs = [nft, nft, nft, nft, nft, nft];
  const bodyContent = (
    <>
      <ProfileHeading>Claimed quests</ProfileHeading>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="center"
        alignItems="center"
        // spacing={4}
        flexWrap="wrap"
        sx={{ my: 4 }}
      >
        {imgs.map((nft, i) => 
        <RoundedRect key={i}>
          <img src={nft} alt="" />
        </RoundedRect>)}

      </Stack>
    </>
  );
  return <MainLayout bodyContent={bodyContent} disableSidebar />
};

export default ProfilePage;