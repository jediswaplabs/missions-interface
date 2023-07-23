import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import CastleOutlinedIcon from '@mui/icons-material/CastleOutlined';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Box from '@mui/material/Box';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { LeaderboardContainer, LeaderboardHeader, LeaderboardContent, StyledTableContainer, StyledTableHead, StyledTableCell, StyledPaginationIconButton } from './Leaderboard.styles';
import { useLazyGetGuildLeaderboardBuGuildIdQuery } from '../../api/apiSlice';

const noop = () => {};

const makeFirstLetterUpper = (str = '') => {
  if (!(str && (typeof str === 'string'))) { return ''; }
  return [str.slice(0, 1).toLocaleUpperCase(), str.slice(1)].join('');
};

// eslint-disable-next-line max-params
const descendingComparator = (a, b, orderBy, data) => {
  if (data[b][orderBy] < data[a][orderBy]) { return -1; }
  if (data[b][orderBy] > data[a][orderBy]) { return 1; }
  return 0;
};

const getComparator = (order, orderBy, data) => (
  order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy, data)
    : (a, b) => -descendingComparator(a, b, orderBy, data)
);

// TODO My rank

const trendLookup = {
  up: 'up',
  down: 'down',
};

const ROWS_PER_PAGE = 3;

const LeaderboardTable = ({ title = '', guildId = '', guildName = '' }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const processedGuildName = makeFirstLetterUpper(guildName);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [getGuildsScoreByGuildId, {
    data: leaderboardData = {},
    isFetching,
    isSuccess,
    isError,
    isUninitialized,
  }] = useLazyGetGuildLeaderboardBuGuildIdQuery();

  useEffect(() => {
    if (!guildId) { return; }
    getGuildsScoreByGuildId(guildId);
  }, [guildId]);

  if (!guildId) {
    return <UnselectedLeaderboard />;
  }

  let content;
  if (isFetching || isUninitialized) {
    content = <MockLeaderBoard />;
  } else if (isError) {
    content = <ErrorLeaderBoard />;
  } else if (isSuccess) {
    content = (
      <>
        <StyledTableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell align="center"
                  style={{ width: '35%' }}
                >
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>{t('leaderboard.columns.address')}</Typography>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 'rank'}
                    direction={orderBy === 'rank' ? order : 'asc'}
                    onClick={(e) => handleRequestSort(e, 'rank')}
                  >
                    <Typography variant="body1"
                      color="text.primary"
                      sx={{ fontWeight: 'bold' }}
                    >{t('leaderboard.columns.rank')}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === 'points'}
                    direction={orderBy === 'points' ? order : 'asc'}
                    onClick={(e) => handleRequestSort(e, 'points')}
                  >
                    <Typography variant="body1"
                      color="text.primary"
                      sx={{ fontWeight: 'bold' }}
                    >{t('leaderboard.columns.points')}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {leaderboardData.ids
                .slice()
                .sort(getComparator(order, orderBy, leaderboardData.entities))
                .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
                .map((id) => (
                  <TableRow key={id}>
                    <StyledTableCell scope="row">
                      <RouterLink to={`/account/${leaderboardData.entities[id].address}`}>
                        <Typography variant="body1" color="text.primary">{leaderboardData.entities[id].address}</Typography>
                      </RouterLink>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5}>
                        <Typography variant="body1" color="text.primary">#{leaderboardData.entities[id].rank}</Typography>
                        <TrendArrow trend={leaderboardData.entities[id].positionTrend} />
                      </Stack>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Typography variant="body1" color="text.primary">{leaderboardData.entities[id].points}</Typography>
                    </StyledTableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </StyledTableContainer>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <TablePagination
            component="div"
            count={leaderboardData.ids.length}
            rowsPerPage={ROWS_PER_PAGE}
            rowsPerPageOptions={[]}
            labelDisplayedRows={noop}
            page={page}
            onPageChange={handleChangePage}
            ActionsComponent={TablePaginationActions}
            sx={{ margin: '10px 0', '& .MuiTablePagination-toolbar': { padding: 0 } }}
          />
        </Stack>
      </>
    );
  }

  return (
    <LeaderboardContainer>
      <LeaderboardHeader guildTheme={guildId}>
        <EmojiEventsOutlinedIcon sx={{ color: '#fff', marginRight: '16px', fontSize: '1.8rem' }} />
        <Typography variant="h6" color="text.primary">{title || t('leaderboard.title')} {processedGuildName ? `(${processedGuildName})` : ''}</Typography>
      </LeaderboardHeader>
      <LeaderboardContent>
        {content}
      </LeaderboardContent>
    </LeaderboardContainer>
  );
};

