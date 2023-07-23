import { graphql, setupWorker } from 'msw';

import { defaultListItems as activitiesListItem } from '../src/features/activities/ActivitiesList/ActivitiesList.testData';
import { guildsListWithScore as guildsList } from '../src/features/guilds/GuildsList/GuildsList.testData';
import { defaultLeaderboardData as leaderboardData } from '../src/features/guilds/Leaderboard/Leaderboard.testData';
import { defaultNftListItems as nftListItems } from '../src/features/nft/NftCarousel/NftCarousel.testData';
import { defaultUserData } from '../src/features/profile/ProfileCard/ProfileCard.testData';
import { defaultCurrenciesList } from '../src/features/wallet/WalletBalance/WalletBalance.testData';

const ARTIFICIAL_DELAY_MS = 600;

const handlers = [
  graphql.query('GetActivities', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.data(activitiesListItem),
  )),
  graphql.query('GetGuilds', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.data(guildsList),
  )),
  graphql.query('GetGuildLeaderboard', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.data(leaderboardData),
  )),
  graphql.query('GetMeshNftByUserId', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.data(nftListItems),
  )),
  graphql.query('GetUser', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.data(defaultUserData),
  )),
  graphql.query('GetWallet', (req, res, ctx) => res(
    ctx.delay(ARTIFICIAL_DELAY_MS),
    ctx.data(defaultCurrenciesList),
  )),
];

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);
