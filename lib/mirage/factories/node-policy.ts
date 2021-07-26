import { Factory } from 'miragejs'

export const nodePolicy = Factory.extend({
  read: 'ALLOW',
  update: 'ALLOW',
  delete: 'ALLOW',
})
