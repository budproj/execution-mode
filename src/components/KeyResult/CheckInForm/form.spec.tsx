import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import { FormikProps } from 'formik'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import Form, { CheckInFormValues } from './form'

const selectLatestMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('LATEST')
})

const selectCommentEnabledMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('COMMENT_ENABLED')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('uses the current progress value as initial value', () => {
    const fakeID = faker.random.word()
    const fakeValue = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')

    const fakeLatestCheckIn = {
      value: fakeValue,
    }

    stateStub.withArgs(selectLatestMatcher).returns([fakeLatestCheckIn, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    const initialValues: FormikProps<CheckInFormValues>['initialValues'] = formikComponent.prop(
      'initialValues',
    )

    expect(initialValues.valuePrevious).toEqual(fakeValue)
  })

  it('opens the comment upon rendering if asked to keep comment always enabled', () => {
    const fakeID = faker.random.word()
    const setStateStub = sinon.stub(recoil, 'useSetRecoilState')
    const spy = sinon.spy()

    setStateStub.withArgs(selectCommentEnabledMatcher).returns(spy)
    setStateStub.returns(sinon.fake())
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    enzyme.shallow(<Form isCommentAlwaysEnabled keyResultID={fakeID} />)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(true)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('updates the previous value field upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectLatestMatcher).returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        valueNew: fakeProgress,
      },
      {
        setFieldValue: spy,
      },
    )

    await Promise.resolve()
    await Promise.resolve()

    const spyFirstCallArguments = spy.firstCall.args
    const expectedArguments = ['valuePrevious', fakeProgress]

    expect(spyFirstCallArguments).toEqual(expectedArguments)
  })

  it('updates the new progress field upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectLatestMatcher).returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        valueNew: fakeProgress,
      },
      {
        setFieldValue: spy,
      },
    )

    await Promise.resolve()
    await Promise.resolve()

    const spySecondCallArguments = spy.secondCall.args
    const expectedArguments = ['valueNew', fakeProgress]

    expect(spySecondCallArguments).toEqual(expectedArguments)
  })

  it('resets the comment field upon form submission', async () => {
    const fakeID = faker.random.word()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectLatestMatcher).returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        comment: faker.lorem.paragraph(),
      },
      {
        setFieldValue: spy,
      },
    )

    await Promise.resolve()
    await Promise.resolve()

    const spyThirdCallArguments = spy.thirdCall.args
    const expectedArguments = ['comment', '']

    expect(spyThirdCallArguments).toEqual(expectedArguments)
  })

  it('closes the comment input upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()
    const setStateStub = sinon.stub(recoil, 'useSetRecoilState')
    const spy = sinon.spy()

    setStateStub.withArgs(selectCommentEnabledMatcher).returns(spy)
    setStateStub.returns(sinon.fake())
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(false)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not close the comment input upon form submission if it should always be enabled', async () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()
    const setStateStub = sinon.stub(recoil, 'useSetRecoilState')
    const spy = sinon.spy()

    setStateStub.withArgs(selectCommentEnabledMatcher).returns(spy)
    setStateStub.returns(sinon.fake())
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<Form isCommentAlwaysEnabled keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.secondCall.calledWithExactly(true)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('dispatches a remote state update action without comment upon form submittion', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy, {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      valueNew: fakeProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCheckInInput: {
          keyResultId: fakeID,
          value: fakeProgress,
          confidence: fakeConfidence,
        },
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('dispatches a remote state update action with comment upon form submittion', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const fakeComment = faker.lorem.lines(5)
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy, {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      valueNew: fakeProgress,
      confidence: fakeConfidence,
      comment: fakeComment,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCheckInInput: {
          keyResultId: fakeID,
          value: fakeProgress,
          confidence: fakeConfidence,
          comment: fakeComment,
        },
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('dispatches a remote state update action with 0 progress upon form submittion', async () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy, {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      valueNew: 0,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCheckInInput: {
          keyResultId: fakeID,
          value: 0,
          confidence: fakeConfidence,
        },
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('executes the desired after submit hook upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const fakeComment = faker.lorem.paragraph()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectLatestMatcher).returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const fakeValues = {
      valueNew: fakeProgress,
      confidence: fakeConfidence,
      comment: fakeComment,
    }
    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', fakeValues)

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeValues)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('trigger the onCancel received prop upon cancel action', () => {
    const spy = sinon.spy()

    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])

    const result = enzyme.shallow(<Form onCancel={spy} />).dive()

    const actions = result.find('Actions')
    actions.simulate('cancel')

    expect(spy.called).toEqual(true)
  })
})

describe('corner cases', () => {
  afterEach(() => sinon.restore())

  it('does not dispatch a remote state update action upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const fakeLatestCheckIn = {
      value: fakeProgress,
      confidence: fakeConfidence,
    }

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectLatestMatcher).returns([fakeLatestCheckIn, sinon.fake()])

    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy, {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      valueNew: fakeProgress,
      valuePrevious: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not sync disabled fields upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const fakeLatestCheckIn = {
      value: fakeProgress,
      confidence: fakeConfidence,
    }

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectLatestMatcher).returns([fakeLatestCheckIn, sinon.fake()])

    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        valueNew: fakeProgress,
        valuePrevious: fakeProgress,
        confidence: fakeConfidence,
      },
      {
        setFieldValue: spy,
      },
    )

    expect(spy.calledOnce).toEqual(false)
  })
})

describe('component customizations', () => {
  it('can set a custom valueNew for the form', () => {
    const fakeID = faker.random.word()
    const fakeValue = faker.random.number()
    const fakeValueNew = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')

    const fakeLatestCheckIn = {
      value: fakeValue,
    }

    stateStub.withArgs(selectLatestMatcher).returns([fakeLatestCheckIn, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} valueNew={fakeValueNew} />)

    const formikComponent = result.find('Formik')
    const initialValues: FormikProps<CheckInFormValues>['initialValues'] = formikComponent.prop(
      'initialValues',
    )

    expect(initialValues.valueNew).toEqual(fakeValueNew)
  })
})
