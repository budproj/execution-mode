import { createGraphQLHandler } from '@miragejs/graphql'
import { AnyRegistry } from 'miragejs/-types' //  eslint-disable-line import/no-unresolved
import Schema from 'miragejs/orm/schema' //  eslint-disable-line import/no-unresolved
// TODO: fix no-unresolved lint errors in miragejs

import graphQLSchema from './schema.gql'

export const graphQLHandler = (mirageSchema: Schema<AnyRegistry>) =>
  createGraphQLHandler(graphQLSchema, mirageSchema)
