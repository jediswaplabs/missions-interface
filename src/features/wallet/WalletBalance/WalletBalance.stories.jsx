import React from 'react';
import { graphql } from 'msw';

import WalletBalance from './WalletBalance';
import { defaultCurrenciesList, emptyCurrenciesList } from './WalletBalance.testData';
import { zeroAddress } from '../../../common/contansts';
import { renderWithProviders } from '../../../common/testsHelper';

const ARTIFICIAL_DELAY_MS = 600;

const defaultProfileState = { };

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ maxWidth: '280px' }}>
      <WalletBalance {...args} />
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
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultCurrenciesList),
      )),
    ],
  },
};
Default.play = async ({ canvasElement }) => {};

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
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {};

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
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([
          { message: 'Failed to get data' }]),
      )),
    ],
  },
};
Error.play = async ({ canvasElement }) => {};

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
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(emptyCurrenciesList),
      )),
    ],
  },
};
Empty.play = async ({ canvasElement }) => {};

const stories = {
  title: 'Components/Wallet',
  component: WalletBalance,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
  Loading,
  Empty,
  Error,
};

export default stories;
