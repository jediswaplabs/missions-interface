import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';

import Guild from '../Guild/Guild';
import { useLazyGetGuildsScoreByUserIdQuery } from '../../api/apiSlice';

const GuildsList = ({ account, onActiveGuildSelect }) => {
  const [activeGuildId, setActiveGuildId] = useState(null);
  const [getGuildsScoreByUserId, {
    data: guilds = {},
    isFetching,
    isSuccess,
    isError,
    isUninitialized,
  }] = useLazyGetGuildsScoreByUserIdQuery();

  useEffect(() => {
    if (!account) { return; }
    getGuildsScoreByUserId(account);
  }, [account]);

  useEffect(() => {
    setActiveGuildId(null);
  }, [account]);

  const handleOnGuildSelected = useCallback((guildData) => {
    if (activeGuildId === guildData.id) { return; }
    setActiveGuildId(guildData.id);
    onActiveGuildSelect(guildData);
  }, [activeGuildId]);

  const isEmpty = !guilds?.ids?.length;

  let content;
  if (isFetching || isUninitialized) {
    content = <MockGuildsList />;
  } else if (isError) {
    content = <ErrorGuildsList />;
  } else if (isEmpty) {
    content = <EmptyGuildsList />;
  } else if (isSuccess) {
    content = (
      <>
        {guilds.ids.map((id) => (
          <Grid item key={id}>
            <Guild id={id} name={guilds.entities[id].name} score={guilds.entities[id].score} isSelected={id === activeGuildId} onGuildSelected={() => handleOnGuildSelected(guilds.entities[id])} />
          </Grid>
        ))}
      </>
    );
  }
  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={3}>
      <Grid item xs={12}>
        <Grid container justifyContent="left" spacing={3}>
          {content}
        </Grid>
      </Grid>
    </Grid>
  );
};

const MockGuildsList = () => {
  const data = Array(5).fill();
  return (
    <>
      {data.map((_, key) => (
        <Grid item key={key}>
          <Guild isMock />
        </Grid>
      ))}
    </>
  );
};

const EmptyGuildsList = () => {
  const { t } = useTranslation();
  return (
    <Grid item>
      <Typography variant="body1" color="text.primary">{t('guildsList.errors.empty')}</Typography>
    </Grid>
  );
};

const ErrorGuildsList = () => {
  const { t } = useTranslation();
  return (
    <Grid item>
      <Typography variant="body1" color="text.primary">{t('guildsList.errors.fetching')}</Typography>
    </Grid>
  );
};

GuildsList.propTypes = {
  account: PropTypes.string,
  onActiveGuildSelect: PropTypes.func,
};

export default GuildsList;
