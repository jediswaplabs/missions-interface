import React from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import InfoCard from '../../components/InfoCard/InfoCard';
import QuestCard from '../../components/QuestCard/QuestCard';
import campaign from '../../resources/icons/campaign.svg';

/*
TODO перенести табы в отдельный компонент
TODO проверить размер бандлов - https://mui.com/material-ui/guides/minimizing-bundle-size/
TODO хук для starknet.id
 */

const MainPage = () => {
  const bodyContent = (
    <Container>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={10}>
          <QuestCard
            questId={1}
            questType="FEATURED CONTEST"
            title="Rise of the first LPs"
            description="This is our first-ever liquidity contest.
            With this initiative, we want to recognise and reward the most loyal liquidity providers of JediSwap with some special NFTs."
            duration="Apr 17, 2023 - Jul 26, 2023"
            nftAmount={5}
            campaignImg={campaign}
          />
        </Grid>
        <Grid item xs={10} md={4}>
          <InfoCard />
        </Grid>
        <Grid item xs={10} md={6}>
          <QuestCard
            questType="UPCOMING CONTEST"
            title="Return of the LPs"
            description="This is our third upcoming liquidity contest in series. Watch this space for more info. We will keep you updated"
          />
        </Grid>
      </Grid>
    </Container>

  );

  return (
    <MainLayout bodyContent={bodyContent} disableSidebar />
  );
};

export default MainPage;
