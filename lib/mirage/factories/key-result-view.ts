import faker from 'faker'
import sample from 'lodash/sample'
import shuffle from 'lodash/shuffle'
import { Factory, ModelInstance, Server } from 'miragejs'

import { KeyResultView, KeyResultViewBinding } from 'components/KeyResult/types'

export default Factory.extend({
  title: faker.company.catchPhrase,
  binding: () => sample(Object.values(KeyResultViewBinding)),
  createdAt: faker.date.past,
  updatedAt: faker.date.past,

  afterCreate(keyResultView: ModelInstance<KeyResultView>, server: Server) {
    const user = server.schema.users.first()
    const keyResults = server.schema.keyResults.all()
    const sortedKeyResults = shuffle(keyResults.models)
    const rank = sortedKeyResults.map((keyResult) => keyResult.id)

    keyResultView.update('user', user)
    keyResultView.update('keyResults', sortedKeyResults)
    keyResultView.update('rank', rank)
  },
})
