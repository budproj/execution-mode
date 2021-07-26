import { belongsTo, Model } from 'miragejs'

export const cycle = Model.extend({
  status: belongsTo('status'),
  delta: belongsTo('delta'),
  policy: belongsTo('nodePolicy'),
})
