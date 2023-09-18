import styled from 'styled-components';
import Box from '@mui/material/Box';

const QuestBox = styled(Box)`
  border-radius: 8px;
  border: 1px solid rgba(160, 160, 160, 0.40);
  background: rgba(255, 255, 255, 0.05);
  // max-width: 1090px;
  height: 100%;
  display: flex;
  // flex-direction: column;
  justify-content: space-between;
  padding-left: 60px;
  padding-bottom: 60px;
  padding-right: 30px;
  padding-top: 30px;
`;

const QuestCardCalend = styled.div`
  display: flex;
  margin-bottom: 30px;
  .duration_title {
    color: #F2F2F2;
    font-family: DM Sans, sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 166.667% */
  }
  .duration_text {
    color: var(--white, #FFF);
    font-family: DM Sans, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 125% */
  }
`;

const QuestCardType = styled.p`
  color: #FFF;
  font-family: DM Sans, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
`;

const QuestCardTitle = styled.p`
  color: var(--jedi-white, #FFF);
  font-feature-settings: 'salt' on, 'clig' off, 'liga' off;
  font-family: DM Sans, sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 62.5% */
`;

const QuestCardDescription = styled.p`
  color: #F2F2F2;
  font-family: DM Sans, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 26px; /* 162.5% */
  max-width: 480px;
`;

const QuestCardNftNum = styled.div`
  .title {
    color: #F2F2F2;
    font-family: DM Sans, sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px; /* 166.667% */
  }
  .value {
    color: var(--white, #FFF);
    font-family: DM Sans, sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px; /* 125% */
  }
`;

const LaunchSoon = styled.div`
  color: var(--jedi-white, #FFF);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Avenir LT Std, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 750;
  line-height: 20px; /* 100% */
  margin-top: 20px;
`;
const QuestCardBtn = styled.button`
  width: 314.125px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--jedi-gradient, linear-gradient(151deg, #29AAFD 0%, #FF00E9 100%));
  color: var(--jedi-white, #FFF);
  text-align: center;
  font-feature-settings: 'clig' off, 'liga' off;
  font-family: Avenir LT Std, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 750;
  line-height: 20px; /* 100% */
  border: unset;
  cursor: pointer;
  &:disabled {
    border-radius: 8px;
    background: var(--jedi-navy-blue, #141451);
    box-shadow: 0px 0.7697721123695374px 30.790884017944336px 0px rgba(227, 222, 255, 0.20) inset, 0px 3.0790884494781494px 13.8558988571167px 0px rgba(154, 146, 210, 0.30) inset, 0px 75.43766784667969px 76.97720336914062px -36.949066162109375px rgba(202, 172, 255, 0.30) inset;
   cursor: not-allowed;   
   color: #9B9B9B
  }
`;
const QuestCardAddress = styled.div`
  color: var(--jedi-white, #FFF);
  font-feature-settings: 'salt' on, 'clig' off, 'liga' off;
  font-family: Avenir LT Std, sans-serif;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 90.909% */
`;

export {
  QuestBox,
  QuestCardType,
  QuestCardTitle,
  QuestCardDescription,
  QuestCardBtn,
  QuestCardCalend,
  QuestCardNftNum,
  LaunchSoon,
  QuestCardAddress,
};
