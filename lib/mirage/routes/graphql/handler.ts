import { createGraphQLHandler } from '@miragejs/graphql'
import { AnyRegistry } from 'miragejs/-types' //  eslint-disable-line import/no-unresolved
import Schema from 'miragejs/orm/schema' //  eslint-disable-line import/no-unresolved
// TODO: fix no-unresolved lint errors in miragejs

import { ignoreSpecificArgments } from './custom-resolvers/ignore-arguments'
import graphQLSchema from './schema.gql'

const customHandlers = {
  resolvers: {
    User: {
      teams: ignoreSpecificArgments(['order']),
      companies: ignoreSpecificArgments(['order']),
    },
    Team: {
      rankedDescendants: ignoreSpecificArgments(['order']),
    },
    Cycle: {
      keyResults: ignoreSpecificArgments(['order']),
    },
    Query: {
      teams: ignoreSpecificArgments(['order']),
      cycles: ignoreSpecificArgments(['order']),
    },
  },
}

export const graphQLHandler = (mirageSchema: Schema<AnyRegistry>) =>
  createGraphQLHandler(graphQLSchema, mirageSchema, customHandlers as any)
