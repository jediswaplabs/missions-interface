import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const InfoLabel = styled(Typography)`
    color: #999;
    font-family: sans-serif;
    font-size: 32px !important;
    font-style: normal;
    font-weight: 700 !important;
    padding: 0 66px 0px 24px;
    line-height: 41.5px !important; /* 129.688% */
`;

const InfoBox = styled(Box)`
    border-radius: 8px;
    border: 1px solid rgba(160, 160, 160, 0.40);
    background: rgba(255, 255, 255, 0.05);
    // width: 413px;
    height: 321px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 30px;
    padding-bottom: 30px;
`;

export {
  InfoLabel,
  InfoBox,
};
