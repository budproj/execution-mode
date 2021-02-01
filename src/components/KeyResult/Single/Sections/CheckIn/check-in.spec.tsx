import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionCheckIn from './check-in'

const selectCurrentProgressMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('CURRENT_PROGRESS')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('does not show anything if the user is not allowed to edit the key result', () => {
    const fakePolicies = {
      update: 'DENY',
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakePolicies)

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const skeleton = result.find('Skeleton')

    expect(skeleton.length).toEqual(0)
  })

  it('shows the skeleton if it is still being loaded', () => {
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const skeleton = result.find('Skeleton')

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })
})

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('shows the check-in button upon mounting', () => {
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const buttonWrapper = result.find('Collapse').first()

    expect(buttonWrapper.prop('in')).toEqual(true)
  })

  it('does not shows the form upon mounting', () => {
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const formWrapper = result.find('Collapse').last()

    expect(formWrapper.prop('in')).toEqual(false)
  })

  it('shows the form upon button clicking', () => {
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    button.simulate('click')

    const formWrapper = result.find('Collapse').last()

    expect(formWrapper.prop('in')).toEqual(true)
  })

  it('does not shows the button upon button clicking', () => {
    sinon.stub(recoil, 'useRecoilValue')

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    button.simulate('click')

    const buttonWrapper = result.find('Collapse').first()

    expect(buttonWrapper.prop('in')).toEqual(false)
  })

  it('shows the button upon form cancellation', () => {
    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    const form = result.find('CheckInForm')

    button.simulate('click')
    form.simulate('cancel')

    const buttonWrapper = result.find('Collapse').first()

    expect(buttonWrapper.prop('in')).toEqual(true)
  })

  it('does not shows the form upon form cancellation', () => {
    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    const form = result.find('CheckInForm')

    button.simulate('click')
    form.simulate('cancel')

    const formWrapper = result.find('Collapse').last()

    expect(formWrapper.prop('in')).toEqual(false)
  })

  it('shows the button after submitting the form', () => {
    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    const form = result.find('CheckInForm')

    button.simulate('click')
    const afterSubmitHook: () => void = form.prop('afterSubmit')
    afterSubmitHook()

    const buttonWrapper = result.find('Collapse').first()

    expect(buttonWrapper.prop('in')).toEqual(true)
  })

  it('does not show the form after submitting the form', () => {
    sinon.stub(recoil, 'useRecoilValue')
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    const form = result.find('CheckInForm')

    button.simulate('click')
    const afterSubmitHook: () => void = form.prop('afterSubmit')
    afterSubmitHook()

    const formWrapper = result.find('Collapse').last()

    expect(formWrapper.prop('in')).toEqual(false)
  })

  it('resets the draft value upon check-in form closing', () => {
    const currentProgress = faker.random.number()
    const spy = sinon.spy()

    sinon
      .stub(recoil, 'useRecoilValue')
      .withArgs(selectCurrentProgressMatcher)
      .returns(currentProgress)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    button.simulate('click')

    const closeButton = result.find('IconButton')
    closeButton.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(currentProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
