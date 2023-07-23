import React from 'react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { defaultAvatar } from './UserAvatar.testData';
import UserAvatar from './UserAvatar';

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ maxWidth: '280px' }}>
      <UserAvatar {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  src: defaultAvatar,
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByRole('img');
};

const Mock = Template.bind({});
Mock.args = {
  storyTitle: 'Mock',
  isMock: true,
};
Mock.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('loading_avatar');
};

const Empty = Template.bind({});
Empty.args = {
  storyTitle: 'Empty',
  src: '',
};
Empty.play = ({ canvasElement }) => {
  expect(canvasElement.querySelector('svg')).toBeInTheDocument();
};

const stories = {
  title: 'Components/UserAvatar',
  component: UserAvatar,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default, Mock, Empty,
};

export default stories;
