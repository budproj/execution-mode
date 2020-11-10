import faker from 'faker'
import { Factory, ModelInstance, Server } from 'miragejs'

import { KeyResult } from 'components/KeyResult'
import { pickRandom } from 'lib/mirage/selectors'

export default Factory.extend({
  title: () => faker.random.words(3),
  progress: () => faker.random.number(100),

  afterCreate(keyResult: ModelInstance<KeyResult>, server: Server) {
    const owner = server.schema.users.first()
    const cycle = server.schema.cycles.first()
    const objective = pickRandom(server.schema.objectives)
    const team = pickRandom(server.schema.teams)
    const confidence = pickRandom(server.schema.confidences)

    keyResult.update('owner', owner)
    keyResult.update('cycle', cycle)
    keyResult.update('objective', objective)
    keyResult.update('team', team)
    keyResult.update('confidence', confidence)
  },
} as KeyResult)
