import { hasMany, belongsTo, Model } from 'miragejs'

export const team = Model.extend({
  tacticalCycle: belongsTo('cycle'),
  rankedDescendants: hasMany('team', { inverse: null }),
  status: belongsTo('status'),
  delta: belongsTo('delta'),
})
