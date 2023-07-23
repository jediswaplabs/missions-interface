import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

import MainLayout from '../../layouts/MainLayout/MainLayout';
import ProfileCard from '../../features/profile/ProfileCard/ProfileCard';
import ActivitiesList from '../../features/activities/ActivitiesList/ActivitiesList';
import GuildsList from '../../features/guilds/GuildsList/GuildsList';
import LeaderboardTable from '../../features/guilds/Leaderboard/Leaderboard';
import NftCarousel from '../../features/nft/NftCarousel/NftCarousel';
import { ProfileContainer, ProfileContainerHeader, ProfileContainerContent } from './PersonalProfilePage.styles';
import { useActiveStarknetReact } from '../../hooks';
import { areEqualAddresses } from '../../common/addressHelper';

const PersonalProfilePage = ({ account }) => {
  const { t } = useTranslation();
  const [activeGuildData, setActiveGuildData] = useState({});
  const { connectedAddress } = useActiveStarknetReact();
  const handleActiveGuildSelect = (payload) => {
    setActiveGuildData(payload);
  };

  useEffect(() => {
    setActiveGuildData({});
  }, [account]);

  const sidebarContent = (
    <Stack gap={4}>
      <ProfileCard account={account} readOnly={!areEqualAddresses(connectedAddress, account)} />
      <ActivitiesList account={account} />
    </Stack>
  );
  const bodyContent = (
    <ProfileContainer>
      <ProfileContainerHeader>
        <Typography variant="h5" color="text.primary">{t('contributorPage.titles.title')}</Typography>
      </ProfileContainerHeader>
      <ProfileContainerContent>
        <Stack direction="column" gap={4}>
          <GuildsList account={account} onActiveGuildSelect={handleActiveGuildSelect} />
          <LeaderboardTable guildId={activeGuildData?.id} guildName={activeGuildData?.name} />
          <NftCarousel account={account} />
        </Stack>
      </ProfileContainerContent>
    </ProfileContainer>
  );
  return (
    <MainLayout sidebarContent={sidebarContent} bodyContent={bodyContent} />
  );
};

export default PersonalProfilePage;
