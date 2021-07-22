import { hasMany, Model } from 'miragejs'

export const team = Model.extend({
  rankedDescendants: hasMany('team', { inverse: 'rankedAncestors' })
})
