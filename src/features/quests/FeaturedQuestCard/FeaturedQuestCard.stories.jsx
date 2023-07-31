import React from 'react';

import FeaturedQuestCard from './FeaturedQuestCard';
import { renderWithProviders } from '../../../common/testsHelper';

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>
      {args.storyTitle} Example
    </h3>
    <br />
    <div style={{ maxWidth: '1090px' }}>
      <FeaturedQuestCard {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
};
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({
      preloadedState: { },
    });
    return (
      <MockStore>
        <Story />
      </MockStore>
    );
  },
];
Default.parameters = {};
Default.play = async (args) => {};

const stories = {
  title: 'Components/FeaturedQuestCard',
  component: FeaturedQuestCard,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
};

export default stories;
