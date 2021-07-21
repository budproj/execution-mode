import { Model, hasMany } from 'miragejs'

export const user = Model.extend({
  teams: hasMany('team'),
  companies: hasMany('team'),
})
