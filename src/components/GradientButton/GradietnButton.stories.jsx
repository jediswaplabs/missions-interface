import React from 'react';

import GradientButton from './GradientButton';

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ maxWidth: '280px' }}>
      <GradientButton {...args}>Button</GradientButton>
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  variant: 'contained',
};
Default.play = async ({ canvasElement }) => {};

const stories = {
  title: 'Components/GradientButton',
  component: GradientButton,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
};

export default stories;
