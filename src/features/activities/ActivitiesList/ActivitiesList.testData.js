import { subtractDays } from '../../../common/timeHelper';

const defaultListItems = {
  ids: ['id1', 'id2', 'id3', 'id4', 'id5'],
  entities: {
    id1: { title: 'Scored 130 Mesh Point for Design Guild', date: subtractDays(1) },
    id4: { title: 'Scored 130 Mesh Point for Design Guild', date: subtractDays(125) },
    id2: { title: 'Scored 80 Mesh Point for Growth Guild', date: subtractDays(32) },
    id3: { title: 'Earned Level 1 Designer NFT for 800 points', date: subtractDays(77) },
    id5: { title: 'Scored 130 Mesh Point for Design Guild', date: subtractDays(373) },
  },
};

const fewListItems = {
  ids: ['id1', 'id2'],
  entities: {
    id1: defaultListItems.entities.id1,
    id2: defaultListItems.entities.id2,
  },
};

const emptyItems = {
  ids: [],
  entities: {},
};

export {
  defaultListItems,
  fewListItems,
  emptyItems,
};
