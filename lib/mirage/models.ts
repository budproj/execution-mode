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
    confidenceReports: hasMany(),
    progressReports: hasMany(),
    policies: belongsTo(),
    // eslint-disable-next-line unicorn/no-null
    reports: hasMany('progressReport', { inverse: null }),
  }),
  progressReport: Model.extend({
    user: belongsTo(),
    keyResult: belongsTo(),
  }),
  confidenceReport: Model.extend({
    user: belongsTo(),
    keyResult: belongsTo(),
  }),
  keyResultView: Model.extend({
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
    latestReport: belongsTo('progressReport'),
  }),
  user: Model.extend({
    keyResults: hasMany(),
    progressReports: hasMany(),
    confidenceReports: hasMany(),
    teams: hasMany(),
    // eslint-disable-next-line unicorn/no-null
    companies: hasMany('team', { inverse: null }),
  }),
  policy: Model,
}

export default models
