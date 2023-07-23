import React from 'react';
import { graphql } from 'msw';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import NftCarousel from './NftCarousel';
import { defaultNftListItems, emptyNftListItems, fewNftListItems } from './NftCarousel.testData';
import { zeroAddress } from '../../../common/contansts';
import { renderWithProviders } from '../../../common/testsHelper';
import { meshNftsCarousel as meshNftsCarouselNames } from '../../../../public/locales/en/translation.json';

const ARTIFICIAL_DELAY_MS = 600;

const defaultProfileState = { };

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div>
      <NftCarousel {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  account: zeroAddress,
};
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Default.parameters = {
  msw: {
    handlers: [
      graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultNftListItems),
      )),
    ],
  },
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const levels = await getLevels(canvas);
  expect(levels).toHaveLength(defaultNftListItems.ids.length);
};

const FewItems = Template.bind({});
FewItems.args = {
  storyTitle: 'Few Items',
  account: zeroAddress,
};
FewItems.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
FewItems.parameters = {
  msw: {
    handlers: [
      graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(fewNftListItems),
      )),
    ],
  },
};
FewItems.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const levels = await getLevels(canvas);
  expect(levels).toHaveLength(fewNftListItems.ids.length);
};

const Loading = Template.bind({});
Loading.args = {
  storyTitle: 'Loading',
  account: zeroAddress,
};
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Loading.parameters = {
  msw: {
    handlers: [
      graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('loading_carousel');
};

const Empty = Template.bind({});
Empty.args = {
  storyTitle: 'Empty',
  account: zeroAddress,
};
Empty.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Empty.parameters = {
  msw: {
    handlers: [
      graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(emptyNftListItems),
      )),
    ],
  },
};
Empty.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('empty_carousel');
};

const Error = Template.bind({});
Error.args = {
  storyTitle: 'Error',
  account: zeroAddress,
};
Error.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
Error.parameters = {
  msw: {
    handlers: [
      graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([
          { message: 'Failed to get data' }]),
      )),
    ],
  },
};
Error.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('error_carousel');
};

const stories = {
  title: 'Components/NftCarousel',
  component: NftCarousel,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

function getLevels(canvas) {
  const text = meshNftsCarouselNames.card.level.replace(/{{\s*level\s*}}/g, '');
  const re = new RegExp(text, 'g');
  return canvas.findAllByText(re);
}

export {
  Default,
  FewItems,
  Loading,
  Empty,
  Error,
};

export default stories;
