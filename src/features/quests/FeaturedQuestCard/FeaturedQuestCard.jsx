import React, { useCallback, useState } from 'react';
import Typography from '@mui/material/Typography';

import { FeaturedQuestBox, FeaturedQuestContent, FeaturedQuestImage } from './FeaturedQuestCard.styles';
import QuestCard from '../QuestCard/QuestCard';

const FeaturedQuestCard = ({ id = null, caption = '', title = '', description = '', dateStart = null, dateEnd = null }) => {
  const a = 123;

  return (
    <FeaturedQuestBox>
      <FeaturedQuestContent>
        <QuestCard inline caption="foo" />
      </FeaturedQuestContent>
      <FeaturedQuestImage>
        <img src="" />
      </FeaturedQuestImage>
    </FeaturedQuestBox>
    // <QuestBox>
    //   <QuestBoxCaption>
    //     <Typography variant="h2" component="h2">
    //       UPCOMING CONTEST
    //     </Typography>
    //   </QuestBoxCaption>
    //
    //   <QuestBoxTitle>
    //     <Typography variant="body2" component="body">
    //       Return of the LPs
    //     </Typography>
    //   </QuestBoxTitle>
    //
    //   <Typography variant="body2" component="body">
    //     This is our first-ever liquidity contest. With this initiative, we want to recognise and reward the most loyal liquidity providers of JediSwap with some special NFTs.
    //   </Typography>
    //
    //   <Typography variant="body2" component="body">
    //     Launching Soon!
    //   </Typography>
    // </QuestBox>
  );
};

export default FeaturedQuestCard;
