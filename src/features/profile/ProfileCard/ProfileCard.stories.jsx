import React from 'react';
import { graphql } from 'msw';
import { userEvent, waitForElementToBeRemoved, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import ProfileCard from './ProfileCard';
import { defaultUserData, userDataWithoutAvatar } from './ProfileCard.testData';
import { defaultCurrenciesList } from '../../wallet/WalletBalance/WalletBalance.testData';
import { renderWithProviders } from '../../../common/testsHelper';
import { zeroAddress } from '../../../common/contansts';
import { profileCard as profileCardNames } from '../../../../public/locales/en/translation.json';

const ARTIFICIAL_DELAY_MS = 600;

const defaultProfileState = {};

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div style={{ maxWidth: 265 }}>
      <ProfileCard {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  account: zeroAddress,
  readOnly: false,
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
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultUserData),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultCurrenciesList),
      )),
    ],
  },
};
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const btn = await canvas.findByText(profileCardNames.controls.copyAddress);
  await userEvent.click(btn);
  await canvas.findByText(profileCardNames.controls.copied);
};

const NoAvatar = Template.bind({});
NoAvatar.args = {
  storyTitle: 'No avatar',
  account: zeroAddress,
  readOnly: false,
};
NoAvatar.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
NoAvatar.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(userDataWithoutAvatar),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultCurrenciesList),
      )),
    ],
  },
};
NoAvatar.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitForElementToBeRemoved(() => canvas.queryByTestId('loading_account'));
  expect(canvasElement.querySelector('svg')).toBeInTheDocument();
};

const ReadOnly = Template.bind({});
ReadOnly.args = {
  storyTitle: 'Read only mode',
  account: zeroAddress,
  readOnly: true,
};
ReadOnly.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({ preloadedState: { profile: defaultProfileState } });
    return <MockStore><Story /></MockStore>;
  },
];
ReadOnly.parameters = {
  msw: {
    handlers: [
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultUserData),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultCurrenciesList),
      )),
    ],
  },
};
ReadOnly.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitForElementToBeRemoved(() => canvas.queryByTestId('loading_account'));
  expect(canvas.queryByText(profileCardNames.controls.copyAddress)).toBeNull();
  expect(canvas.queryByText(profileCardNames.controls.editProfile)).toBeNull();
};

const Error = Template.bind({});
Error.args = {
  storyTitle: 'Error',
  account: zeroAddress,
  readOnly: false,
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
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([
          { message: 'Failed to get data' },
        ]),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([
          { message: 'Failed to get data' },
        ]),
      )),
    ],
  },
};
Error.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('error_account');
};

const Loading = Template.bind({});
Loading.args = {
  storyTitle: 'Loading',
  account: zeroAddress,
  readOnly: false,
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
      graphql.query('GetUser', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
      graphql.query('GetWallet', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('loading_account');
};

const stories = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default,
  ReadOnly,
  NoAvatar,
  Loading,
  Error,
};

export default stories;
