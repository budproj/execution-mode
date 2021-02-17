import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import PercentageProgressIncreaseTag from './percentage-progress-increase-tag'

describe('component tag colorization', () => {
  it('uses the correct background color for value = 0', () => {
    const fakeValue = 0

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual('gray.50')
  })

  it('uses the correct background color for value > 0', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual('green.50')
  })

  it('uses the correct background color for value < 0', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual('red.50')
  })

  it('uses the correct tag color for value = 0', () => {
    const fakeValue = 0

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('color')).toEqual('gray.500')
  })

  it('uses the correct tag color for value > 0', () => {
    const fakeValue = faker.random.number({ min: 1 })

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('color')).toEqual('green.500')
  })

  it('uses the correct tag color for value < 0', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')

    expect(tag.prop('color')).toEqual('red.500')
  })
})

describe('percentage formatting', () => {
  it('formats the value as percentage accordingly', () => {
    const fakeValue = 95

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')
    const expectedFormattedPercentage = '95%'

    expect(tag.text()).toEqual(expectedFormattedPercentage)
  })

  it('rounds float percentages', () => {
    const fakeValue = 95.78

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')
    const expectedFormattedPercentage = '96%'

    expect(tag.text()).toEqual(expectedFormattedPercentage)
  })

  it('shows the minus sign on negative numbers', () => {
    const fakeValue = -95

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} />)

    const tag = result.find('Tag')
    const expectedFormattedPercentage = '-95%'

    expect(tag.text()).toEqual(expectedFormattedPercentage)
  })
})

describe('component customizations', () => {
  it('can define a custom bg', () => {
    const fakeValue = faker.random.number({ max: -1 })
    const fakeBg = faker.random.word()

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} bg={fakeBg} />)

    const tag = result.find('Tag')

    expect(tag.prop('bg')).toEqual(fakeBg)
  })

  it('can define a custom fontSize', () => {
    const fakeValue = faker.random.number({ min: -100, max: 100 })
    const fakeFontSize = faker.random.word()

    const result = enzyme.mount(
      <PercentageProgressIncreaseTag value={fakeValue} fontSize={fakeFontSize} />,
    )

    const tag = result.find('Tag')

    expect(tag.prop('fontSize')).toEqual(fakeFontSize)
  })

  it('can force a positive signal', () => {
    const fakeValue = faker.random.number({ min: 1, max: 100 })

    const result = enzyme.mount(
      <PercentageProgressIncreaseTag forcePositiveSignal value={fakeValue} />,
    )

    const tag = result.find('Tag')

    expect(tag.text()).toEqual(`+${fakeValue}%`)
  })

  it('when forcing positive signal, does not add a positive signal to negative values', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const result = enzyme.mount(
      <PercentageProgressIncreaseTag forcePositiveSignal value={fakeValue} />,
    )

    const tag = result.find('Tag')

    expect(tag.text()).toEqual(`-${Math.abs(fakeValue)}%`)
  })

  it('when forcing positive signal, does not add a positive signal to zero values', () => {
    const result = enzyme.mount(<PercentageProgressIncreaseTag forcePositiveSignal value={0} />)

    const tag = result.find('Tag')

    expect(tag.text()).toEqual('0%')
  })

  it('can force at least 2 minimum integer digits', () => {
    const fakeValue = faker.random.number({ min: 1, max: 9 })

    const result = enzyme.mount(
      <PercentageProgressIncreaseTag value={fakeValue} minimumIntegerDigits={2} />,
    )

    const tag = result.find('Tag')

    expect(tag.text()).toEqual(`0${fakeValue}%`)
  })

  it('when forcing 2 minimum integer digits, it should not affect 0 values', () => {
    const fakeValue = 0

    const result = enzyme.mount(
      <PercentageProgressIncreaseTag value={fakeValue} minimumIntegerDigits={2} />,
    )

    const tag = result.find('Tag')

    expect(tag.text()).toEqual('0%')
  })

  it('can define a custom px', () => {
    const fakeValue = faker.random.number()
    const fakePX = faker.random.number()

    const result = enzyme.mount(<PercentageProgressIncreaseTag value={fakeValue} px={fakePX} />)

    const tag = result.find('Tag')

    expect(tag.prop('px')).toEqual(fakePX)
  })
})

describe('signal arrow', () => {
  it('shows an increase signal arrow if we ask to in positive values', () => {
    const fakeValue = faker.random.number({ min: 1, max: 100 })

    const result = enzyme.mount(<PercentageProgressIncreaseTag showSignalArrow value={fakeValue} />)

    const signalArrow = result.find('StatArrow')

    expect(signalArrow.prop('type')).toEqual('increase')
  })

  it('shows a decrease signal arrow if we ask to in negative values', () => {
    const fakeValue = faker.random.number({ max: -1 })

    const result = enzyme.mount(<PercentageProgressIncreaseTag showSignalArrow value={fakeValue} />)

    const signalArrow = result.find('StatArrow')

    expect(signalArrow.prop('type')).toEqual('decrease')
  })

  it('does not show a signal arrow, even if we ask to, in zero values', () => {
    const fakeValue = 0

    const result = enzyme.mount(<PercentageProgressIncreaseTag showSignalArrow value={fakeValue} />)

    const signalArrow = result.find('StatArrow')

    expect(signalArrow.length).toEqual(0)
  })

  it('does not show a signal arrow, even if we ask to, in close to zero values', () => {
    const fakeValue = 0.2

    const result = enzyme.mount(<PercentageProgressIncreaseTag showSignalArrow value={fakeValue} />)

    const signalArrow = result.find('StatArrow')

    expect(signalArrow.length).toEqual(0)
  })
})
