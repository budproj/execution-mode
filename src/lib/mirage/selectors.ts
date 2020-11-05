import faker from 'faker'
// eslint-disable-next-line import/no-unresolved
import DbCollection from 'miragejs/db-collection'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pickRandom = (dbCollection: DbCollection): any => {
  const length = dbCollection.all().length
  const picked = faker.random.number(length - 1)

  return dbCollection.find(picked)
}
