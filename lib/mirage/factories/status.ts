import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  progress: () => faker.random.number({ min: 0, max: 100 }),
  confidence: () => faker.random.number({ min: -1, max: 100 }),
})
