import * as apollo from '@apollo/client'
import enzyme from 'enzyme'
import faker from 'faker'
import { FormikProps } from 'formik'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import Form, { CheckInFormValues } from './form'

const selectCurrentProgressMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('CURRENT_PROGRESS')
})

const selectCurrentConfidenceMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('CURRENT_CONFIDENCE')
})

const selectCommentEnabledMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('COMMENT_ENABLED')
})

const selectDraftMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('DRAFT')
})

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('uses the current progress as initial value', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')

    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    const initialValues: FormikProps<CheckInFormValues>['initialValues'] = formikComponent.prop(
      'initialValues',
    )

    expect(initialValues.currentProgress).toEqual(fakeProgress)
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

  it('updates the current progress field upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgressMatcher).returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        newProgress: fakeProgress,
      },
      {
        setFieldValue: spy,
      },
    )

    await Promise.resolve()
    await Promise.resolve()

    const spyFirstCallArguments = spy.firstCall.args
    const expectedArguments = ['currentProgress', fakeProgress]

    expect(spyFirstCallArguments).toEqual(expectedArguments)
  })

  it('updates the new progress field upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgressMatcher).returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        newProgress: fakeProgress,
      },
      {
        setFieldValue: spy,
      },
    )

    await Promise.resolve()
    await Promise.resolve()

    const spySecondCallArguments = spy.secondCall.args
    const expectedArguments = ['newProgress', fakeProgress]

    expect(spySecondCallArguments).toEqual(expectedArguments)
  })

  it('resets the comment field upon form submission', async () => {
    const fakeID = faker.random.word()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgressMatcher).returns([faker.random.number(), sinon.fake()])
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

  it('updates the progress report state upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgressMatcher).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the progress draft state upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectDraftMatcher).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        newProgress: fakeProgress,
      },
      {
        setFieldValue: sinon.fake(),
      },
    )

    await Promise.resolve()
    await Promise.resolve()

    const spyFirstCallArguments = spy.firstCall.firstArg

    expect(spyFirstCallArguments).toEqual(fakeProgress)
  })

  it('updates the current confidence state upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeConfidence)

    expect(wasSpyCalledAsExpected).toEqual(true)
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
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCheckInInput: {
          keyResultId: fakeID,
          progress: fakeProgress,
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
      newProgress: fakeProgress,
      confidence: fakeConfidence,
      comment: fakeComment,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCheckInInput: {
          keyResultId: fakeID,
          progress: fakeProgress,
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
      newProgress: 0,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        keyResultCheckInInput: {
          keyResultId: fakeID,
          progress: 0,
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

    stateStub
      .withArgs(selectCurrentConfidenceMatcher)
      .returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake(), {}])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const fakeValues = {
      newProgress: fakeProgress,
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

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, sinon.fake()])

    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy, {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not sync disabled fields upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, sinon.fake()])

    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate(
      'submit',
      {
        newProgress: fakeProgress,
        confidence: fakeConfidence,
      },
      {
        setFieldValue: spy,
      },
    )

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not updates current progress upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, spy])
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, sinon.fake()])

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not updates current confidence upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, spy])

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })

  it('triggers the provided afterSubmit callback if the progress has changed upon submission', async () => {
    const fakeID = faker.random.word()
    const fakeOldProgress = faker.random.number()
    const fakeNewProgress = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeOldProgress, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])

    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')

    const fakeValues = {
      newProgress: fakeNewProgress,
    }
    formikComponent.simulate('submit', fakeValues)

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeValues)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('triggers the provided afterSubmit callback if the confidence has changed upon submission', async () => {
    const fakeID = faker.random.word()
    const fakeOldConfidence = faker.random.number()
    const fakeNewConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeOldConfidence, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])

    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')

    const fakeValues = {
      confidence: fakeNewConfidence,
    }
    formikComponent.simulate('submit', fakeValues)

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeValues)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('triggers the provided afterSubmit callback if the comment has changed upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeComment = faker.lorem.paragraph()

    const spy = sinon.spy()

    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')

    const fakeValues = {
      comment: fakeComment,
    }
    formikComponent.simulate('submit', fakeValues)

    await Promise.resolve()
    await Promise.resolve()

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeValues)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not calls the afterSubmit hook if we submit the same progress as before', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])

    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
    })

    await Promise.resolve()
    await Promise.resolve()

    expect(spy.notCalled).toEqual(true)
  })

  it('does not calls the afterSubmit hook if we submit the same confidence as before', async () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])

    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    await Promise.resolve()

    expect(spy.notCalled).toEqual(true)
  })

  it('does not calls the afterSubmit hook if we submit an empty comment', async () => {
    const fakeID = faker.random.word()

    const spy = sinon.spy()

    sinon.stub(apollo, 'useMutation').returns([sinon.fake(), {}] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      comment: '',
    })

    await Promise.resolve()
    await Promise.resolve()

    expect(spy.notCalled).toEqual(true)
  })
})
