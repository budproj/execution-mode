import { createGraphQLHandler } from '@miragejs/graphql'
import { pickBy, sortBy, flatten } from 'lodash'
import { ModelInstance } from 'miragejs'

import { CADENCE } from 'src/components/Cycle/constants'
import { Cycle } from 'src/components/Cycle/types'
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

export interface QueryCyclesArguments {
  active?: boolean
  cadence?: CADENCE
  orderBy?: {
    cadence?: 'DESC' | 'ASC'
  }
}

export interface QuerySameTitleCyclesChildrenArguments {
  parentIds: Array<Cycle['id']>
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
            /* eslint-disable unicorn/no-array-callback-reference */
            user: context.mirageSchema.users.find(entry.userId),
            keyResult: context.mirageSchema.keyResults.find(entry.keyResultId),
            policies: context.mirageSchema.policies.find(entry.policiesId),
            parent: entry.parentId && context.mirageSchema.keyResultCheckIns.find(entry.parentId),
            /* eslint-enable unicorn/no-array-callback-reference */
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
          // eslint-disable-next-line unicorn/no-array-callback-reference
          const keyResult = mirageSchema.keyResults.find(keyResultCheckIn.keyResultId)
          const latestKeyResultCheckInId = keyResult.attrs.keyResultCheckInIds[0]
          const latestKeyResultCheckIn = mirageSchema.keyResultCheckIns.find(
            // eslint-disable-next-line unicorn/no-array-callback-reference
            latestKeyResultCheckInId,
          )
          const value = keyResultCheckIn?.value ?? 0

          const progress =
            ((keyResult.goal - value) / (keyResult.goal - keyResult.initialValue)) * 100
          const normalizedMinProgress = progress < 0 ? 0 : progress
          const normalizedMaxRelativeProgress =
            normalizedMinProgress > 100 ? 100 : normalizedMinProgress

          const enhancedKeyResultCheckIn = {
            progress: normalizedMaxRelativeProgress,
            valueIncrease: value - latestKeyResultCheckIn.value,
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

        cycles: (
          _graphQLSchema: unknown,
          { orderBy: _, ...filters }: QueryCyclesArguments,
          { mirageSchema }: any,
        ): Array<ModelInstance<typeof Models.cycle>> => {
          const { cycles } = mirageSchema

          const filteredCycles: any = cycles.where(filters)
          const resolvedCycles = filteredCycles.models

          return resolvedCycles
        },

        sameTitleCyclesChildren: (
          _graphQLSchema: unknown,
          { parentIds }: QuerySameTitleCyclesChildrenArguments,
          { mirageSchema }: any,
        ): Array<ModelInstance<typeof Models.cycle>> => {
          const { cycles } = mirageSchema

          const allCycles = parentIds.map((parentId) => cycles.where({ parentId }))
          const allCyclesModels = allCycles.map((cycles) => cycles.models)
          const flattenedCycles = flatten(allCyclesModels)

          return flattenedCycles
        },
      },
    },
  } as any)

export default graphQLHandler
