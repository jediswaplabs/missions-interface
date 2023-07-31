import React, { useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Collapse from '@mui/material/Collapse';
import deepcopy from 'deepcopy';
import Stack from '@mui/material/Stack';

import { ActivitiesBoxContainer, ActivitiesBoxHeader, ActivitiesBoxItems } from './ActivitiesList.styles';
import { useLazyGetActivitiesByUserIdQuery } from '../../api/apiSlice';
import { getTimeAgo } from '../../../common/timeHelper';

const MAX_VISIBLE_ITEMS_AMOUNT = 3;

const ActivitiesList = ({ account }) => {
  const { t } = useTranslation();

  const [getActivitiesByUserId, {
    data: activities = {},
    isFetching,
    isSuccess,
    isError,
    isUninitialized,
  }] = useLazyGetActivitiesByUserIdQuery();

  useEffect(() => {
    if (!account) { return; }
    getActivitiesByUserId(account);
  }, [account]);

  const [isShowMoreActive, setIsShowMoreActive] = useState(false);
  const handleShowMoreClick = useCallback((e) => {
    e.preventDefault();
    setIsShowMoreActive(!isShowMoreActive);
  }, [isShowMoreActive]);

  const isEmpty = !activities?.ids?.length;
  const getVisibleAndHiddenItems = (itemsIds = []) => {
    if (!itemsIds?.length) { return [[], []]; }
    return [itemsIds.slice(0, MAX_VISIBLE_ITEMS_AMOUNT), itemsIds.slice(MAX_VISIBLE_ITEMS_AMOUNT)];
  };

  const sortedActivities = useMemo(() => {
    if (isEmpty) { return {}; }
    const copiedActivities = deepcopy(activities);
    const sortedIds = copiedActivities.ids.sort((a, b) => (copiedActivities.entities[b].date - copiedActivities.entities[a].date));
    return {
      ids: sortedIds,
      entities: copiedActivities.entities,
    };
  }, [activities]);

  let content;
  if (isFetching || isUninitialized) {
    content = <MockActivitiesList />;
  } else if (isError) {
    content = <ErrorActivitiesList />;
  } else if (isEmpty || !account) {
    content = <EmptyActivitiesList />;
  } else if (isSuccess) {
    const [visibleItemsIds, hiddenItemsIds] = getVisibleAndHiddenItems(sortedActivities.ids);
    content = (
      <>
        <List sx={{ width: '100%', bgcolor: 'transparent' }} disablePadding>
          {visibleItemsIds.map((itemId) => (<ActivitiesListItem {...activities.entities[itemId]} key={itemId} />))}
          {!!(hiddenItemsIds?.length) && (
            <Collapse in={isShowMoreActive} timeout="auto" unmountOnExit>
              {hiddenItemsIds.map((itemId) => (<ActivitiesListItem {...activities.entities[itemId]} key={itemId} />))}
            </Collapse>
          )}
        </List>
        {!!(hiddenItemsIds?.length) && (
          <Link component="button" underline="none" variant="body2" sx={{ marginTop: '30px', display: 'inline-block' }} onClick={handleShowMoreClick}>
            {(isShowMoreActive) ? t('activitiesList.controls.showLess') : t('activitiesList.controls.showMore')}
          </Link>
        )}
      </>
    );
  }

  return (
    <ActivitiesBoxContainer>
      <ActivitiesBoxHeader>
        <Typography variant="h6" color="text.primary" sx={{ padding: '20px 32px' }}>{t('activitiesList.titles.title')}</Typography>
        <Divider variant="fullWidth" />
      </ActivitiesBoxHeader>
      <ActivitiesBoxItems>
        {content}
      </ActivitiesBoxItems>
    </ActivitiesBoxContainer>
  );
};

const ActivitiesListItem = ({ title, date }) => {
  const { i18n } = useTranslation();
  const formattedDate = getTimeAgo(date, i18n.language);
  return (
    <ListItem disablePadding dense key={title}>
      <ListItemText
        sx={{ margin: 0 }}
        primary={title}
        secondary={formattedDate}
        primaryTypographyProps={{ color: 'text.primary', variant: 'body1' }}
        secondaryTypographyProps={{ color: 'grey.500', variant: 'caption' }}
      />
    </ListItem>
  );
};

const MockActivitiesList = () => {
  const data = Array(3).fill();
  return (
    <div data-testid="loading_activitylist">
      {data.map((_, key) => (
        <div style={{ marginBottom: '14px' }} key={key}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          <Skeleton variant="text" sx={{ fontSize: '0.875rem' }} width="15%" />
        </div>
      ))}
    </div>
  );
};

const EmptyActivitiesList = () => {
  const { t } = useTranslation();
  return (
    <>
      <Stack alignItems="center" gap={2.5} sx={{ margin: '60px 0' }} data-testid="empty_activitylist">
        <Stack alignItems="center" gap={2}>
          <EmptyBubblePlaceholder />
          <EmptyBubblePlaceholder width="85%" />
        </Stack>
        <Typography variant="body1" color="text.primary" align="center" sx={{ maxWidth: '130px' }}>{t('activitiesList.errors.empty')}</Typography>
      </Stack>
    </>

  );
};

const ErrorActivitiesList = () => {
  const { t } = useTranslation();
  return (
    <Typography variant="body1" color="text.primary" data-testid="error_activitylist">{t('activitiesList.errors.fetching')}</Typography>
  );
};

const EmptyBubblePlaceholder = ({ width = '100%', height = 'auto' }) => (
  <svg width={width} height={height} viewBox="0 0 167 37" fill="none">
    <rect opacity="0.8" width="166.038" height="36.2264" rx="8" fill="white" />
    <rect x="9.05664" y="9.05664" width="18.1132" height="18.1132" rx="4" fill="#757575" />
    <rect x="37.7358" y="11.3208" width="92.8302" height="4.5283" rx="2" fill="#757575" />
    <rect x="37.7358" y="20.3774" width="45.283" height="4.5283" rx="2" fill="#757575" />
  </svg>
);

ActivitiesList.propTypes = {
  account: PropTypes.string,
};

export default ActivitiesList;
export {
  MAX_VISIBLE_ITEMS_AMOUNT,
};
