import { belongsTo, Model, hasMany } from 'miragejs'

const models = {
  keyResult: Model.extend({
    owner: belongsTo('user'),
    cycle: belongsTo(),
    objective: belongsTo(),
    team: belongsTo(),
  }),
  user: Model,
  cycle: Model,
  objective: Model,
  team: Model,
  customSorting: Model.extend({
    user: belongsTo(),
    keyResults: hasMany(),
  }),
}

export default models
