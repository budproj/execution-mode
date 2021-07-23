import faker from 'faker'
import { Factory } from 'miragejs'

export const keyResultCheckIn = Factory.extend({
  createdAt: faker.date.recent(),
  afterCreate(keyResultCheckIn, server) {
    const user = server.db.users.find(1)

    keyResultCheckIn.update({ user })
  },
})
