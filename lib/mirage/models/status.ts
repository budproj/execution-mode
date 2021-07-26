import { belongsTo, Model } from 'miragejs'

export const status = Model.extend({
  latestCheckIn: belongsTo('keyResultCheckIn'),
})
