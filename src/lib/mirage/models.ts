import { belongsTo, Model, hasMany } from 'miragejs'

export default {
  keyResult: Model.extend({
    owner: belongsTo('user'),
    cycle: belongsTo(),
    icon: belongsTo(),
    objective: belongsTo(),
    team: belongsTo(),
  }),
  user: Model,
  cycle: Model,
  icon: Model,
  objective: Model,
  team: Model,
  customSorting: Model.extend({
    user: belongsTo(),
    keyResults: hasMany(),
  }),
}
