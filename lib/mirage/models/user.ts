import { Model, hasMany } from 'miragejs'

export const user = Model.extend({
  teams: hasMany('Team'),
  companies: hasMany('Team'),
})
