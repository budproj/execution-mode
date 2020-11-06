import faker from 'faker'
import { Factory, ModelInstance, Server } from 'miragejs'

import { KeyResult } from 'components/KeyResult'
import { pickRandom } from 'lib/mirage/selectors'

export default Factory.extend({
  title: faker.name.title(),
  confidence: faker.random.number(100),
  progress: faker.random.number(100),

  afterCreate(keyResult: ModelInstance<KeyResult>, server: Server) {
    const owner = server.schema.users.first()
    const cycle = server.schema.cycles.first()
    const icon = pickRandom(server.schema.icons)
    const objective = pickRandom(server.schema.objectives)
    const team = pickRandom(server.schema.teams)

    keyResult.update('owner', owner)
    keyResult.update('cycle', cycle)
    keyResult.update('icon', icon)
    keyResult.update('objective', objective)
    keyResult.update('team', team)
  },
} as KeyResult)
