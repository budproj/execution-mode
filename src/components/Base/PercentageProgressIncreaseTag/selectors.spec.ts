import faker from 'faker'

import { selectBackgroundColor, selectLabelColor } from './selectors'

describe('selectBackgroundColor', () => {
  it('selects the correct color for value = 0', () => {
    const fakeValue = 0

    const result = selectBackgroundColor(fakeValue)

    const expectedResult = 'gray.50'

    expect(result).toEqual(expectedResult)
  })

  it('selects the correct color for value > 0', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const result = selectBackgroundColor(fakeValue)

    const expectedResult = 'green.50'

    expect(result).toEqual(expectedResult)
  })

  it('selects the correct color for value < 0', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const result = selectBackgroundColor(fakeValue)

    const expectedResult = 'red.50'

    expect(result).toEqual(expectedResult)
  })
})

describe('selectLabelColor', () => {
  it('selects the correct color for value = 0', () => {
    const fakeValue = 0

    const result = selectLabelColor(fakeValue)

    const expectedResult = 'gray.500'

    expect(result).toEqual(expectedResult)
  })

  it('selects the correct color for value > 0', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const result = selectLabelColor(fakeValue)

    const expectedResult = 'green.500'

    expect(result).toEqual(expectedResult)
  })

  it('selects the correct color for value < 0', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const result = selectLabelColor(fakeValue)

    const expectedResult = 'red.500'

    expect(result).toEqual(expectedResult)
  })
})
