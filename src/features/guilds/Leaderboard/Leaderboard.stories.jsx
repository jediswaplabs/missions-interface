import React from 'react';
import { graphql } from 'msw';
import { within, userEvent, findByText, getByText, getAllByRole, findAllByRole } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import LeaderboardTable, { ROWS_PER_PAGE } from './Leaderboard';
import { defaultLeaderboardData } from './Leaderboard.testData';
import { renderWithProviders } from '../../../common/testsHelper';
import { leaderboard as leaderboardNames } from '../../../../public/locales/en/translation.json';

const ranks = defaultLeaderboardData.ids.map((id) => defaultLeaderboardData.entities[id].rank);
const points = defaultLeaderboardData.ids.map((id) => defaultLeaderboardData.entities[id].points);

const ARTIFICIAL_DELAY_MS = 600;

const Template = (args) => (
  <>
    <h3 style={{ borderBottom: 'solid 1px #fff', color: '#fff' }}>{args.storyTitle} Example</h3>
    <br />
    <div>
      <LeaderboardTable {...args} />
    </div>
  </>
);

const Default = Template.bind({});
Default.args = {
  storyTitle: 'Default',
  guildId: 'growth',
  guildName: 'Growth',
};
Default.decorators = [
  (Story) => {
    const MockStore = renderWithProviders();
    return <MockStore><Story /></MockStore>;
  },
];
Default.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultLeaderboardData),
      )),
    ],
  },
};
Default.play = async ({ canvasElement, step }) => {
  const canvas = within(canvasElement);
  await step('Sorting ranks ascending', async () => {
    await testRankOrder(canvas, true);
  });

  await step('Sorting ranks descending', async () => {
    await testRankOrder(canvas, false);
  });

  await step('Sorting points ascending', async () => {
    await testPointsOrder(canvas, true);
  });

  await step('Sorting points descending', async () => {
    await testPointsOrder(canvas, false);
  });

  await step('Pagination', async () => {
    await testPagination(canvas);
  });
};

const UnselectedGuild = Template.bind({});
UnselectedGuild.args = {
  storyTitle: 'UnselectedGuild',
};
UnselectedGuild.decorators = [
  (Story) => {
    const MockStore = renderWithProviders();
    return <MockStore><Story /></MockStore>;
  },
];
UnselectedGuild.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.data(defaultLeaderboardData),
      )),
    ],
  },
};
UnselectedGuild.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('CastleOutlinedIcon');
};

const Loading = Template.bind({});
Loading.args = {
  storyTitle: 'Loading',
  guildId: 'growth',
  guildName: 'Growth',
};
Loading.decorators = [
  (Story) => {
    const MockStore = renderWithProviders();
    return <MockStore><Story /></MockStore>;
  },
];
Loading.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
        ctx.delay('infinite'),
      )),
    ],
  },
};
Loading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByTestId('loading');
};

const Error = Template.bind({});
Error.args = {
  storyTitle: 'Error',
  guildId: 'growth',
  guildName: 'Growth',
};
Error.decorators = [
  (Story) => {
    const MockStore = renderWithProviders();
    return <MockStore><Story /></MockStore>;
  },
];
Error.parameters = {
  msw: {
    handlers: [
      graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
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
  await canvas.findByTestId('error');
};

const stories = {
  title: 'Components/Leaderboard',
  component: LeaderboardTable,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {},
};

async function getColumnValues(canvas, columnHeader) {
  const headers = (await canvas.findAllByRole('columnheader')).map((th) => th.textContent);
  const colNumber = headers.indexOf(columnHeader);
  const rows = (await canvas.findAllByRole('row')).slice(1);
  return rows.map((row) => getAllByRole(row, 'cell')[colNumber].textContent);
}

async function testPointsOrder(canvas, isAsc) {
  const header = await canvas.findByText(leaderboardNames.columns.points);
  await userEvent.click(header);
  const pointTexts = await getColumnValues(canvas, leaderboardNames.columns.points);
  const pointNumbers = pointTexts.map((rank) => Number(rank));
  const sortedPoints = [...points].sort((a, b) => (isAsc ? a - b : b - a));
  expect(pointNumbers).toEqual(sortedPoints.slice(0, ROWS_PER_PAGE));
}

async function testRankOrder(canvas, isAsc) {
  const header = await canvas.findByText(leaderboardNames.columns.rank);
  await userEvent.click(header);
  const rankTexts = await getColumnValues(canvas, leaderboardNames.columns.rank);
  const rankNumbers = rankTexts.map((rank) => Number(rank.replace('#', '')));
  const sortedRanks = [...ranks].sort((a, b) => (isAsc ? a - b : b - a));
  expect(rankNumbers).toEqual(sortedRanks.slice(0, ROWS_PER_PAGE));
}

async function pointsPagination(canvas, pageNumber) {
  const pointTexts = await getColumnValues(canvas, leaderboardNames.columns.points);
  const pointNumbers = pointTexts.map((rank) => Number(rank));
  const sortedPoints = [...points].sort((a, b) => b - a);
  expect(pointNumbers).toEqual(sortedPoints.slice(ROWS_PER_PAGE * (pageNumber - 1), ROWS_PER_PAGE * pageNumber));
}

async function testPagination(canvas) {
  const prev = (await canvas.findByText(leaderboardNames.controls.prev)).closest('button');
  const next = (await canvas.findByText(leaderboardNames.controls.next)).closest('button');
  expect(prev).toBeDisabled();
  if (defaultLeaderboardData.ids.length <= ROWS_PER_PAGE) {
    expect(next).toBeDisabled();
    return;
  }
  expect(next).toBeEnabled();
  await pointsPagination(canvas, 1);
  await userEvent.click(next);
  expect(prev).toBeEnabled();
  await pointsPagination(canvas, 2);
  await userEvent.click(prev);
  await pointsPagination(canvas, 1);
}

export {
  Default,
  UnselectedGuild,
  Loading,
  Error,
};

export default stories;
