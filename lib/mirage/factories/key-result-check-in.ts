import faker from 'faker'
import { Factory } from 'miragejs'

export default Factory.extend({
  comment: () => faker.helpers.randomize([undefined, faker.lorem.paragraph()]),
  confidence: () => faker.random.number({ min: -1, max: 100 }),
  percentageProgressIncrease: () => faker.random.number({ min: -100, max: 100 }),
  absoluteConfidenceIncrease: () => faker.random.number({ min: -100, max: 100 }),
  relativePercentageProgress: () => faker.random.number({ min: 0, max: 100 }),
  createdAt: faker.date.past,
})