LeaderboardTable.propTypes = {
  title: PropTypes.string,
  guildId: PropTypes.string,
  guildName: PropTypes.string,
};

const UnselectedLeaderboard = () => {
  const { t } = useTranslation();
  return (
    <LeaderboardContainer>
      <LeaderboardHeader>
        <EmojiEventsOutlinedIcon sx={{ color: '#fff', marginRight: '16px', fontSize: '1.8rem' }} />
        <Typography variant="h6" color="text.primary">{t('leaderboard.title')}</Typography>
      </LeaderboardHeader>
      <LeaderboardContent>
        <Stack direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ margin: '25px 0 30px' }}
        >
          <Stack direction="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
            sx={{ maxWidth: '220px', textAlign: 'center' }}
          >
            <CastleOutlinedIcon sx={{ color: '#fff', marginBottom: '10px', fontSize: '4.2rem' }} />
            <Typography variant="subtitle1" color="text.primary">{t('leaderboard.errors.unselected')}</Typography>
          </Stack>
        </Stack>
      </LeaderboardContent>
    </LeaderboardContainer>
  );
};

const ErrorLeaderBoard = () => {
  const { t } = useTranslation();
  return (
    <Stack direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ margin: '25px 0 30px' }}
      data-testid="error"
    >
      <Stack direction="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
        sx={{ maxWidth: '220px', textAlign: 'center' }}
      >
        <Typography variant="subtitle1" color="text.primary">{t('leaderboard.errors.fetching')}</Typography>
      </Stack>
    </Stack>
  );
};

const MockLeaderBoard = () => {
  const data = Array(3).fill();

  return (
    <StyledTableContainer component={Paper} data-testid="loading">
      <Table>
        <StyledTableHead>
          <TableRow>
            <TableCell><Stack alignItems="center"><Typography variant="body1"><Skeleton width={75} /></Typography></Stack></TableCell>
            <TableCell><Stack alignItems="center"><Typography variant="body1"><Skeleton width={75} /></Typography></Stack></TableCell>
            <TableCell><Stack alignItems="center"><Typography variant="body1"><Skeleton width={75} /></Typography></Stack></TableCell>
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {data.map((row, key) => (
            <TableRow key={key}>
              <StyledTableCell><Typography variant="body1"><Skeleton width={120} /></Typography></StyledTableCell>
              <StyledTableCell><Typography variant="body1"><Skeleton width={120} /></Typography></StyledTableCell>
              <StyledTableCell><Typography variant="body1"><Skeleton width={120} /></Typography></StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
};

const TablePaginationActions = ({ count, page, rowsPerPage, onPageChange = noop }) => {
  const { t } = useTranslation();

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const isBackButtonDisabled = (page === 0);
  const isNextButtonDisabled = (page >= Math.ceil(count / rowsPerPage) - 1);

  return (
    <Box sx={{ flexShrink: 0, ml: 4, margin: 0 }}>
      <StyledPaginationIconButton
        onClick={handleBackButtonClick}
        disabled={isBackButtonDisabled}
        disableRipple
        color="primary"
      >
        <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5}>
          <KeyboardArrowLeft />
          <Typography variant="body2">{t('leaderboard.controls.prev')}</Typography>
        </Stack>
      </StyledPaginationIconButton>

      <StyledPaginationIconButton
        onClick={handleNextButtonClick}
        disabled={isNextButtonDisabled}
        disableRipple
        color="primary"
      >
        <Stack direction="row" alignItems="center" justifyContent="center" gap={0.5}>
          <Typography variant="body2">{t('leaderboard.controls.next')}</Typography>
          <KeyboardArrowRight />
        </Stack>
      </StyledPaginationIconButton>
    </Box>
  );
};

const TrendArrow = ({ trend = '' }) => {
  if (trend === trendLookup.up) {
    return (
      <ArrowDropUpIcon color="success" sx={{ fontSize: '2rem' }} />
    );
  }
  if (trend === trendLookup.down) {
    return (
      <ArrowDropDownIcon color="error" sx={{ fontSize: '2rem' }} />
    );
  }
  return null;
};

export default LeaderboardTable;
export {
  ROWS_PER_PAGE,
};
