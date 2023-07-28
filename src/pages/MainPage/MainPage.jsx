import React, { useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Tab } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@material-ui/core';

import { MainpageContainer, MainpageContainerHeader, JediSwapTabs } from './MainPage.styles';
import { eventsLookup, guildNamesLookup, guildTypesLookup } from '../../common/contansts';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import LeaderboardTable from '../../features/guilds/Leaderboard/Leaderboard';
import { useActiveStarknetReact } from '../../hooks';
import { EventEmitter } from '../../common/eventEmitter';
import InfoCard from '../../components/InfoCard/InfoCard';
import QuestCard from '../../components/QuestCard/QuestCard';
import campaign from '../../resources/images/campaign.png';

/*
TODO перенести табы в отдельный компонент
TODO проверить размер бандлов - https://mui.com/material-ui/guides/minimizing-bundle-size/
TODO хук для starknet.id
 */

const MainPage = () => {
  const { t } = useTranslation();
  const { connectedAddress } = useActiveStarknetReact();
  const guildIds = Object.keys(guildNamesLookup);
  const [activeGuildId, setActiveGuildId] = useState(guildTypesLookup.all);
  const handleActiveGuildIdChange = useCallback((event, value) => {
    setActiveGuildId(value);
  }, [setActiveGuildId]);

  const handleConnectWalletModal = useCallback(() => {
    EventEmitter.dispatch(eventsLookup.openWalletModal);
  }, []);

  const bodyContent = (
    <Container>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={10}>
          <QuestCard
            questType="FEATURED CONTEST"
            title="Rise of the first LPs"
            description="This is our first-ever liquidity contest.
            With this initiative, we want to recognise and reward the most loyal liquidity providers of JediSwap with some special NFTs."
            duration="Apr 17, 2023 - Jul 25, 2023"
            nftAmount={5}
            campaignImg={campaign}
          />
        </Grid>
        <Grid item xs={10} md={3}>
          <InfoCard />
        </Grid>
        <Grid item xs={10} md={7}>
        <QuestCard
          questType="UPCOMING CONTEST"
          title="Rise of the first LPs"
          description="This is our first-ever liquidity contest.
            With this initiative, we want to recognise and reward the most loyal liquidity providers of JediSwap with some special NFTs."
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
