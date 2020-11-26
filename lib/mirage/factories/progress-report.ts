import faker from 'faker'
import { Factory, ModelInstance, Server } from 'miragejs'

import { ProgressReport } from 'components/KeyResult/types'
import { pickRandom } from 'lib/mirage/selectors'

export default Factory.extend({
  valuePrevious: () => faker.random.number({ min: 0, max: 60 }),
  valueNew: () => faker.random.number({ min: 61, max: 100 }),
  comment: faker.lorem.paragraph,
  createdAt: faker.date.past,

  afterCreate(progressReport: ModelInstance<ProgressReport>, server: Server) {
    const user = server.schema.users.first()
    const keyResult = pickRandom(server.schema.keyResults)

    progressReport.update('user', user)
    progressReport.update('keyResult', keyResult)
  },
})
