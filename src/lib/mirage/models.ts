import { belongsTo, Model, hasMany } from 'miragejs'

const models = {
  user: Model,
  cycle: Model,
  objective: Model,
  keyResult: Model.extend({
    owner: belongsTo('user'),
    cycle: belongsTo(),
    objective: belongsTo(),
    team: belongsTo(),
    confidence: belongsTo(),
  }),
  confidence: Model.extend({
    user: belongsTo(),
  }),
  team: Model,
  customSorting: Model.extend({
    user: belongsTo(),
    keyResults: hasMany(),
  }),
}

export default models
