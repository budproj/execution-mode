import { Factory } from 'miragejs'

import { UserPolicy } from 'src/components/User/constants'

export default Factory.extend({
  create: UserPolicy.ALLOW,
  update: UserPolicy.ALLOW,
  read: UserPolicy.ALLOW,
  delete: UserPolicy.ALLOW,
})
