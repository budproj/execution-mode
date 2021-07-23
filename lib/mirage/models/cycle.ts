
import { belongsTo, Model } from 'miragejs'

export const cycle = Model.extend({
  status: belongsTo('status', { inverse: null }),
  delta: belongsTo('delta', { inverse: null }),
})
