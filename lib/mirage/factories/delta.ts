import faker from 'faker'
import { Factory } from 'miragejs'

// Miragejs tries to singularize the word delta, incorrectly
// This is caused by this: https://github.com/martinandert/inflected/issues/25
export const deltum = Factory.extend({
  progress: () => faker.datatype.number({ min: -10, max: 30 }),
  confidence: () => faker.datatype.number({ min: -10, max: 20 }),
})
