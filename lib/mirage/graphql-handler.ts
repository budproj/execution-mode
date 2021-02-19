import { createGraphQLHandler } from '@miragejs/graphql'
import { pickBy, sortBy } from 'lodash'
import { ModelInstance } from 'miragejs'

import { KeyResultCheckIn, KeyResultComment } from 'src/components/KeyResult/types'
import { AUTHZ_POLICY } from 'src/state/recoil/authz/policies/constants'

import Models from './models'
import graphQLSchema from './schema.gql'

export interface QueryKeyResultCheckInsArguments {
  limit?: number
}

export interface QueryKeyResultTimelineArguments {
  limit?: number
  offset?: number
}

export interface QueryUserCompaniesArguments {
  limit?: number
}

export interface CreateKeyResultCheckInInterface {
  keyResultCheckIn: Partial<KeyResultCheckIn>
}

const graphQLHandler = (mirageSchema: unknown) =>
  createGraphQLHandler(graphQLSchema, mirageSchema, {
    resolvers: {
      KeyResult: {
        keyResultCheckIns: (
          parent: ModelInstance<any>,
          { limit }: QueryKeyResultCheckInsArguments,
        ): Array<ModelInstance<typeof Models.keyResultCheckIn>> =>
          limit
            ? parent.keyResultCheckIns?.models.slice(0, limit)
            : parent.keyResultCheckIns?.models,

        policies: () => ({
          create: AUTHZ_POLICY.ALLOW,
          update: AUTHZ_POLICY.ALLOW,
          read: AUTHZ_POLICY.ALLOW,
          delete: AUTHZ_POLICY.ALLOW,
        }),

        timeline: (
          parent: ModelInstance<any>,
          { limit, offset }: QueryKeyResultTimelineArguments,
          context: any,
        ) => {
          const keyResultCheckIns = parent.keyResultCheckIns.models.map(
            (keyResultCheckIn: ModelInstance<KeyResultCheckIn>) => ({
              __typename: 'KeyResultCheckIn',
              ...keyResultCheckIn.attrs,
            }),
          )
          const keyResultComments = parent.keyResultComments.models.map(
            (keyResultComment: ModelInstance<KeyResultComment>) => ({
              __typename: 'KeyResultComment',
              ...keyResultComment.attrs,
            }),
          )

          const timelineEntries = [...keyResultCheckIns, ...keyResultComments]
          const orderedTimelineEntries = sortBy(timelineEntries, 'createdAt')

          const offsetedEntries = offset
            ? orderedTimelineEntries.slice(offset, -1)
            : orderedTimelineEntries
          const limitedEntries = limit ? offsetedEntries.slice(0, limit) : offsetedEntries

          const limitedEntriesWithRelations = limitedEntries.map((entry) => ({
            ...entry,
            /* eslint-disable unicorn/no-fn-reference-in-iterator */
            user: context.mirageSchema.users.find(entry.userId),
            keyResult: context.mirageSchema.keyResults.find(entry.keyResultId),
            policies: context.mirageSchema.policies.find(entry.policiesId),
            /* eslint-enable unicorn/no-fn-reference-in-iterator */
          }))

          return limitedEntriesWithRelations
        },
      },

      User: {
        companies: (
          parent: ModelInstance<any>,
          { limit }: QueryUserCompaniesArguments,
        ): Array<ModelInstance<typeof Models.keyResultCheckIn>> =>
          limit ? parent.companies.models.slice(0, limit) : parent.companies.models,
      },

      Mutation: {
        createKeyResultCheckIn: (
          _: any,
          { keyResultCheckIn }: CreateKeyResultCheckInInterface,
          { mirageSchema }: any,
        ) => {
          const user = mirageSchema.users.first()
          // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
          const keyResult = mirageSchema.keyResults.find(keyResultCheckIn.keyResultId)
          const latestKeyResultCheckInId = keyResult.attrs.keyResultCheckInIds[0]
          const value = keyResultCheckIn?.value ?? 0

          const progress =
            ((keyResult.goal - value) / (keyResult.goal - keyResult.initialValue)) * 100
          const normalizedMinProgress = progress < 0 ? 0 : progress
          const normalizedMaxRelativeProgress =
            normalizedMinProgress > 100 ? 100 : normalizedMinProgress

          const enhancedKeyResultCheckIn = {
            progress: normalizedMaxRelativeProgress,
            userId: user.id,
            parentId: latestKeyResultCheckInId,
            createdAt: new Date(),
            policies: mirageSchema.policies.first(),
            ...keyResultCheckIn,
          }
          const clearedKeyResultCheckIn = pickBy(enhancedKeyResultCheckIn)

          const result = mirageSchema.keyResultCheckIns.create(clearedKeyResultCheckIn)

          return result
        },
      },

      Query: {
        teams: (_graphQLSchema: unknown, arguments_: any, { mirageSchema }: any) => {
          const { teams } = mirageSchema
          const filters = arguments_?.filters ?? {}

          const filteredTeams: any = teams.where(filters)
          const resolvedTeams = filteredTeams.models

          return resolvedTeams
        },
      },
    },
  } as any)

export default graphQLHandler
