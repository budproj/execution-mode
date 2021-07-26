import faker from 'faker'
import { Factory } from 'miragejs'

export const objective = Factory.extend({
  title: faker.lorem.sentence,
})
