import faker from 'faker'
import DbCollection from 'miragejs/db-collection'

type PickRandomResult = Record<string, unknown> | string | number

export const pickRandom = (dbCollection: DbCollection): PickRandomResult => {
  const { length } = dbCollection.all()
  const pickedIndex = faker.random.number(length - 2) + 1

  return dbCollection.find(pickedIndex)
}

export const reduceToAttrs = (
  previous: Array<Record<string, unknown>>,
  next: Record<string, Record<string, unknown>>,
): Array<Record<string, unknown>> => [...previous, next.attrs]
