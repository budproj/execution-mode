import { belongsTo, hasMany, Model } from 'miragejs'

export const keyResult = Model.extend({
  objective: belongsTo('objective'),
  owner: belongsTo('user'),
  status: belongsTo('status'),
  keyResultCheckIns: hasMany('keyResultCheckIn'),
})
