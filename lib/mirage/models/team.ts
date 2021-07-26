import { hasMany, belongsTo, Model } from 'miragejs'

export const team = Model.extend({
  tacticalCycle: belongsTo('cycle'),
  rankedDescendants: hasMany('team'),
  status: belongsTo('status'),
  delta: belongsTo('delta'),
})
