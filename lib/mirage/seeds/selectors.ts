import faker from 'faker'
import { ModelInstance } from 'miragejs'

export const pickRandomModel = <T>(modelInstances: Array<ModelInstance<T>>): T => {
  const { length } = modelInstances
  const pickedIndex = faker.random.number(length - 2) + 1

  return modelInstances[pickedIndex]
}
