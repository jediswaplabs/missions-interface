import React from 'react';

import QuestCard from './QuestCard';
import { renderWithProviders } from '../../../common/testsHelper';

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>
      {args.storyTitle} Example
    </h3>
    <br />
    <div style={{ maxWidth: '380px' }}>
      <QuestCard {...args} />
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
  title: 'Components/QuestCard',
  component: QuestCard,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
};

export default stories;
