import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import { CheckInFormValues } from 'src/components/KeyResult/CheckInForm/form'

import ProgressSliderPopover from './popover'

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('updates the draft value with the submitted value from the form', () => {
    const spy = sinon.spy()
    const newCheckIn = { valueNew: faker.random.number() }

    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilState').returns([faker.random.number(), spy])

    const result = enzyme.shallow(<ProgressSliderPopover />)

    const submitHook: (values: CheckInFormValues) => void = result
      .find('CheckInForm')
      .prop('afterSubmit')
    submitHook(newCheckIn as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newCheckIn.valueNew)
    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('closes the popup upon submission', () => {
    const spy = sinon.spy()

    sinon.stub(recoil, 'useSetRecoilState').returns(spy)
    sinon.stub(recoil, 'useRecoilState').returns([] as any)

    const result = enzyme.shallow(<ProgressSliderPopover />)

    const submitHook: (n: number) => void = result.find('CheckInForm').prop('afterSubmit')
    submitHook(faker.random.number())

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(false)
    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('stops propagates upon mouse down events', () => {
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon
      .mock(recoil)
      .expects('useRecoilState')
      .atLeast(1)
      .returns([] as any)

    const spy = sinon.spy()

    const result = enzyme.shallow(<ProgressSliderPopover onClose={spy} />)

    const content = result.find('PopoverContent')

    const event = {
      stopPropagation: spy,
    }
    content.simulate('mouseDownCapture', event)

    expect(spy.called).toEqual(true)
  })
})
