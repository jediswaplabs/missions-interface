import { subtractDays } from '../../../common/timeHelper';
import { nftImage1, nftImage2 } from '../NftCard/NftCard.testData';

const card1 = {
  title: 'Mesh User',
  level: 1,
  score: 300,
  image: nftImage1,
  isLocked: false,
  unlockedDate: subtractDays(3),
};

const card2 = {
  title: 'Mesh Developer',
  level: 1,
  score: 700,
  image: nftImage2,
  isLocked: false,
  unlockedDate: subtractDays(5),
};

const card3 = {
  title: 'Mesh Designer',
  level: 1,
  score: 1200,
  image: nftImage1,
  isLocked: false,
  unlockedDate: subtractDays(7),
};

const defaultNftListItems = {
  ids: ['id1', 'id2', 'id3', 'id4', 'id5', 'id6', 'id7', 'id8', 'id9', 'id10'],
  entities: {
    id1: {
      ...card1,
    },
    id2: {
      ...card2,
    },
    id3: {
      ...card3,
    },
    id4: {
      ...card1,
      isLocked: true,
    },
    id5: {
      ...card2,
      level: 2,
      isLocked: true,
    },

    id6: {
      ...card3,
      level: 3,
      isLocked: true,
    },
    id7: {
      ...card1,
      level: 3,
      isLocked: true,
    },
    id8: {
      ...card2,
      level: 4,
      isLocked: true,
    },
    id9: {
      ...card3,
      level: 4,
      isLocked: true,
    },
    id10: {
      ...card1,
      level: 5,
      isLocked: true,
    },
  },
};

const fewNftListItems = {
  ids: ['id1', 'id2'],
  entities: {
    id1: defaultNftListItems.entities.id1,
    id2: defaultNftListItems.entities.id2,
  },
};

const emptyNftListItems = {
  ids: [],
  entities: {},
};

export {
  defaultNftListItems,
  fewNftListItems,
  emptyNftListItems,
};
