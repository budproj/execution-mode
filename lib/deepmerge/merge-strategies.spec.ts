import deepmerge from 'deepmerge'
import faker from 'faker'

import * as mergeStrategies from './merge-strategies'

describe('overwriteMerge', () => {
  it('returns the provided source value', () => {
    const originalArray = [faker.random.word()]
    const newArray = [faker.random.word(), faker.random.word()]

    const result = mergeStrategies.overwriteMerge(originalArray, newArray)

    expect(result).toEqual(newArray)
  })

  it('can be used in deepmerge accordingly', () => {
    const originalObject = { array: [faker.random.word()] }
    const newObject = { array: [faker.random.word(), faker.random.word()] }

    const result = deepmerge(originalObject, newObject, {
      arrayMerge: mergeStrategies.overwriteMerge,
    })

    expect(result.array).toEqual(newObject.array)
  })
})
