import { Factory } from 'miragejs'

import { GraphQLEffect } from 'src/components/types'

export default Factory.extend({
  create: GraphQLEffect.ALLOW,
  update: GraphQLEffect.ALLOW,
  read: GraphQLEffect.ALLOW,
  delete: GraphQLEffect.ALLOW,
})
