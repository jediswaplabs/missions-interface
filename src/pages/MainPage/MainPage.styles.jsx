import styled from 'styled-components';
import { Tabs } from '@mui/material';

const MainpageContainer = styled.div``;

const MainpageContainerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MainpageContainerContent = styled.div``;

const JediSwapTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.accent,
  },
  '& .MuiTab-root': {
    fontSize: '16px',
  },
  '& .Mui-selected': {
    color: theme.palette.common.white,
  },
}));

export {
  MainpageContainer,
  MainpageContainerHeader,
  MainpageContainerContent,
  JediSwapTabs,
};
