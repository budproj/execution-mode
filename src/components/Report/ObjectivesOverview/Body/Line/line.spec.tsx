import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import ObjectivesOverviewBodyLine from './line'

describe('component render', () => {
  afterEach(() => sinon.restore())

  it('displays a tag number with at least 2 digits', () => {
    const fakeTagNumber = faker.random.number({ min: 1, max: 9 })

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns({})

    const result = enzyme.shallow(<ObjectivesOverviewBodyLine orderTagNumber={fakeTagNumber} />)

    const tagNumber = result.find('Text').first()
    const expectedTagNumber = `0${fakeTagNumber}.`

    expect(tagNumber.text()).toEqual(expectedTagNumber)
  })

  it('does not adds zero if tag number has 2 digits', () => {
    const fakeTagNumber = faker.random.number({ min: 10, max: 999 })

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns({})

    const result = enzyme.shallow(<ObjectivesOverviewBodyLine orderTagNumber={fakeTagNumber} />)

    const tagNumber = result.find('Text').first()
    const expectedTagNumber = `${fakeTagNumber}.`

    expect(tagNumber.text()).toEqual(expectedTagNumber)
  })

  it('formats the tag number with thousands', () => {
    const fakeTagNumber = 12333

    sinon.mock(recoil).expects('useRecoilValue').atLeast(1).returns({})

    const result = enzyme.shallow(<ObjectivesOverviewBodyLine orderTagNumber={fakeTagNumber} />)

    const tagNumber = result.find('Text').first()

    expect(tagNumber.text()).toEqual('12,333.')
  })

  it('uses the correct track color in the slider', () => {
    sinon.stub(recoil, 'useRecoilValue').returns({ currentConfidence: 50 })

    const result = enzyme.shallow(
      <ObjectivesOverviewBodyLine orderTagNumber={faker.random.number()} />,
    )

    const slider = result.find('SliderWithFilledTrack')

    expect(slider.prop('trackColor')).toEqual('yellow.500')
  })
})
