import React from 'react';
import { graphql } from 'msw';
import { within, userEvent, findByText, getByText, getAllByRole, findAllByRole, waitFor, waitForElementToBeRemoved } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import ActivitiesList, { MAX_VISIBLE_ITEMS_AMOUNT } from './ActivitiesList';
import { defaultListItems,
  fewListItems,
  emptyItems } from './ActivitiesList.testData';
import { zeroAddress } from '../../../common/contansts';
import { renderWithProviders } from '../../../common/testsHelper';
import { activitiesList as activitiesListNames } from '../../../../public/locales/en/translation.json';

const ARTIFICIAL_DELAY_MS = 600;

const defaultProfileState = {};

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>
      {args.storyTitle} Example
    </h3>
    <br />
    <div style={{ maxWidth: '280px' }}>
      <ActivitiesList {...args} />
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
    const MockStore = renderWithProviders({
      preloadedState: { profile: defaultProfileState },
    });
    return (
      <MockStore>
        <Story />
      </MockStore>
    );
  },
];
Default.parameters = {
  msw: {
    handlers: [
      graphql.query('GetActivities', (req, res, ctx) => res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.data(defaultListItems))),
    ],
  },
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step('Initial items count', async () => {
    const items = await canvas.findAllByRole('listitem');
    expect(items).toHaveLength(MAX_VISIBLE_ITEMS_AMOUNT);
  });
  await step('Show more', async () => {
    const showMore = await canvas.findByText(activitiesListNames.controls.showMore);
    await userEvent.click(showMore);
    const items = await canvas.findAllByRole('listitem');
    expect(items).toHaveLength(defaultListItems.ids.length);
  });
  await step('Show less', async () => {
    const showLess = await canvas.findByText(activitiesListNames.controls.showLess);
    await userEvent.click(showLess);
    await waitFor(async () => {
      const items = await canvas.findAllByRole('listitem');
      expect(items).toHaveLength(MAX_VISIBLE_ITEMS_AMOUNT);
    });
  });
};

const FewItems = Template.bind({});
FewItems.args = {
  storyTitle: 'Few Items',
  account: zeroAddress,
};
FewItems.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({
      preloadedState: { profile: defaultProfileState },
    });
    return (
      <MockStore>
        <Story />
      </MockStore>
    );
  },
];
FewItems.parameters = {
  msw: {
    handlers: [
      graphql.query('GetActivities', (req, res, ctx) => res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.data(fewListItems))),
    ],
  },
};
FewItems.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await waitForElementToBeRemoved(() => canvas.queryByTestId('loading_activitylist'));
  expect(canvas.queryByText(activitiesListNames.controls.showMore)).toBeNull();
};

const Loading = Template.bind({});
Loading.args = {
  storyTitle: 'Loading',
  account: zeroAddress,
};
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({
      preloadedState: { profile: defaultProfileState },
    });
    return (
      <MockStore>
        <Story />
      </MockStore>
    );
  },
];
Loading.parameters = {
  msw: {
    handlers: [
      graphql.query('GetActivities', (req, res, ctx) => res(ctx.delay('infinite'))),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('loading_activitylist');
};

const Empty = Template.bind({});
Empty.args = {
  storyTitle: 'Empty',
  account: zeroAddress,
};
Empty.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({
      preloadedState: { profile: defaultProfileState },
    });
    return (
      <MockStore>
        <Story />
      </MockStore>
    );
  },
];
Empty.parameters = {
  msw: {
    handlers: [
      graphql.query('GetActivities', (req, res, ctx) => res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.data(emptyItems))),
    ],
  },
};
Empty.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('empty_activitylist');
};

const Error = Template.bind({});
Error.args = {
  storyTitle: 'Error',
  account: zeroAddress,
};
Error.decorators = [
  (Story) => {
    const MockStore = renderWithProviders({
      preloadedState: { profile: defaultProfileState },
    });
    return (
      <MockStore>
        <Story />
      </MockStore>
    );
  },
];
Error.parameters = {
  msw: {
    handlers: [
      graphql.query('GetActivities', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.errors([{ message: 'Failed to get data' }]),
      )),
    ],
  },
};
Error.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('error_activitylist');
};

const stories = {
  title: 'Components/ActivitiesList',
  component: ActivitiesList,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

export {
  Default, FewItems, Loading, Empty, Error,
};

export default stories;
