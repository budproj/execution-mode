import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { keyResultCheckInPopoverOpen } from 'src/state/recoil/key-result/check-in'

import ProgressSliderWrapper from './wrapper'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('opens the popover as soon as the provided ID was marked as open', () => {
    sinon.mock(recoil).expects('useRecoilValue')
    sinon.stub(recoil, 'useRecoilState').returns([true, sinon.fake()])

    const result = enzyme.shallow(<ProgressSliderWrapper id={faker.random.word()} />)

    const popoverComponent = result.find('Popover')

    expect(popoverComponent.prop('isOpen')).toEqual(true)
  })

  it('keeps the popover closed when needed', async () => {
    sinon.mock(recoil).expects('useRecoilValue')
    sinon.stub(recoil, 'useRecoilState').returns([false, sinon.fake()])

    const result = enzyme.shallow(<ProgressSliderWrapper id={faker.random.word()} />)

    const popoverComponent = result.find('Popover')

    expect(popoverComponent.prop('isOpen')).toEqual(false)
  })

  it('closes the popover when we trigger the Chakra popover close event', () => {
    const fakeID = faker.random.word()
    const currentProgress = faker.random.number()
    const spy = sinon.spy()

    const useRecoilStateStub = sinon.stub(recoil, 'useRecoilState')

    sinon.stub(recoil, 'useRecoilValue').returns(currentProgress)
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())

    useRecoilStateStub.withArgs(keyResultCheckInPopoverOpen(fakeID)).returns([undefined, spy])
    useRecoilStateStub.returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<ProgressSliderWrapper id={fakeID} />)

    const popover = result.find('Popover')
    popover.simulate('close')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(false)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('closes the popup upon popover cancellation', () => {
    const fakeID = faker.random.word()
    const currentProgress = faker.random.number()
    const spy = sinon.spy()

    const useRecoilStateStub = sinon.stub(recoil, 'useRecoilState')

    sinon.stub(recoil, 'useRecoilValue').returns(currentProgress)
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())

    useRecoilStateStub.withArgs(keyResultCheckInPopoverOpen(fakeID)).returns([undefined, spy])
    useRecoilStateStub.returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<ProgressSliderWrapper id={fakeID} />)

    const popover = result.find('ProgressSliderPopover')
    popover.simulate('close')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(false)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('resets the draft value upon popover closing', () => {
    const fakeID = faker.random.word()
    const fakeValue = faker.random.number()
    const fakeLatestCheckIn = {
      value: fakeValue,
    }
    const spy = sinon.spy()

    sinon.stub(recoil, 'useRecoilState').returns([undefined, sinon.fake()])
    sinon.stub(recoil, 'useRecoilValue').returns(fakeLatestCheckIn)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const result = enzyme.shallow(<ProgressSliderWrapper id={fakeID} />)

    const popover = result.find('ProgressSliderPopover')
    popover.simulate('close')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeValue)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
