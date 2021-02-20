import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import { KEY_RESULT_FORMAT } from 'src/components/KeyResult/constants'

import KeyResultSectionTimelineCardCheckInValueIncrease from './value-increase'

describe('number formatting', () => {
  it('shows the plus sign when the absolute increase value is positive', () => {
    const fakeValueIncrease = faker.random.number({ min: 1 })

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease valueIncrease={fakeValueIncrease} />,
    )

    const firstText = wrapper.find('Text').first()

    expect(firstText.text()[0]).toEqual('+')
  })

  it('shows only a single negative sign when the absolute increase value is negative', () => {
    const fakeValueIncrease = faker.random.number({ max: -1 })

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease valueIncrease={fakeValueIncrease} />,
    )

    const firstText = wrapper.find('Text').first()

    expect(firstText.text()[0]).toEqual('-')
  })

  it('uses the correct color when the increase value is positive', () => {
    const fakeValueIncrease = faker.random.number({ min: 1 })

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease valueIncrease={fakeValueIncrease} />,
    )

    const firstText = wrapper.find('Text').first()

    expect(firstText.prop('color')).toEqual('brand.500')
  })

  it('uses the correct color when the input value is negative', () => {
    const fakeValueIncrease = faker.random.number({ max: -1 })

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease valueIncrease={fakeValueIncrease} />,
    )

    const firstText = wrapper.find('Text').first()

    expect(firstText.prop('color')).toEqual('red.500')
  })

  it('formats accordingly the increase value upon NUMBER format', () => {
    const fakeValueIncrease = 3000

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease
        format={KEY_RESULT_FORMAT.NUMBER}
        valueIncrease={fakeValueIncrease}
      />,
    )

    const firstTextValue = wrapper.find('Text').first().find('span')

    expect(firstTextValue.text()).toEqual('3.000')
  })

  it('formats accordingly the increase value upon COIN_BRL format', () => {
    const fakeValueIncrease = 3000

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease
        format={KEY_RESULT_FORMAT.COIN_BRL}
        valueIncrease={fakeValueIncrease}
      />,
    )

    const firstTextValue = wrapper.find('Text').first().find('span')

    expect(firstTextValue.text()).toEqual('R$3.000')
  })

  it('formats accordingly the increase value upon PERCENTAGE format', () => {
    const fakeValueIncrease = 70

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease
        format={KEY_RESULT_FORMAT.PERCENTAGE}
        valueIncrease={fakeValueIncrease}
      />,
    )

    const firstTextValue = wrapper.find('Text').first().find('span')

    expect(firstTextValue.text()).toEqual('70%')
  })

  it('formats accordingly the new value upon NUMBER format', () => {
    const fakeValue = 3000

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease
        format={KEY_RESULT_FORMAT.NUMBER}
        value={fakeValue}
      />,
    )

    const lastTextValue = wrapper.find('Text').last().find('span')

    expect(lastTextValue.text()).toEqual('3.000')
  })

  it('formats accordingly the new value upon COIN_BRL format', () => {
    const fakeValue = 3000

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease
        format={KEY_RESULT_FORMAT.COIN_BRL}
        value={fakeValue}
      />,
    )

    const lastTextValue = wrapper.find('Text').last().find('span')

    expect(lastTextValue.text()).toEqual('R$3.000')
  })

  it('formats accordingly the new value upon PERCENTAGE format', () => {
    const fakeValue = 70

    const wrapper = enzyme.mount(
      <KeyResultSectionTimelineCardCheckInValueIncrease
        format={KEY_RESULT_FORMAT.PERCENTAGE}
        value={fakeValue}
      />,
    )

    const lastTextValue = wrapper.find('Text').last().find('span')

    expect(lastTextValue.text()).toEqual('70%')
  })
})

describe('component lifecycle', () => {
  it('updates the valueIncrease accordingly', () => {
    const fakeValue = 70

    const wrapper = enzyme.mount(<KeyResultSectionTimelineCardCheckInValueIncrease />)

    wrapper.setProps({ value: fakeValue })
    wrapper.update()

    const lastTextValue = wrapper.find('Text').last().find('span')

    expect(lastTextValue.text()).toEqual(fakeValue.toString())
  })
})
