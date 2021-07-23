import faker from 'faker'
import { Factory } from 'miragejs'

// miragejs tries to singularize the word delta, incorrectly
export const deltum = Factory.extend({
  progress: () => faker.datatype.number({ min: -10, max: 30 }),
  confidence: () => faker.datatype.number({ min: -10, max: 20 }),
})
