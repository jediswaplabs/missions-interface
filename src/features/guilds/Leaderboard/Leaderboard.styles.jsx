import styled, { css } from 'styled-components';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { guildStyling } from '../Guild/Guild.styles';
import { widgetBoxMixin } from '../../../resources/styles/mixins';

const LeaderboardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 32px;

  svg {
    margin-top: -0.2rem;
  }

  ${(props) => props.guildTheme && css`
    background: ${guildStyling[props.guildTheme] || guildStyling.all};
  `}
`;

const LeaderboardContent = styled.div`

`;

const LeaderboardContainer = styled.div`
  ${widgetBoxMixin};
`;

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({ background: 'transparent' }));

export const StyledTableHead = styled(TableHead)(({ theme }) => ({ background: 'rgba(0, 0, 0, 0.2)' }));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  paddingLeft: '32px',
  paddingRight: '32px',
}));

export const StyledPaginationIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  '&.Mui-disabled': { color: theme.palette.grey['500'] },
  '&:hover': { backgroundColor: 'transparent' },
  '&:active': { backgroundColor: 'transparent' },
}));

export {
  LeaderboardContainer, LeaderboardHeader, LeaderboardContent,
};
