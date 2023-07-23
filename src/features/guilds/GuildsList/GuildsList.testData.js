import deepcopy from 'deepcopy';

const defaultGuildsList = {
  ids: ['design', 'development', 'growth', 'problemSolving', 'communityManagement', 'contentWriting'],
  entities: {
    design: {
      id: 'design',
      name: 'Design',
      score: null,
    },
    development: {
      id: 'development',
      name: 'Development',
      score: null,
    },
    growth: {
      id: 'growth',
      name: 'Growth',
      score: null,
    },
    problemSolving: {
      id: 'problemSolving',
      name: 'Problem Solving',
      score: null,
    },
    communityManagement: {
      id: 'communityManagement',
      name: 'Community Management',
      score: null,
    },
    contentWriting: {
      id: 'contentWriting',
      name: 'Content Writing',
      score: null,
    },
  },
};

const emptyGuildsList = {};

const guildsListWithScore = deepcopy(defaultGuildsList);

guildsListWithScore.entities[guildsListWithScore.ids[0]].score = 100;
guildsListWithScore.entities[guildsListWithScore.ids[3]].score = 200;

export {
  defaultGuildsList,
  emptyGuildsList,
  guildsListWithScore,
};
