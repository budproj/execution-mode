import faker from 'faker'
import DbCollection from 'miragejs/db-collection'

type PickRandomResult = Record<string, unknown> | string | number

export const pickRandom = (databaseCollection: DbCollection): PickRandomResult => {
  const { length } = databaseCollection.all()
  const pickedIndex = faker.random.number(length - 2) + 1

  return databaseCollection.find(pickedIndex)
}

export const reduceToAttributes = (
  previous: Array<Record<string, unknown>>,
  next: Record<string, Record<string, unknown>>,
): Array<Record<string, unknown>> => [...previous, next.attrs]
