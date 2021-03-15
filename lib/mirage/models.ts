import { belongsTo, Model, hasMany } from 'miragejs'

const models = {
  objective: Model.extend({
    keyResults: hasMany(),
    cycle: belongsTo(),
    status: belongsTo(),
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
  cycle: Model.extend({
    team: belongsTo(),
    objectives: hasMany(),
    keyResults: hasMany(),
    status: belongsTo(),
    // eslint-disable-next-line unicorn/no-null
    parent: belongsTo('cycle', { inverse: null }),
    cycles: hasMany(),
  }),
  team: Model.extend({
    keyResults: hasMany(),
    users: hasMany(),
    teams: hasMany(),
    objectives: hasMany(),
    // eslint-disable-next-line unicorn/no-null
    parent: belongsTo('team', { inverse: null }),
    cycles: hasMany(),
    latestKeyResultCheckIn: belongsTo('keyResultCheckIn'),
    // eslint-disable-next-line unicorn/no-null
    teamsRanking: hasMany('team', { inverse: null }),
    status: belongsTo(),
  }),
  user: Model.extend({
    keyResults: hasMany(),
    keyResultCheckIns: hasMany(),
    teams: hasMany(),
    // eslint-disable-next-line unicorn/no-null
    companies: hasMany('team', { inverse: null }),
  }),
  policy: Model,
  status: Model,
}

export default models
