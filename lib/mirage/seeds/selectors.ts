import faker from 'faker'
import { ModelInstance } from 'miragejs'

type PickRandomResult = Record<string, unknown> | string | number

export const pickRandomModel = (modelInstances: ModelInstance[]): PickRandomResult => {
  const { length } = modelInstances
  const pickedIndex = faker.random.number(length - 2) + 1

  return modelInstances[pickedIndex]
}
