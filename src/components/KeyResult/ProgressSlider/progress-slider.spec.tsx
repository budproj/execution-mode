import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import ProgressSlider from './progress-slider'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('opens the popover as soon as the provided ID was marked as open', () => {
    const fakeID = faker.random.number()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeID)

    const result = enzyme.shallow(<ProgressSlider id={fakeID} />)

    const popoverComponent = result.find('Popover')

    expect(popoverComponent.prop('isOpen')).toEqual(true)
  })

  it('keeps the popover closed when needed', () => {
    const fakeID = faker.random.number()
    sinon.stub(recoil, 'useRecoilValue').returns(fakeID)

    const result = enzyme.shallow(<ProgressSlider id={faker.random.number()} />)

    const popoverComponent = result.find('Popover')

    expect(popoverComponent.prop('isOpen')).toEqual(false)
  })
})
