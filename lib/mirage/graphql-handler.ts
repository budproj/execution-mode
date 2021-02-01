import { createGraphQLHandler } from '@miragejs/graphql'
import { ModelInstance } from 'miragejs'

import Models from './models'
import graphQLSchema from './schema.gql'

export interface QueryKeyResultReportsArguments {
  limit?: number
}

export interface QueryUserCompaniesArguments {
  limit?: number
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
    },
  } as any)

export default graphQLHandler
