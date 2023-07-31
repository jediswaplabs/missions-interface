import styled, { css } from 'styled-components';

import { widgetBoxMixin } from '../../../resources/styles/mixins';

const QuestBox = styled.div`

  ${(props) => !props.inline && css`
    ${widgetBoxMixin};
    padding: 45px;
    padding-right: 100px;
  `}
`;

const QuestBoxCaption = styled.div`
  margin-bottom: 20px;
`;

const QuestBoxTitle = styled.div`
  margin-bottom: 20px;
`;

export {
  QuestBox,
  QuestBoxCaption,
  QuestBoxTitle,
};

// const QuestCardCalend = styled.div`
//   display: flex;
//   margin-bottom: 30px;
//   .duration_title {
//     color: #F2F2F2;
//     font-family: DM Sans;
//     font-size: 12px;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 20px; /* 166.667% */
//   }
//   .duration_text {
//     color: var(--white, #FFF);
//     font-family: DM Sans;
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 20px; /* 125% */
//   }
// `;
//
// const QuestCardType = styled.p`
//   color: #FFF;
//   font-family: DM Sans;
//   font-size: 14px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 20px; /* 142.857% */
// `;
//
// const QuestCardTitle = styled.p`
//   color: var(--jedi-white, #FFF);
//   font-feature-settings: 'salt' on, 'clig' off, 'liga' off;
//   font-family: DM Sans;
//   font-size: 32px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 20px; /* 62.5% */
// `;
//
// const QuestCardDescription = styled.p`
//   color: #F2F2F2;
//   font-family: DM Sans;
//   font-size: 16px;
//   font-style: normal;
//   font-weight: 400;
//   line-height: 26px; /* 162.5% */
//   max-width: 480px;
// `;
//
// const QuestCardNftNum = styled.div`
//   .title {
//     color: #F2F2F2;
//     font-family: DM Sans;
//     font-size: 12px;
//     font-style: normal;
//     font-weight: 500;
//     line-height: 20px; /* 166.667% */
//   }
//   .value {
//     color: var(--white, #FFF);
//     font-family: DM Sans;
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: 20px; /* 125% */
//   }
// `;
//
// const LaunchSoon = styled.div`
//   color: var(--jedi-white, #FFF);
//   text-align: center;
//   font-feature-settings: 'clig' off, 'liga' off;
//   font-family: Avenir LT Std;
//   font-size: 20px;
//   font-style: normal;
//   font-weight: 750;
//   line-height: 20px; /* 100% */
// `;
// const QuestCardBtn = styled.button`
//   width: 314.125px;
//   height: 56px;
//   flex-shrink: 0;
//   border-radius: 8px;
//   background: var(--jedi-gradient, linear-gradient(151deg, #29AAFD 0%, #FF00E9 100%));
//   color: var(--jedi-white, #FFF);
//   text-align: center;
//   font-feature-settings: 'clig' off, 'liga' off;
//   font-family: Avenir LT Std;
//   font-size: 20px;
//   font-style: normal;
//   font-weight: 750;
//   line-height: 20px; /* 100% */
//   border: unset;
//   cursor: pointer;
// `;
// const QuestCardAddress = styled.div`
//   color: var(--jedi-white, #FFF);
//   font-feature-settings: 'salt' on, 'clig' off, 'liga' off;
//   font-family: Avenir LT Std;
//   font-size: 22px;
//   font-style: normal;
//   font-weight: 700;
//   line-height: 20px; /* 90.909% */
// `;
//
// export {
//   QuestBox,
//   QuestCardType,
//   QuestCardTitle,
//   QuestCardDescription,
//   QuestCardBtn,
//   QuestCardCalend,
//   QuestCardNftNum,
//   LaunchSoon,
//   QuestCardAddress
// };
