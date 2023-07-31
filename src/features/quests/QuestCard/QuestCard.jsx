import React, { useCallback, useState } from 'react';
import { UnsupportedChainIdError, useStarknetReact } from '@web3-starknet-react/core';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import { SvgIcon } from '@mui/material';
// import { useTranslation } from 'react-i18next';
// import Box from '@mui/material/Box';
// import { Link, NavLink, useLocation } from 'react-router-dom';
//
//
// import { QuestBox, QuestCardBtn, QuestCardTitle, QuestCardType, QuestCardDescription, QuestCardCalend, QuestCardNftNum, LaunchSoon } from './QuestCard.styles';
// import GradientButton from '../GradientButton/GradientButton';
// import calend from '../../resources/images/calend.png';
// import medal from '../../resources/images/medal.png';
//
// const QuestCard = ({ questType, title, description, duration, nftAmount, campaignImg }) => {
//   const styles = {};
//   if (questType === 'FEATURED CONTEST') {
//     styles.maxWidth = '430px';
//   }
//   return (
//     <QuestBox>
//       <div>
//         <QuestCardType>{questType}</QuestCardType>
//         <QuestCardTitle>
//           {title}
//         </QuestCardTitle>
//         <QuestCardDescription style={styles}>
//           {description}
//         </QuestCardDescription>
//         <div style={{display: 'flex'}}>
//           {duration &&
//             <QuestCardCalend>
//               <div style={{ marginRight: '10px' }}>
//                 <img src={calend} />
//               </div>
//               <div style={{ marginRight: '20px' }}>
//                 <div style={{ marginBottom: '5px' }} className="duration_title">
//                   CONTEST DURATION
//                 </div>
//                 <div className="duration_text">
//                   {duration}
//                 </div>
//               </div>
//             </QuestCardCalend>
//           }
//           {!duration && <LaunchSoon>Launching Soon!</LaunchSoon>}
//           {nftAmount &&
//             <div style={{display: 'flex'}}>
//               <div>
//                 <img src={medal} style={{ position: 'relative', top: '-5px' }} />
//               </div>
//               <QuestCardNftNum>
//                 <div className="title">NFTs</div>
//                 <div className="value">{nftAmount}</div>
//               </QuestCardNftNum>
//             </div>}
//
//         </div>
//
//         <Link  to="/quest/3">
//           {duration && <QuestCardBtn>Check Eliglibility</QuestCardBtn>}
//         </Link>
//
//       </div>
//       {campaignImg && <div>
//         <img src={campaignImg} alt="alt" />
//       </div>}
//     </QuestBox>
//
//
//   )
// };
//
// export default QuestCard;
//

import { QuestBox, QuestBoxCaption, QuestBoxTitle } from './QuestCard.styles';
import GradientButton from '../../../components/GradientButton/GradientButton';

const QuestCard = ({ id = null, caption = '', title = '', description = '', dateStart = null, dateEnd = null, inline = false }) => {
  const a = 123;

  return (
    <QuestBox inline={inline}>
      <QuestBoxCaption>
        <Typography variant="h2" component="h2">
          {caption}
        </Typography>
      </QuestBoxCaption>

      <QuestBoxTitle>
        <Typography variant="body2" component="body">
          Return of the LPs
        </Typography>
      </QuestBoxTitle>

      <Typography variant="body2" component="body">
        This is our first-ever liquidity contest. With this initiative, we want to recognise and reward the most loyal liquidity providers of JediSwap with some special NFTs.
      </Typography>

      <Typography variant="body2" component="body">
        Launching Soon!
      </Typography>

      <GradientButton size="large">Foo</GradientButton>
      <GradientButton loading>Foo</GradientButton>
    </QuestBox>
  );
};

export default QuestCard;
