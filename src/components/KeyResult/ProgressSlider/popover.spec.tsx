import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import ProgressSliderPopover from './popover'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('updates the draft value with the submitted value from the form', () => {
    const spy = sinon.spy()
    const newProgressReport = faker.random.number()
    const useSetRecoilStateStub = sinon.stub(recoil, 'useSetRecoilState')
    const draftValueAtomMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
      return selector.key.includes('DRAFT_VALUE')
    })

    useSetRecoilStateStub.withArgs(draftValueAtomMatcher).returns(spy)
    useSetRecoilStateStub.returns(sinon.fake())

    const result = enzyme.shallow(<ProgressSliderPopover />)

    const submitHook: (n: number) => void = result.find('CheckInForm').prop('afterSubmit')
    submitHook(newProgressReport)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newProgressReport)
    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('closes the popup upon submission', () => {
    const spy = sinon.spy()
    const useSetRecoilStateStub = sinon.stub(recoil, 'useSetRecoilState')
    const popoverOpenSelectorMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
      return selector.key.includes('POPOVER_OPEN')
    })

    useSetRecoilStateStub.withArgs(popoverOpenSelectorMatcher).returns(spy)
    useSetRecoilStateStub.returns(sinon.fake())

    const result = enzyme.shallow(<ProgressSliderPopover />)

    const submitHook: (n: number) => void = result.find('CheckInForm').prop('afterSubmit')
    submitHook(faker.random.number())

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(false)
    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
