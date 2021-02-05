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
  skip?: number
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
          { limit, skip }: QueryKeyResultTimelineArguments,
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

          const skippedEntries = skip
            ? orderedTimelineEntries.slice(skip, -1)
            : orderedTimelineEntries
          const limitedEntries = limit ? skippedEntries.slice(0, limit) : skippedEntries

          console.log(limitedEntries, 'tag')

          return limitedEntries
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
          const progress = keyResultCheckIn?.progress ?? 0

          const relativePercentageProgress =
            ((keyResult.goal - progress) / (keyResult.goal - keyResult.initialValue)) * 100
          const normalizedMinRelativeProgress =
            relativePercentageProgress < 0 ? 0 : relativePercentageProgress
          const normalizedMaxRelativeProgress =
            normalizedMinRelativeProgress > 100 ? 100 : normalizedMinRelativeProgress

          const enhancedKeyResultCheckIn = {
            relativePercentageProgress: normalizedMaxRelativeProgress,
            userId: user.id,
            parentId: latestKeyResultCheckInId,
            createdAt: new Date(),
            ...keyResultCheckIn,
          }
          const clearedKeyResultCheckIn = pickBy(enhancedKeyResultCheckIn)

          const result = mirageSchema.keyResultCheckIns.create(clearedKeyResultCheckIn)

          return result
        },
      },
    },
  } as any)

export default graphQLHandler
