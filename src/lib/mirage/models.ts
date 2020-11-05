import { belongsTo, Model } from 'miragejs'

export default {
  keyResult: Model.extend({
    owner: belongsTo('user'),
    cycle: belongsTo(),
    icon: belongsTo(),
    objective: belongsTo(),
  }),
  user: Model,
  cycle: Model,
  icon: Model,
  objective: Model,
}
