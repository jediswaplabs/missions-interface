import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { request, gql, ClientError } from 'graphql-request';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: graphqlRequestBaseQuery({ url: '/' }),
  tagTypes: ['Activities', 'Wallet', 'Profile', 'Guilds', 'MeshNft'],
  endpoints: (builder) => ({
    getActivitiesByUserId: builder.query({
      query: () => ({
        document: gql`
          query GetActivities {
            activities {
              id
              date
              title
            }
          }
        `,
      }),
      transformResponse: (responseData) => responseData,
      providesTags: ['Activities', 'Profile'],
    }),
    getWalletByUserId: builder.query({
      query: () => ({
        document: gql`
          query GetWallet {
            currencies {
              name
              amount
            }
          }
        `,
      }),
      transformResponse: (responseData) => responseData,
      providesTags: ['Wallet', 'Profile'],
    }),
    getUserById: builder.query({
      query: (userId) => ({
        document: gql`
          query GetUser {
            user {
              avatar
              address
            }
          }
        `,
      }),
      transformResponse: (responseData) => responseData,
      providesTags: ['Profile'],
    }),
    getGuildsScoreByUserId: builder.query({
      query: () => ({
        document: gql`
          query GetGuilds {
            guilds {
              id
              name
              score
            }
          }
        `,
      }),
      transformResponse: (responseData) => responseData,
      providesTags: ['Profile', 'Guilds'],
    }),
    getGuildLeaderboardBuGuildId: builder.query({
      query: (guildId) => ({
        document: gql`
          query GetGuildLeaderboard {
              address
              rank
              points
              positionTrend
          }
        `,
      }),
      transformResponse: (responseData) => responseData,
      providesTags: ['Guilds'],
    }),
    getMeshNftByUserId: builder.query({
      query: (userId) => ({
        document: gql`
          query GetMeshNftByUserId {
              foo
          }
        `,
      }),
      transformResponse: (responseData) => responseData,
      providesTags: ['MeshNft'],
    }),
  }),
});

export const {
  useGetActivitiesByUserIdQuery,
  useLazyGetActivitiesByUserIdQuery,
  useGetWalletByUserIdQuery,
  useLazyGetWalletByUserIdQuery,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useGetGuildsScoreByUserIdQuery,
  useLazyGetGuildsScoreByUserIdQuery,
  useGetGuildLeaderboardBuGuildIdQuery,
  useLazyGetGuildLeaderboardBuGuildIdQuery,
  useGetMeshNftByUserIdQuery,
  useLazyGetMeshNftByUserIdQuery,
} = apiSlice;
