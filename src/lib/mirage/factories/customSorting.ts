import shuffle from 'lodash/shuffle'
import { Factory, ModelInstance, Server } from 'miragejs'

import { CustomSorting } from 'components/User'

export default Factory.extend({
  afterCreate(customSorting: ModelInstance<CustomSorting>, server: Server) {
    const user = server.schema.users.first()
    const keyResults = server.schema.keyResults.all()
    const sortedKeyResults = shuffle(keyResults.models)

    customSorting.update('user', user)
    customSorting.update('keyResults', sortedKeyResults)
  },
} as CustomSorting)
