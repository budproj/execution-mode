import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { keyResultProgressUpdateDraftValue as draftValueAtom } from 'src/state/recoil/key-result/progress-update'

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

  it('reverts the current progress draft if we close the popover', () => {
    const fakeID = faker.random.word()
    const draftValue = faker.random.number()
    const currentProgress = faker.random.number()
    const spy = sinon.spy()

    const useRecoilStateStub = sinon.stub(recoil, 'useRecoilState')

    sinon.stub(recoil, 'useRecoilValue').returns(currentProgress)

    useRecoilStateStub.withArgs(draftValueAtom(fakeID)).returns([draftValue, spy])
    useRecoilStateStub.returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<ProgressSliderWrapper id={fakeID} />)

    const popover = result.find('Popover')
    popover.simulate('close')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(currentProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
