import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionCheckIn from './check-in'

const selectCurrentProgressMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('CURRENT_PROGRESS')
})

const selectKeyResultPoliciesMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('POLICIES')
})

const defaultPolicies = {
  childEntities: {
    keyResultCheckIn: {},
  },
}

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('does not show anything if the user is not allowed to edit the key result', () => {
    const fakeCheckInPolicies = {
      create: 'DENY',
    }
    const fakeKeyResultPolicies = {
      childEntities: {
        keyResultCheckIn: fakeCheckInPolicies,
      },
    }

    sinon.stub(recoil, 'useRecoilValue').returns(fakeKeyResultPolicies)

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const skeleton = result.find('Skeleton')

    expect(skeleton.length).toEqual(0)
  })

  it('shows the skeleton if it is still being loaded', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const skeleton = result.find('Skeleton')

    expect(skeleton.prop('isLoaded')).toEqual(false)
  })
})

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('shows the check-in button upon mounting', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const buttonWrapper = result.find('Collapse').first()

    expect(buttonWrapper.prop('in')).toEqual(true)
  })

  it('does not shows the form upon mounting', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const formWrapper = result.find('Collapse').last()

    expect(formWrapper.prop('in')).toEqual(false)
  })

  it('shows the form upon button clicking', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    button.simulate('click')

    const formWrapper = result.find('Collapse').last()

    expect(formWrapper.prop('in')).toEqual(true)
  })

  it('does not shows the button upon button clicking', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    button.simulate('click')

    const buttonWrapper = result.find('Collapse').first()

    expect(buttonWrapper.prop('in')).toEqual(false)
  })

  it('shows the button upon form cancellation', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)
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
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)
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
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)
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
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)
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
    const fakeCheckInPolicies = {
      create: 'ALLOW',
    }
    const fakeKeyResultPolicies = {
      childEntities: {
        keyResultCheckIn: fakeCheckInPolicies,
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(fakeKeyResultPolicies)
    stub.withArgs(selectCurrentProgressMatcher).returns(currentProgress)
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
