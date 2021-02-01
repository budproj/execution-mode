import { createGraphQLHandler } from '@miragejs/graphql'
import { pickBy } from 'lodash'
import { ModelInstance } from 'miragejs'

import { KeyResultCheckIn } from 'src/components/KeyResult/types'

import Models from './models'
import graphQLSchema from './schema.gql'

export interface QueryKeyResultReportsArguments {
  limit?: number
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
          { limit }: QueryKeyResultReportsArguments,
        ): Array<ModelInstance<typeof Models.keyResultCheckIn>> =>
          limit
            ? parent.keyResultCheckIns?.models.slice(0, limit)
            : parent.keyResultCheckIns?.models,
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
