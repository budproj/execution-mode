import { belongsTo, Model } from 'miragejs'

export const keyResultCheckIn = Model.extend({
  user: belongsTo('user'),
  policy: belongsTo('nodePolicy'),
})
