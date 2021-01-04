import faker from 'faker'

import { buildColorWithIntensity } from './builders'

describe('buildColorWithIntensity', () => {
  it('can build the correct gray color for value = 0', () => {
    const fakeValue = 0
    const fakeIntensity = faker.random.number()

    const result = buildColorWithIntensity(fakeValue, fakeIntensity)

    const expectedResult = `gray.${fakeIntensity}`

    expect(result).toEqual(expectedResult)
  })

  it('can build the correct green color for value > 0', () => {
    const fakeValue = faker.random.number({ min: 1 })
    const fakeIntensity = faker.random.number()

    const result = buildColorWithIntensity(fakeValue, fakeIntensity)

    const expectedResult = `green.${fakeIntensity}`

    expect(result).toEqual(expectedResult)
  })

  it('can build the correct green color for value < 0', () => {
    const fakeValue = faker.random.number({ max: -1 })
    const fakeIntensity = faker.random.number()

    const result = buildColorWithIntensity(fakeValue, fakeIntensity)

    const expectedResult = `red.${fakeIntensity}`

    expect(result).toEqual(expectedResult)
  })
})
