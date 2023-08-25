import styled from 'styled-components';
import { Box } from '@material-ui/core';

const RoundedRect = styled(Box)`
  width: 227px;
  height: 274px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid rgba(160, 160, 160, 0.40);
  background: rgba(255, 255, 255, 0.05);
  // flex-basis: 25%;
  margin: 10px;
`;
const ProfileHeading = styled.div`
  color: #FFF;
  font-feature-settings: 'salt' on, 'clig' off, 'liga' off;
  font-family: sans-serif;
  font-size: 34px;
  font-style: normal;
  font-weight: 700;
  line-height: 41.5px; /* 122.059% */
`;
const ProfileText = styled.div`
  color: #F2F2F2;
  text-align: center;
  font-family: sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 162.5% */
`;
export {
  RoundedRect,
  ProfileHeading,
  ProfileText
};