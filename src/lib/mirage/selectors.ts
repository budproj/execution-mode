import faker from 'faker'
// eslint-disable-next-line import/no-unresolved
import DbCollection from 'miragejs/db-collection'

type PickRandomResult = Record<string, unknown> | string | number

export const pickRandom = (dbCollection: DbCollection): PickRandomResult => {
  const length = dbCollection.all().length
  const picked = faker.random.number(length - 2) + 1

  return dbCollection.find(picked)
}
