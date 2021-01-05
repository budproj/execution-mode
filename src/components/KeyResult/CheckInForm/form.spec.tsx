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

describe('component expectations', () => {
  afterEach(() => sinon.restore())

  it('uses the current progress as initial value', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')

    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    const initialValues: FormikProps<CheckInFormValues>['initialValues'] = formikComponent.prop(
      'initialValues',
    )

    expect(initialValues.currentProgress).toEqual(fakeProgress)
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
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate(
      'submit',
      {
        newProgress: fakeProgress,
      },
      {
        setFieldValue: spy,
      },
    )

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly('currentProgress', fakeProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the progress report state upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentProgressMatcher).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the current confidence state upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([faker.random.number(), spy])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeConfidence)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('updates the latest confidence report state upon form submission', async () => {
    const fakeID = faker.random.word()
    const fakeConfidence = faker.random.number()
    const setStateStub = sinon.stub(recoil, 'useSetRecoilState')
    const spy = sinon.spy()

    setStateStub.returns(spy)
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([undefined, sinon.fake()])

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({ valueNew: fakeConfidence })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('dispatchs a remote state update action upon form submittion', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        checkInInput: {
          keyResultId: fakeID,
          progress: fakeProgress,
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
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub
      .withArgs(selectCurrentConfidenceMatcher)
      .returns([faker.random.number(), sinon.fake()])
    stateStub.returns([undefined, sinon.fake()])
    sinon.mock(apollo).expects('useMutation').atLeast(1).returns([sinon.fake()])
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(fakeProgress, fakeConfidence)

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

  it('pass progress as undefined to remote dispatch if it did not changed', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.returns([fakeProgress, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        checkInInput: {
          keyResultId: fakeID,
          progress: undefined,
          confidence: fakeConfidence,
        },
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('pass confidence as undefined to remote dispatch if it did not changed', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()
    const stateStub = sinon.stub(recoil, 'useRecoilState')
    const spy = sinon.spy()

    stateStub.returns([fakeConfidence, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly({
      variables: {
        checkInInput: {
          keyResultId: fakeID,
          progress: fakeProgress,
          confidence: undefined,
        },
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not dispatch a remote state update action upon form submittion if the values are the same', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, sinon.fake()])

    const spy = sinon.spy()

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([spy] as any)
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
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)

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
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)
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
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })

  it('only triggers the provided afterSubmit callback if any value has changed upon submission', () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, sinon.fake()])

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const formikComponent = result.find('Formik')
    formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: fakeConfidence,
    })

    expect(spy.calledOnce).toEqual(false)
  })

  it('does not pass the new progress to afterSubmit event if it is the same as before', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, sinon.fake()])

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const newConfidence = faker.random.number()
    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress: fakeProgress,
      confidence: newConfidence,
    })

    await Promise.resolve()
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(undefined, newConfidence)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('does not pass the new confidence to afterSubmit event it the values is the same as before', async () => {
    const fakeID = faker.random.word()
    const fakeProgress = faker.random.number()
    const fakeConfidence = faker.random.number()

    const spy = sinon.spy()

    const stateStub = sinon.stub(recoil, 'useRecoilState')
    stateStub.withArgs(selectCurrentProgressMatcher).returns([fakeProgress, sinon.fake()])
    stateStub.withArgs(selectCurrentConfidenceMatcher).returns([fakeConfidence, sinon.fake()])

    stateStub.returns([undefined, sinon.fake()])
    sinon.stub(apollo, 'useMutation').returns([sinon.fake()] as any)
    sinon.mock(recoil).expects('useSetRecoilState').atLeast(1).returns(sinon.fake())

    const result = enzyme.shallow(<Form keyResultID={fakeID} afterSubmit={spy} />)

    const newProgress = faker.random.number()
    const formikComponent = result.find('Formik')
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await formikComponent.simulate('submit', {
      newProgress,
      confidence: fakeConfidence,
    })

    await Promise.resolve()
    // eslint-disable-next-line unicorn/no-useless-undefined
    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(newProgress, undefined)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
