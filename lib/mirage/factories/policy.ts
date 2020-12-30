import { Factory } from 'miragejs'

import { USER_POLICY } from 'src/components/User/constants'

export default Factory.extend({
  create: USER_POLICY.ALLOW,
  update: USER_POLICY.ALLOW,
  read: USER_POLICY.ALLOW,
  delete: USER_POLICY.ALLOW,
})
