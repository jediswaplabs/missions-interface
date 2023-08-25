import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

const InfoLabel = styled(Typography)`
    color: #999;
    font-feature-settings: 'salt' on, 'clig' off, 'liga' off;
    font-family: DM Sans;
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    padding: 0 48px;
    line-height: 41.5px; /* 129.688% */
    // width: 280px;
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
    InfoBox
};