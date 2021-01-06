import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import {
  keyResultCheckInProgressDraft,
  keyResultCheckInPopoverOpen,
} from 'src/state/recoil/key-result/check-in'
import { buildPartialSelector } from 'src/state/recoil/key-result/selectors'

import ProgressSlider from './slider'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays a disable trigger if progress report data is not available', () => {
    const recoilMock = sinon.mock(recoil)

    recoilMock.expects('useRecoilState').returns([undefined, sinon.fake()])
    recoilMock.expects('useRecoilValue').atLeast(1)
    recoilMock.expects('useSetRecoilState').returns(sinon.fake())

    const result = enzyme.shallow(<ProgressSlider keyResultID={faker.random.word()} />).dive()

    const sliderComponent = result.find('Slider')

    expect(sliderComponent.prop('isDisabled')).toEqual(true)
  })

  it('updates the local draft value when the trigger value changes', () => {
    const fakeID = faker.random.word()
    const spy = sinon.spy()
    const newValue = faker.random.number()
    const goalSelector = buildPartialSelector('goal')

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(keyResultCheckInProgressDraft(fakeID)).returns(['ok', spy])
    stateStub.returns([undefined, sinon.fake()])

    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.withArgs(goalSelector(fakeID)).returns(faker.random.number())
    valueStub.returns('')

    const result = enzyme
      .shallow(<ProgressSlider keyResultID={fakeID} />)
      .dive()
      .dive()

    const slider = result.find('Slider')
    slider.simulate('change', newValue)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newValue)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('opens the popover when the user finishes updating the trigger', () => {
    const fakeID = faker.random.word()
    const spy = sinon.spy()
    const goalSelector = buildPartialSelector('goal')
    const newProgress = faker.random.number()

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([newProgress, sinon.fake()])

    const setStateStub = sinon.stub(recoil, 'useSetRecoilState')
    setStateStub.withArgs(keyResultCheckInPopoverOpen(fakeID)).returns(spy)
    setStateStub.returns(sinon.fake())

    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.withArgs(goalSelector(fakeID)).returns(faker.random.number())
    valueStub.returns('')

    const result = enzyme.shallow(<ProgressSlider keyResultID={fakeID} />)

    const slider = result.dive().dive().find('Slider')
    slider.simulate('change', newProgress)
    result.update()

    const updatedSlider = result.dive().dive().find('Slider')
    updatedSlider.simulate('changeEnd', newProgress)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(true)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not open the popover if the value changed, but not by the component or its childs', () => {
    const fakeID = faker.random.word()
    const spy = sinon.spy()
    const goalSelector = buildPartialSelector('goal')
    const newProgress = faker.random.number()

    sinon
      .mock(recoil)
      .expects('useRecoilState')
      .atLeast(1)
      .returns([faker.random.number(), sinon.fake()])

    const setStateStub = sinon.stub(recoil, 'useSetRecoilState')
    setStateStub.withArgs(keyResultCheckInPopoverOpen(fakeID)).returns(spy)
    setStateStub.returns(sinon.fake())

    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.withArgs(goalSelector(fakeID)).returns(faker.random.number())
    valueStub.returns('')

    const result = enzyme
      .shallow(<ProgressSlider keyResultID={fakeID} />)
      .dive()
      .dive()

    const slider = result.find('Slider')
    slider.simulate('changeEnd', newProgress)

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not open the popover if the value changed, but not through the slider itself', () => {
    const fakeID = faker.random.word()
    const spy = sinon.spy()
    const goalSelector = buildPartialSelector('goal')
    const newProgress = faker.random.number()

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([newProgress, sinon.fake()])

    const setStateStub = sinon.stub(recoil, 'useSetRecoilState')
    setStateStub.withArgs(keyResultCheckInPopoverOpen(fakeID)).returns(spy)
    setStateStub.returns(sinon.fake())

    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.withArgs(goalSelector(fakeID)).returns(faker.random.number())
    valueStub.returns('')

    const result = enzyme.shallow(<ProgressSlider keyResultID={fakeID} />)

    const slider = result.dive().dive().find('Slider')
    slider.simulate('changeEnd', newProgress)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(true)

    expect(wasSpyCalledAsExpected).not.toEqual(true)
  })

  it('makes the slider disabled if we set canChange to false', () => {
    const fakeID = faker.random.word()

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.returns([undefined, sinon.fake()])

    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.returns('')

    const result = enzyme
      .shallow(<ProgressSlider keyResultID={fakeID} canChange={false} />)
      .dive()
      .dive()

    const slider = result.find('Slider')

    expect(slider.prop('isDisabled')).toEqual(true)
  })

  it('makes the slider enabled if we set canChange to true', () => {
    const fakeID = faker.random.word()

    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.returns([undefined, sinon.fake()])

    const valueStub = sinon.stub(recoil, 'useRecoilValue')
    valueStub.returns('')

    const result = enzyme
      .shallow(<ProgressSlider canChange keyResultID={fakeID} />)
      .dive()
      .dive()

    const slider = result.find('Slider')

    expect(slider.prop('isDisabled')).toEqual(false)
  })
})
