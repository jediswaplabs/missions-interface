import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Link from '@mui/material/Link';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import { GuildItemBoxContainer } from './Guild.styles';

const noop = () => {};

const START_CONTRIBUTIONS_URL = 'https://jediswap.xyz/';

const Guild = ({
  isMock = false, id = '', name = '', score = 0, isSelected = false, onGuildSelected = noop,
}) => {
  const { t } = useTranslation();
  const isGuildActive = (score && score > 0);
  const handleGuildClick = useCallback(() => {
    if (!isGuildActive || isSelected) { return; }
    onGuildSelected();
  }, [isGuildActive, isSelected, onGuildSelected]);

  if (isMock) { return <MockGuild />; }

  const selected = isGuildActive && isSelected;
  return (
    <GuildItemBoxContainer className="guild-item-box" active={isGuildActive} data-testid={selected ? 'selected_guild' : null} selected={selected} guildTheme={id} onClick={handleGuildClick}>
      <Typography variant="body2" color="text.primary" className="title" data-testid="guild-title">{name}</Typography>
      {score
        ? (
          <>
            <Typography variant="body2" color="text.primary" className="points">{score}</Typography>
            <Typography variant="body2" color="text.primary" className="points-label">{t('guild.meshPoints')}</Typography>
          </>
        )
        : (
          <>
            <Typography variant="body2" color="text.primary" className="subtitle">{t('guild.kickStart')} &nbsp;
              <RocketLaunchIcon sx={{ fontSize: '1.3em' }} />
            </Typography>
            <div className="contribution-link">
              {/* TODO разрбоаться как выровнить и как добавить ссылку */}
              <Link href={START_CONTRIBUTIONS_URL} target="_blank" rel="noopener noreferrer" underline="none" variant="body2" sx={{ lineHeight: 1, fontSize: '12px' }}>{t('guild.startContrib')}</Link>
              <ArrowForwardIosRoundedIcon color="primary" />
            </div>
          </>
        )}
    </GuildItemBoxContainer>
  );
};

const MockGuild = () => (
  <GuildItemBoxContainer data-testid="loading_guild">
    <Typography variant="body2" className="title"><Skeleton /></Typography>
    <Typography variant="body2" className="points"><Skeleton width="50px" /></Typography>
    <Typography variant="body2" className="points-label"><Skeleton /></Typography>
  </GuildItemBoxContainer>
);

Guild.propTypes = {
  isMock: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  isSelected: PropTypes.bool,
  onGuildSelected: PropTypes.func,
};

export default Guild;
