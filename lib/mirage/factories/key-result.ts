import faker from 'faker'
import { Factory } from 'miragejs'

// miragejs tries to singularize the word delta, incorrectly
export const keyResult = Factory.extend({
  title: 'um objetivo',
  initialValue: 0,
  goal: 80,
  format: () => faker.random.arrayElement(['NUMBER', 'PERCENTAGE', 'COIN_BRL', 'COIN_USD']),
  type: () => faker.random.arrayElement(['ASCENDING', 'DESCENDING']),

  afterCreate(keyResult, server) {
    const status = server.create('status')
    const keyResultCheckIns = server.createList('keyResultCheckIn', 3)
    const objective = server.create('objective')

    keyResult.update({ status, keyResultCheckIns, objective })
  }
})
