import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { mountWithIntl } from 'lib/enzyme'
import {
  keyResultProgressUpdatePopoverSlider,
  keyResultProgressUpdateCurrentProgress as selectCurrentProgress,
} from 'src/state/recoil/key-result/progress-update'

import { KeyResultFormat } from '../types'

import SliderContainer from './slider-container'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('displays a disable slider if progress report data is not available', () => {
    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <SliderContainer keyResultID={faker.random.number()} />
      </recoil.RecoilRoot>,
    )

    const sliderComponent = result.find('Slider')

    expect(sliderComponent.prop('isDisabled')).toEqual(true)
  })

  it('updates the local current progress when the slider value changes', () => {
    const fakeID = faker.random.number()
    const currentProgress = faker.random.number()
    const spy = sinon.spy()
    const currentProgressSelector = selectCurrentProgress(fakeID)
    const goalSelectorMatcher = sinon.match(
      (selector: recoil.RecoilState<KeyResultFormat | number | undefined>) => {
        return selector.key.includes('GOAL')
      },
    )

    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(currentProgressSelector)
      .returns([currentProgress, spy])
    sinon
      .stub(recoil, 'useRecoilValue')
      .withArgs(goalSelectorMatcher)
      .returns(faker.random.number())

    const result = mountWithIntl(
      <recoil.RecoilRoot>
        <SliderContainer keyResultID={fakeID} />
      </recoil.RecoilRoot>,
    )

    const thumbComponent = result.find('SliderThumb')
    const changeEvent = { key: 'ArrowRight' }
    thumbComponent.simulate('keyDown', changeEvent)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(currentProgress + 1)

    setTimeout(() => expect(wasSpyCalledAsExpected).toEqual(true), 200)
  })

  it('opens the popover when the user finishes updating the slider', () => {
    const fakeID = faker.random.number()
    const spy = sinon.spy()
    const currentProgress = faker.random.number()
    const currentProgressSelector = selectCurrentProgress(fakeID)
    const goalSelectorMatcher = sinon.match(
      (selector: recoil.RecoilState<KeyResultFormat | number | undefined>) => {
        return selector.key.includes('GOAL')
      },
    )

    sinon
      .stub(recoil, 'useRecoilState')
      .withArgs(currentProgressSelector)
      .onCall(0)
      .returns([currentProgress, sinon.fake()])
      .onCall(1)
      .returns([currentProgress + faker.random.number({ min: 1 }), sinon.fake()])
    sinon
      .stub(recoil, 'useRecoilValue')
      .withArgs(goalSelectorMatcher)
      .returns(faker.random.number())
    sinon
      .stub(recoil, 'useSetRecoilState')
      .withArgs(keyResultProgressUpdatePopoverSlider)
      .returns(spy)

    const result = mountWithIntl(
      React.createElement(
        (properties) => (
          <recoil.RecoilRoot>
            <SliderContainer keyResultID={fakeID} {...properties} />
          </recoil.RecoilRoot>
        ),
        {},
      ),
    )

    result.setProps({})
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeID)

    setTimeout(() => expect(wasSpyCalledAsExpected).toEqual(true), 200)
  })
})
