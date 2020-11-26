import faker from 'faker'
import sample from 'lodash/sample'
import { Factory, ModelInstance, Server } from 'miragejs'

import { KeyResult, KeyResultFormat } from 'components/KeyResult/types'
import { pickRandom } from 'lib/mirage/selectors'

export default Factory.extend({
  title: faker.company.catchPhrase,
  description: faker.lorem.paragraph,
  initialValue: () => faker.random.number({ min: 0, max: 30 }),
  goal: () => faker.random.number({ min: 31, max: 100 }),
  format: () => sample(Object.values(KeyResultFormat)),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,

  afterCreate(keyResult: ModelInstance<KeyResult>, server: Server) {
    const owner = server.schema.users.first()
    const objective = pickRandom(server.schema.objectives)
    const team = pickRandom(server.schema.teams)

    keyResult.update('owner', owner)
    keyResult.update('objective', objective)
    keyResult.update('team', team)
  },
})
