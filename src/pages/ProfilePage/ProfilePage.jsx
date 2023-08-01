import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { SvgIcon, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Box } from '@material-ui/core';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import nft from '../../resources/images/L1P1-min.png';
import { RoundedRect, ProfileHeading, ProfileText } from './ProfilePage.styles';
import start_claiming from '../../resources/icons/start_claiming.svg';

const ProfilePage = () => {
  const imgs = [nft, nft, nft, nft, nft, nft];
  // const imgs = [];
  const bodyContent = (
    <>
      {imgs.length === 0 &&
        <div style={{ maxWidth: '479px', margin: 'auto' }}>
          <SvgIcon component={start_claiming} width="479" viewBox=' 0 0 479 334' style={{ width: 'unset', height: 'unset', maxWidth: '90vw' }} />
          <ProfileHeading style={{ textAlign: 'center' }}>
            Start Claiming!
          </ProfileHeading>
          <ProfileText>
            This is space where you’ll find all your claimed NFTs.
            <br />
            Start making your collection by participation in Jedi contests.
          </ProfileText>
        </div>
      }
      {imgs.length !== 0 &&
        <div>
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
        </div>
      }
    </>
  );
  return <MainLayout bodyContent={bodyContent} disableSidebar />
};

export default ProfilePage;