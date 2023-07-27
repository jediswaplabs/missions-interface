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

export {
  RoundedRect,
};