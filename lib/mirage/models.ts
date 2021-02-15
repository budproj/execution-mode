import { belongsTo, Model, hasMany } from 'miragejs'

const models = {
  objective: Model.extend({
    keyResults: hasMany(),
    cycle: belongsTo(),
  }),
  keyResult: Model.extend({
    owner: belongsTo('user'),
    objective: belongsTo(),
    team: belongsTo(),
    keyResultCheckIns: hasMany('keyResultCheckIn'),
    keyResultComments: hasMany('keyResultComment'),
    // eslint-disable-next-line unicorn/no-null
    latestKeyResultCheckIn: belongsTo('keyResultCheckIn', { inverse: null }),
  }),
  keyResultCheckIn: Model.extend({
    user: belongsTo(),
    keyResult: belongsTo(),
    // eslint-disable-next-line unicorn/no-null
    parent: belongsTo('keyResultCheckIn', { inverse: null }),
    policies: belongsTo('policy'),
  }),
  keyResultComment: Model.extend({
    user: belongsTo(),
    keyResult: belongsTo(),
    policies: belongsTo('policy'),
  }),
  keyResultCustomList: Model.extend({
    user: belongsTo(),
    keyResults: hasMany(),
  }),
  cycle: Model.extend({
    team: belongsTo(),
    objectives: hasMany(),
  }),
  team: Model.extend({
    keyResults: hasMany(),
    users: hasMany(),
    teams: hasMany(),
    objectives: hasMany(),
    // eslint-disable-next-line unicorn/no-null
    parentTeam: belongsTo('team', { inverse: null }),
    cycles: hasMany(),
    latestKeyResultCheckIn: belongsTo('keyResultCheckIn'),
  }),
  user: Model.extend({
    keyResults: hasMany(),
    keyResultCheckIns: hasMany(),
    teams: hasMany(),
    // eslint-disable-next-line unicorn/no-null
    companies: hasMany('team', { inverse: null }),
  }),
  policy: Model,
}

export default models
