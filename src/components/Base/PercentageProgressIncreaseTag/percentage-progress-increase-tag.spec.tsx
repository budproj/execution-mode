import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import PercentageProgressIncreaseTag from './percentage-progress-increase-tag'

describe('component tag colorization', () => {
  it('uses the correct background color for value = 0', () => {
    const fakeValue = 0

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual('gray.50')
  })

  it('uses the correct background color for value > 0', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual('green.50')
  })

  it('uses the correct background color for value < 0', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual('red.50')
  })

  it('uses the correct tag color for value = 0', () => {
    const fakeValue = 0

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('color')).toEqual('gray.500')
  })

  it('uses the correct tag color for value > 0', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('color')).toEqual('green.500')
  })

  it('uses the correct tag color for value < 0', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('color')).toEqual('red.500')
  })
})

describe('percentage formatting', () => {
  it('formats the value as percentage accordingly', () => {
    const fakeValue = 95

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')
    const expectedFormattedPercentage = '95%'

    expect(tag.text()).toEqual(expectedFormattedPercentage)
  })

  it('rounds float percentages', () => {
    const fakeValue = 95.78

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')
    const expectedFormattedPercentage = '96%'

    expect(tag.text()).toEqual(expectedFormattedPercentage)
  })

  it('shows the minus sign on negative numbers', () => {
    const fakeValue = -95

    const result = enzyme.shallow(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')
    const expectedFormattedPercentage = '-95%'

    expect(tag.text()).toEqual(expectedFormattedPercentage)
  })
})
